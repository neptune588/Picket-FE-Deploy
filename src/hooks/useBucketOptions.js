import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import {
  setDetailButcket,
  setCommentModalState,
} from "@/store/bucketDetailSlice";

import useSelectorList from "@/hooks/useSelectorList";
import useTokenReissue from "@/hooks/useTokenReissue";

import { postData } from "@/services/api";
import { getData } from "@/services/api";
import { delData } from "@/services/api";

export default function useBucketOptions() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { bucketDetailData } = useSelectorList();
  const { tokenRequest } = useTokenReissue();

  const [commentValue, setCommentValue] = useState("");
  const [putModal, setPutModal] = useState(false);
  const [commentDeleteButton, setCommentDeleteButton] = useState(false);
  const [curEventCommentId, setCurEventCommentId] = useState(null);
  const [recursiveCount, setRecursiveCount] = useState(0);

  const commentCreateInput = useRef();

  const errorHandle = (error, callback) => {
    if (recursiveCount >= 2) {
      localStorage.removeItem("userAccessToken");
      localStorage.removeItem("userRefreshToken");
      localStorage.removeItem("userNickname");
      localStorage.removeItem("userAvatar");

      alert("권한이 없습니다. 다시 로그인 해주세요!");
      navigate("/auth/signin");
    } else if (error.response.status === 401) {
      tokenRequest.mutate();
      callback();
    } else if (error.response.status === 400) {
      localStorage.removeItem("userAccessToken");
      localStorage.removeItem("userRefreshToken");
      localStorage.removeItem("userNickname");
      localStorage.removeItem("userAvatar");

      alert("로그인이 만료되었습니다. 재로그인 하시겠습니까?") &&
        navigate("/auth/signin");
    } else if (error.response.status === 403) {
      alert("권한이 없습니다!");
    } else {
      console.error("error발생", error);
    }
  };

  const handleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleCurCommentDel = () => {
    setCommentValue("");
    commentCreateInput.current && commentCreateInput.current.focus();
  };

  const handleLoginCheck = () => {
    confirm("로그인을 하셔야 이용 가능합니다. 로그인 하시겠습니까?") &&
      navigate("/auth/signin");
  };

  const createCommentReq = useMutation({
    mutationFn: async ({ boardId, content }) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await postData(`board/${boardId}/comments`, content, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
    },
    onSuccess: async (res) => {
      setRecursiveCount(0);
      handleCurCommentDel();
      alert(res.data.message);
      const { data } = await getData(`board/${bucketDetailData.boardId}`);
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
        })
      );
    },
    onError: (error) => {
      setRecursiveCount((prev) => prev + 1);
      errorHandle(error, () => {
        createCommentReq.mutate({
          boardId: bucketDetailData.boardId,
          content: JSON.stringify({ content: commentValue }),
        });
      });
    },
  });

  const handleCommentCreate = (boardId) => {
    if (
      commentValue === "" ||
      commentValue === null ||
      commentValue === undefined
    ) {
      alert("댓글 내용을 작성 해주세요!");
    } else {
      createCommentReq.mutate({
        boardId: boardId,
        content: JSON.stringify({ content: commentValue }),
      });
    }
  };

  const commentDelReq = useMutation({
    mutationFn: async ({ boardId, commentId }) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await delData(`board/${boardId}/comments/${commentId}`, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: async (res) => {
      setRecursiveCount(0);
      alert(res.data.message);
      const { data } = await getData(`board/${bucketDetailData.boardId}`);
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
        })
      );
    },
    onError: (error) => {
      setRecursiveCount((prev) => prev + 1);
      errorHandle(error, () => {
        commentDelReq.mutate({
          boardId: bucketDetailData.boardId,
          commentId: curEventCommentId,
        });
      });
    },
  });

  const handleCommentDelReq = (boardId, commentId) => {
    return () => {
      const question = confirm("댓글을 삭제 하시겠습니까?");
      if (question) {
        setCurEventCommentId(commentId);
        commentDelReq.mutate({ boardId, commentId });
      }
    };
  };

  const handlePutModal = (curCommentNumber, putOptionsState) => {
    return () => {
      dispatch(setCommentModalState({ curCommentNumber, putOptionsState }));
    };
  };

  return {
    putModal,
    commentValue,
    commentCreateInput,
    commentDeleteButton,
    setPutModal,
    setCommentDeleteButton,
    handleChange,
    handleCurCommentDel,
    handleLoginCheck,
    handleCommentCreate,
    handlePutModal,
    handleCommentDelReq,
  };
}
