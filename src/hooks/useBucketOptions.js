import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import {
  setDetailButcket,
  setCommentModalState,
} from "@/store/bucketDetailSlice";

import useSelectorList from "@/hooks/useSelectorList";

import { postData } from "@/services/api";
import { getData } from "@/services/api";
import { delData } from "@/services/api";

export default function useBucketOptions() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { bucketDetailData } = useSelectorList();

  const [commentValue, setCommentValue] = useState("");
  const [putModal, setPutModal] = useState(false);
  const [commentDeleteButton, setCommentDeleteButton] = useState(false);

  const commentCreateInput = useRef();

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
      alert(res.data.message);
      const { data } = await getData(`board/${bucketDetailData.boardId}`);
      data.commentList.forEach((obj) => (obj.putOptions = false));
      dispatch(
        setDetailButcket({
          boardId: data.boardId,
          title: data.title,
          categoryList: data.categoryList,
          cardContent: data.content,
          cardImg: data.filepath,
          created: data.deadline.split("-").join("."),
          commentList: data.commentList,
          heartCount: data.heartCount,
          scrapCount: data.scrapCount,
          nickname: data.nickname,
          avatar: data.profileImg,
        })
      );
    },
    onError: (error) => {
      if (error.response.status) {
        console.error("error");
      }
    },
  });

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
      alert(res.data.message);
      const { data } = await getData(`board/${bucketDetailData.boardId}`);
      data.commentList.forEach((obj) => (obj.putOptions = false));
      dispatch(
        setDetailButcket({
          boardId: data.boardId,
          title: data.title,
          categoryList: data.categoryList,
          cardContent: data.content,
          cardImg: data.filepath,
          created: data.deadline.split("-").join("."),
          commentList: data.commentList,
          heartCount: data.heartCount,
          scrapCount: data.scrapCount,
          nickname: data.nickname,
          avatar: data.profileImg,
        })
      );
    },
    onError: (error) => {
      if (error.response.status) {
        console.error("error");
      }
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
      handleCurCommentDel();
    }
  };

  const handleCommentDelReq = (boardId, commentId) => {
    return () => {
      const question = confirm("댓글을 삭제 하시겠습니까?");
      if (question) {
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
