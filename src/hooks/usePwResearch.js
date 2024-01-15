import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { patchData } from "@/services/api";

import { emailReg } from "@/utils/userAuthRegex";

export default function usePwResearch() {
  const navigate = useNavigate();

  useEffect(() => {
    const condition = localStorage.getItem("userAccessToken");
    if (condition) {
      navigate("/");
    }
  }, []);

  const [value, setValue] = useState({
    userPwResearch: "",
  });
  const [errors, setErrors] = useState({
    pwResearchInvaildNotice: "",
    userPwResearchMsg: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: async (userEmail) => {
      //return 안해주면 success로 안간다. 성공이든 실패든 응답메시지확인할꺼면 리턴필수
      const res = await patchData("auth/reset-password", userEmail, {
        headers: {
          "Content-type": "application/json",
        },
      });
      return res;
    },
    onMutate: () => {
      const condition = localStorage.getItem("userAccessToken");
      if (condition) {
        return;
      }
    },
    onSuccess: () => {
      setSubmitSuccess(true);
    },
    onError: (error) => {
      if (error.response.status === 404) {
        setErrors({
          ...errors,
          pwResearchInvaildNotice: "inVaild",
          userPwResearchMsg: "존재하지 않는 회원입니다.",
        });
      } else if (error.response.status === 500) {
        setErrors({
          ...errors,
          pwResearchInvaildNotice: "inVaild",
          userPwResearchMsg: "서버와의 연결이 끊겼습니다.",
        });
      }
    },
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });

    setErrors({
      ...value,
      pwResearchInvaildNotice: "default",
      userPwResearchMsg: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitLoading) {
      return;
    }
    setSubmitLoading(true);

    if (value.userPwResearch === "" || !emailReg.test(value.userPwResearch)) {
      setErrors({
        ...errors,
        pwResearchInvaildNotice: "inVaild",
        userPwResearchMsg: "이메일 형식이 올바르지 않습니다.",
      });
    } else {
      const refine = {
        email: value.userPwResearch,
      };

      mutate(JSON.stringify(refine));
    }
    setSubmitLoading(false);
  };

  return {
    value,
    errors,
    isPending,
    submitSuccess,
    setSubmitSuccess,
    handleChange,
    handleSubmit,
  };
}
