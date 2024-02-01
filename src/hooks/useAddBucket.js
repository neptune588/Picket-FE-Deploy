import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "@/utils/categoryData";
import { useMutation } from "@tanstack/react-query";

import useBucketCreateCommon from "@/hooks/useBucketCreateCommon";
import useTokenReissue from "@/hooks/useTokenReissue";

import { postData } from "@/services/api";

export default function useAddBucket() {
  const navigate = useNavigate();

  const {
    date,
    imgData,
    valueData,
    submitLoading,
    calanderModalState,
    setDate,
    setValueData,
    setSubmitLoading,
    setCalanderModalState,
    handleValueChange,
    handleImageUpload,
  } = useBucketCreateCommon();
  const { tokenRequest } = useTokenReissue();

  const [step, setStep] = useState(0);
  const [categoryData, setCategoryData] = useState(() => {
    const data = [...categoriesData];
    data.splice(0, 1);
    return data;
  });
  const [curFormData, setCurFormData] = useState(null);
  const [recursiveCount, setRecursiveCount] = useState(0);

  const handleCategoryClick = (activeNumber, queryNumber) => {
    return () => {
      setCategoryData(() => {
        const copy = categoryData.map((data, idx) => {
          return {
            ...data,
            activeState:
              idx === activeNumber ? !data.activeState : data.activeState,
          };
        });

        return copy;
      });
      setValueData(() => {
        const categorySelect = [...valueData.categoryList];

        categorySelect.indexOf(queryNumber) === -1
          ? categorySelect.push(queryNumber)
          : categorySelect.splice(categorySelect.indexOf(queryNumber), 1);

        return { ...valueData, categoryList: categorySelect };
      });
    };
  };

  const handleNextStepCheck = () => {
    const { bucketTitle, bucketContent, categoryList } = valueData;
    const { postImg } = imgData;

    if (
      !bucketTitle ||
      !bucketContent ||
      categoryList.length === 0 ||
      !postImg
    ) {
      console.log(bucketTitle, bucketContent, categoryList, postImg);
      alert("내용 작성 밑 이미지를 업로드 해주세요!");
    } else {
      setStep(1);
    }
  };

  const bucketCreate = useMutation({
    mutationFn: async (formData) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await postData(`board`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
    onSuccess: async (res) => {
      setRecursiveCount(0);
      alert(res.data.message);
      navigate("/");
    },
    onError: (error) => {
      setRecursiveCount((prev) => prev + 1);
      if (recursiveCount >= 2) {
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("userRefreshToken");
        localStorage.removeItem("userNickname");
        localStorage.removeItem("userAvatar");

        alert("권한이 없습니다. 다시 로그인 해주세요!");
        navigate("/auth/signin");
      } else if (error.response.status === 401) {
        tokenRequest.mutate();
        bucketCreate.mutate(curFormData);
      } else if (error.response.status === 400) {
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("userRefreshToken");
        localStorage.removeItem("userNickname");
        localStorage.removeItem("userAvatar");

        alert("로그인이 만료되었습니다. 재로그인 하시겠습니까?") &&
          navigate("/auth/signin");
      } else {
        console.error("error");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitLoading) {
      return;
    }
    setSubmitLoading(true);

    //안해도되긴하지만 중복검증
    const { bucketTitle, bucketContent, categoryList } = valueData;
    const { postImg } = imgData;

    if (bucketTitle && bucketContent && categoryList && postImg) {
      const formData = new FormData();

      const contents = {
        title: bucketTitle,
        content: bucketContent,
        deadline:
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, 0) +
          "-" +
          String(date.getDate()).padStart(2, 0),
        categoryList: categoryList,
      };
      formData.append(
        "postBoardRequestDTO",
        new Blob([JSON.stringify(contents)], {
          type: "application/json",
        })
      );
      formData.append("file", postImg);

      setCurFormData(formData);
      bucketCreate.mutate(formData);
    }

    setSubmitLoading(false);
  };
  return {
    date,
    imgData,
    valueData,
    categoryData,
    step,
    calanderModalState,
    setDate,
    setStep,
    setSubmitLoading,
    setCalanderModalState,
    handleImageUpload,
    handleValueChange,
    handleCategoryClick,
    handleNextStepCheck,
    handleSubmit,
  };
}
