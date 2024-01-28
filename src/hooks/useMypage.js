import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

import {
  setTotalHomeParams,
  setLastBoardHomeParams,
  setPageHomeParams,
} from "@/store/homeParameterSlice";

import {
  setHomeTumnailCards,
  deleteHomeThumnailCard,
  setCurBoardId,
} from "@/store/bucketThumnailSlice";

import { setDetailButcket, setScrollLocation } from "@/store/bucketDetailSlice";

import useModalControl from "@/hooks/useModalControl";
import useSelectorList from "@/hooks/useSelectorList";
import useBucketCreateCommon from "@/hooks/useBucketCreateCommon";
import useTokenReissue from "@/hooks/useTokenReissue";

import { getData } from "@/services/api";
import { postData } from "@/services/api";
import { delData } from "@/services/api";
import { patchData } from "@/services/api";

export default function useMypage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleDetailModalState, handleBucketChangeModalState } =
    useModalControl();
  const {
    detailModal,
    bucketChangeModal,
    homePage,
    totalHomeParams,
    homeThumnailCards,
    bucketDetailData,
    curScrollLocation,
    curBoardId,
  } = useSelectorList();
  const {
    date,
    imgData,
    valueData,
    submitLoading,
    calanderModalState,
    setDate,
    setSubmitLoading,
    setCalanderModalState,
    handleValueChange,
    handleImageUpload,
  } = useBucketCreateCommon();
  const { tokenRequest } = useTokenReissue();

  const [lastPage, setLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [homeCardData, setHomeCardData] = useState([]);
  const [homeCardDetailData, setHomeCardDetailData] = useState({});
  //토큰 재요청시 정보 저장해놓기 위해 (좋아요인가 스크랩인가)
  const [clickButtonType, setClickButtonType] = useState(null);
  const [curFormData, setCurFormData] = useState(null);

  const homeMouted01 = useRef();
  const homeMouted02 = useRef();
  const homeMouted03 = useRef();

  const pageAndBoardDataReset = () => {
    dispatch(setPageHomeParams([`page=`, 0]));
    dispatch(setLastBoardHomeParams(["", ""]));

    dispatch(deleteHomeThumnailCard());

    //setIsLoading(true);
    setLastPage(false);
  };
  const { ref: homeObserver } = useInView({
    threshold: 0,
    onChange: (view) => {
      //스크롤 내렸을때 라스트페이지가 아닐때
      if (view && !lastPage) {
        dispatch(
          setPageHomeParams([
            `${homePage.key}`,
            `${parseInt(homePage.value) + 1}`,
          ])
        );
        dispatch(
          setLastBoardHomeParams([
            "&lastBoardId=",
            `${homeCardData[homeCardData.length - 1].boardId}`,
          ])
        );
        dispatch(setTotalHomeParams());
      }
    },
  });

  const errorHandle = (error, callback) => {
    if (error.response.status === 401) {
      tokenRequest.mutate();
      callback();
    } else if (error.response.status === 400) {
      localStorage.removeItem("userAccessToken");
      localStorage.removeItem("userRefreshToken");
      localStorage.removeItem("userNickname");
      localStorage.removeItem("userAvatar");

      alert("로그인이 만료되었습니다. 재로그인 하시겠습니까?") &&
        navigate("/auth/signin");
    } else {
      console.error("error발생", error);
    }
  };

  const handleAddBucket = () => {
    const loginCheck = localStorage.getItem("userAccessToken");
    if (loginCheck) {
      navigate("/add");
    } else {
      confirm("로그인을 하고 나만의 버킷을 작성 해보세요!") &&
        navigate("/auth/signin");
    }
  };

  const homeCardReq = async (query = "") => {
    try {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      setIsLoading(true);
      const { data } = await getData(`board/myposts?${query}`, {
        headers: {
          Authorization: token,
        },
      });

      if (data.content?.length > 0) {
        if (data.last) {
          //마지막페이지 검증로직
          //라스트페이지면 스켈레톤x axios호출x
          setLastPage(true);
        } else {
          setLastPage(false);
        }
        dispatch(setHomeTumnailCards(data.content));
      } else {
        setLastPage(true);
      }
      setIsLoading(false);
    } catch (error) {
      errorHandle(error, () => {
        homeCardReq(`${homePage.key + 0}`);
      });
    }
  };

  //업데이트 할때 데이터 갱신 용도
  const homeCardRenewal = async () => {
    try {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      const { data } = await getData(
        `board/myposts?size=${homePage.value * 8 + 8}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(deleteHomeThumnailCard());
      dispatch(setHomeTumnailCards(data.content));
    } catch (error) {
      console.error("error발생", error);
    }
  };

  const homeCardDetailReq = async (borardNum) => {
    try {
      const { data } = await getData(`board/${borardNum}`);
      data.commentList.forEach((obj) => (obj.putOptions = false));

      dispatch(
        setDetailButcket({
          boardId: data.boardId,
          title: data.title,
          categoryList: data.categoryList,
          cardContent: data.content,
          cardImg: data.filepath,
          created: data.deadline.join("."),
          commentList: data.commentList,
          heartCount: data.heartCount,
          scrapCount: data.scrapCount,
          nickname: data.nickname,
          avatar: data.profileImg,
          isCompleted: homeCardData.find((card) => card.boardId === borardNum)
            .isCompleted,
        })
      );

      const latestBucket = JSON.parse(localStorage.getItem("latestBucket"));

      const latestCard = homeCardData.find(
        (card) => card.boardId === borardNum
      );
      if (latestBucket) {
        const refine = [...latestBucket];
        !refine.some((card) => card.boardId === borardNum) &&
          refine.push(latestCard);

        refine.length > 4 && refine.splice(0, 1);
        localStorage.setItem("latestBucket", JSON.stringify(refine));
      } else {
        localStorage.setItem("latestBucket", JSON.stringify([latestCard]));
      }

      !detailModal && handleDetailModalState();

      //console.log(data);
    } catch (error) {
      console.error("error발생", error);
    }
  };

  const handleHomeDetailView = (curBoardId) => {
    return () => {
      dispatch(setScrollLocation(window.scrollY));
      homeCardDetailReq(curBoardId);
    };
  };

  const handleHomeDetailModalClose = () => {
    handleDetailModalState();
    setTimeout(() => {
      window.scroll({ top: curScrollLocation, left: 0 });
    }, 50);
  };

  const detailLikeAndScrapReq = useMutation({
    mutationFn: async (curData) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await postData(`board/${curData}`, null, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: async () => {
      homeCardDetailReq(bucketDetailData.boardId);
      homeCardRenewal();
    },
    onError: (error) => {
      errorHandle(error, () => {
        detailLikeAndScrapReq.mutate(
          `${homeCardDetailData.boardId}/${clickButtonType}`
        );
      });
    },
  });

  const handleDetailHeartAndScrapClick = (type, curBoardId) => {
    return () => {
      switch (type) {
        case "heart": {
          setClickButtonType("like");
          detailLikeAndScrapReq.mutate(`${curBoardId}/like`);
          break;
        }
        case "scrap": {
          setClickButtonType("scrap");
          detailLikeAndScrapReq.mutate(`${curBoardId}/scrap`);
          break;
        }
      }
    };
  };

  const bucketDelete = useMutation({
    mutationFn: async (curBoardId) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await delData(`board/${curBoardId}`, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: async () => {
      alert("버킷이 삭제 되었습니다!");
      homeCardRenewal();
    },
    onError: (error) => {
      errorHandle(error, () => {
        bucketDelete.mutate(curBoardId);
      });
    },
  });

  const handleBucketDelete = (curBoardId) => {
    return () => {
      dispatch(setCurBoardId(curBoardId));
      confirm("버킷을 삭제하시겠습니까?") && bucketDelete.mutate(curBoardId);
    };
  };

  const homeDetailBucketDelete = useMutation({
    mutationFn: async (curBoardId) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await delData(`board/${curBoardId}`, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: async () => {
      alert("버킷이 삭제 되었습니다!");
      handleDetailModalState();
      homeCardRenewal();
    },
    onError: (error) => {
      errorHandle(error, () => {
        homeDetailBucketDelete.mutate(homeCardDetailData.boardId);
      });
    },
  });

  const handleHomeDetailBucketDelete = (curBoardId) => {
    return () => {
      confirm("버킷을 삭제하시겠습니까?") &&
        homeDetailBucketDelete.mutate(curBoardId);
    };
  };

  const bucketComplete = useMutation({
    mutationFn: async (curData) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await patchData(`board/${curData}/complete`, null, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: async (res) => {
      //console.log(res);
      homeCardRenewal();
      alert("버킷을 달성하셨습니다!");
    },
    onError: (error) => {
      errorHandle(error, () => {
        bucketComplete.mutate(curBoardId);
      });
    },
  });

  const handleBucketComplete = (curBoardId) => {
    return () => {
      dispatch(setCurBoardId(curBoardId));
      confirm("버킷을 달성하시겠습니까?") && bucketComplete.mutate(curBoardId);
    };
  };

  const homeDetailBucketComplete = useMutation({
    mutationFn: async (curData) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await patchData(`board/${curData}/complete`, null, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: async () => {
      homeCardDetailReq(bucketDetailData.boardId);
      homeCardRenewal();
    },
    onError: (error) => {
      errorHandle(error, () => {
        homeDetailBucketComplete.mutate(homeCardDetailData.boardId);
      });
    },
  });

  const handleHomeDetailBucketComplete = (curBoardId) => {
    return () => {
      confirm("버킷을 달성하시겠습니까?") &&
        homeDetailBucketComplete.mutate(curBoardId);
    };
  };

  const handleBucketChangeModalAndSetBoardId = (curBoardId) => {
    return () => {
      dispatch(setCurBoardId(curBoardId));
      handleBucketChangeModalState();
    };
  };

  const bucketChange = useMutation({
    mutationFn: async ({ formData, boardId }) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await postData(`board/${boardId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
    onSuccess: async () => {
      alert("버킷을 수정 했습니다!");

      homeCardRenewal();
      handleBucketChangeModalState();
    },
    onError: (error) => {
      errorHandle(error, () => {
        bucketChange.mutate({ formData: curFormData, boardId: curBoardId });
      });
    },
  });

  const detailBucketChange = useMutation({
    mutationFn: async ({ formData, boardId }) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await postData(`board/${boardId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
    onSuccess: async () => {
      alert("버킷을 수정 했습니다!");

      homeCardDetailReq(bucketDetailData.boardId);
      homeCardRenewal();
      handleBucketChangeModalState();
    },
    onError: (error) => {
      errorHandle(error, () => {
        detailBucketChange.mutate({
          formData: curFormData,
          boardId: homeCardDetailData.boardId,
        });
      });
    },
  });

  const handleBucketChangeSubmit = (e) => {
    e.preventDefault();

    if (submitLoading) {
      return;
    }
    setSubmitLoading(true);

    //안해도되긴하지만 중복검증
    const { bucketTitle, bucketContent } = valueData;
    const { postImg } = imgData;

    if (bucketTitle && bucketContent && postImg) {
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
      };
      formData.append(
        "patchBoardRequestDTO",
        new Blob([JSON.stringify(contents)], {
          type: "application/json",
        })
      );
      formData.append("file", postImg);
      setCurFormData(formData);

      detailModal
        ? detailBucketChange.mutate({
            formData,
            boardId: homeCardDetailData.boardId,
          })
        : bucketChange.mutate({ formData, boardId: curBoardId });
    } else {
      alert("내용 작성 밑 이미지를 업로드 해주세요!");
    }

    setSubmitLoading(false);
  };

  useEffect(() => {
    pageAndBoardDataReset();
    const isLogin = localStorage.getItem("userAccessToken");
    if (isLogin) {
      homeCardReq(`${homePage.key + 0}`);
      //dispatch(setTotalHomeParams());
      /*       console.log(
        "데이터가 초기화되었고 전체 파라미터가 바뀌었습니다. totalHomeParams 의존성 배열을 실행합니다."
      ); */
    }
  }, []);

  useEffect(() => {
    if (!homeMouted01.current) {
      homeMouted01.current = true;
    } else {
      homeCardReq(totalHomeParams.value);
      /*       console.log(
        "totalHomeParams 의존성 배열입니다. 파라미터가 변경되어 데이터 호출 함수를 실행합니다.(데이터호출)"
      ); */
    }
  }, [totalHomeParams.value]);

  useEffect(() => {
    if (!homeMouted02.current) {
      homeMouted02.current = true;
    } else {
      setHomeCardData(homeThumnailCards.data);

      /*       const latestCard = JSON.parse(localStorage.getItem("latestBucket"));
      if (latestCard && latestCard.length > 0) {
        const refine = latestCard.map((latestCard) => {
          const compare = homeThumnailCards.data.find((card) => {
            return latestCard.boardId === card.boardId;
          });
          return compare ? compare : latestCard;
        });
        localStorage.setItem("latestBucket", JSON.stringify(refine));
      } */
      /*       console.log(homeThumnailCards.data);
      console.log(
        "전역 상태에 데이터가 저장이 되었습니다. setCards를 실행합니다."
      ); */
    }
  }, [homeThumnailCards.data]);

  useEffect(() => {
    if (!homeMouted03.current) {
      homeMouted03.current = true;
    } else {
      setHomeCardDetailData(bucketDetailData);
    }
  }, [bucketDetailData]);

  return {
    detailModal,
    bucketChangeModal,
    homeCardData,
    homeCardDetailData,
    isLoading,
    date,
    imgData,
    valueData,
    submitLoading,
    calanderModalState,
    homeObserver,
    handleHomeDetailView,
    handleHomeDetailModalClose,
    handleAddBucket,
    handleHomeDetailBucketDelete,
    handleDetailHeartAndScrapClick,
    handleBucketDelete,
    handleBucketComplete,
    handleHomeDetailBucketComplete,
    handleBucketChangeModalState,
    handleBucketChangeModalAndSetBoardId,
    handleValueChange,
    handleImageUpload,
    handleBucketChangeSubmit,
    setDate,
    setSubmitLoading,
    setCalanderModalState,
  };
}
