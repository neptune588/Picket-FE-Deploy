import { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { setKeywordParams } from "@/store/parameterSlice";
import { setDetailButcket } from "@/store/bucketDetailSlice";
import { deleteHomeThumnailCard } from "@/store/bucketThumnailSlice";
import { setMenuActive } from "@/store/navBarMenuSlice";

import { getData } from "@/services/api";
import { postData } from "@/services/api";

import useModalControl from "@/hooks/useModalControl";
import useSelectorList from "@/hooks/useSelectorList";
import useTokenReissue from "@/hooks/useTokenReissue";

export default function useNavBarOptions() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    searchModal,
    navDetailModal,
    keyword,
    bucketDetailData,
    navActiveNumber,
  } = useSelectorList();
  const { tokenRequest } = useTokenReissue();

  const { handleNavDetailModalState, handleSearchModalState } =
    useModalControl();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userNickName, setUserNickName] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [keywordListData, setKeywordListData] = useState([]);
  const [latestDetailCard, setLatestDetailCard] = useState({});
  const [clickButtonType, setClickButtonType] = useState(null);
  const [recursiveCount, setRecursiveCount] = useState(0);

  const searchTextBar = useRef();
  const mounted04 = useRef(false);

  const OnClickDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const loginCheck = () => {
    const condition = localStorage.getItem("userNickname");
    if (condition) {
      setUserNickName(JSON.parse(condition));
    }
  };

  const handleSignOut = () => {
    dispatch(deleteHomeThumnailCard());
    localStorage.removeItem("userAccessToken");
    localStorage.removeItem("userRefreshToken");
    localStorage.removeItem("userNickname");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("userId");

    setUserNickName("");
  };

  const handleNavigate = (params) => {
    return () => {
      navigate(params);
    };
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleMenuActive = (activeNum) => {
    return () => {
      dispatch(setMenuActive(activeNum));
    };
  };

  const keywordIncludeInspect = (curKeyword) => {
    const latestKeywordList = JSON.parse(localStorage.getItem("keywordList"));

    if (latestKeywordList) {
      //변수에 복사해서 해야함 그대로 건드리면 안되는듯.
      const refine = [...latestKeywordList];
      !refine.some((obj) => obj.value === curKeyword) &&
        refine.push({ id: "id" + curKeyword, value: curKeyword });

      refine.length > 5 && refine.splice(0, 1);
      localStorage.setItem("keywordList", JSON.stringify(refine));
      setKeywordListData(refine);
    } else {
      const firstData = [{ id: "id" + curKeyword, value: curKeyword }];
      localStorage.setItem("keywordList", JSON.stringify(firstData));
      setKeywordListData(firstData);
    }
  };

  const handleLatestKeywordDelete = (curTagNumber) => {
    return () => {
      const latestKeywordList = JSON.parse(localStorage.getItem("keywordList"));
      const refine = [...latestKeywordList];

      refine.splice(curTagNumber, 1);
      localStorage.setItem("keywordList", JSON.stringify(refine));
      setKeywordListData(refine);
    };
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (
        searchValue === "" ||
        searchValue === undefined ||
        searchValue === null
      ) {
        dispatch(setKeywordParams(["", ""]));
      } else {
        dispatch(setKeywordParams(["&keyword=", searchValue]));
      }

      searchValue
        ? navigate(`/search/${searchValue}`)
        : navigate("/search/default");

      searchValue && keywordIncludeInspect(searchValue);

      setSearchValue("");
      searchTextBar.current && searchTextBar.current.focus();
    }
  };

  const handleKeywordClick = (curClickKeyword) => {
    return () => {
      navigate(`/search/${curClickKeyword}`);
      dispatch(setKeywordParams(["&keyword=", curClickKeyword]));
      searchTextBar.current && searchTextBar.current.focus();
    };
  };

  const handleDetailCardReq = async (boardId) => {
    try {
      const { data } = await getData(`board/${boardId}`);
      data.commentList.forEach((obj) => (obj.putOptions = false));

      data.deadline[1] = String(data.deadline[1]).padStart(2, 0);
      data.deadline[2] = String(data.deadline[2]).padStart(2, 0);
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
          isCompleted: data.isCompleted,
        })
      );

      !navDetailModal && handleNavDetailModalState();
    } catch (error) {
      console.error("error발생", error);
    }
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
      setRecursiveCount(0);
      handleDetailCardReq(latestDetailCard.boardId);
    },
    onError: (error) => {
      setRecursiveCount((prev) => prev + 1);
      if (recursiveCount >= 2) {
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("userRefreshToken");
        localStorage.removeItem("userNickname");
        localStorage.removeItem("userAvatar");
        localStorage.removeItem("userId");

        alert("권한이 없습니다. 다시 로그인 해주세요!");
        navigate("/auth/signin");
      } else if (error.response.status === 401) {
        tokenRequest.mutate();
        detailLikeAndScrapReq(`${latestDetailCard.boardId}/${clickButtonType}`);
      } else if (error.response.status === 400) {
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("userRefreshToken");
        localStorage.removeItem("userNickname");
        localStorage.removeItem("userAvatar");
        localStorage.removeItem("userId");

        alert("로그인이 만료되었습니다. 재로그인 하시겠습니까?") &&
          navigate("/auth/signin");
      } else {
        console.error("error");
      }
    },
  });

  const handleDetailHeartAndScrapClick = (type) => {
    return () => {
      const condition = localStorage.getItem("userAccessToken");
      if (!condition) {
        const question = confirm(
          "로그인을 하셔야 이용 가능합니다. 로그인 하시겠습니까?"
        );
        question && navigate("/auth/signin");
        return;
      } else {
        switch (type) {
          case "heart": {
            setClickButtonType("like");
            detailLikeAndScrapReq.mutate(`${latestDetailCard.boardId}/like`);
            break;
          }
          case "scrap": {
            setClickButtonType("scrap");
            detailLikeAndScrapReq.mutate(`${latestDetailCard.boardId}/scrap`);
            break;
          }
        }
      }
    };
  };

  useEffect(() => {
    const latestKeywordList = JSON.parse(localStorage.getItem("keywordList"));
    loginCheck();
    latestKeywordList?.length > 0 && setKeywordListData([...latestKeywordList]);
  }, []);

  useEffect(() => {
    if (!mounted04.current) {
      mounted04.current = true;
    } else {
      setLatestDetailCard(bucketDetailData);
    }
  }, [bucketDetailData]);

  return {
    keyword,
    keywordListData,
    searchTextBar,
    searchValue,
    dropdownOpen,
    userNickName,
    searchModal,
    navDetailModal,
    latestDetailCard,
    navActiveNumber,
    setSearchValue,
    handleChange,
    handleSearch,
    handleSignOut,
    handleNavigate,
    handleKeywordClick,
    handleLatestKeywordDelete,
    handleDetailCardReq,
    handleNavDetailModalState,
    handleSearchModalState,
    handleDetailHeartAndScrapClick,
    handleMenuActive,
    OnClickDropdown,
  };
}
