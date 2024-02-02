import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bucketDetailData: {
    boardId: null,
    title: "",
    categoryList: [],
    cardContent: "",
    cardImg: "",
    created: "",
    commentList: [],
    heartCount: 0,
    scrapCount: 0,
    nickname: "",
    avatar: "",
    isCompleted: 0,
  },
  curScrollLocation: 0,
};

const bucketDetailSlice = createSlice({
  name: "bucketDetail",
  initialState,
  reducers: {
    setDetailButcket(state, action) {
      const { bucketDetailData } = state;
      const { payload: bucketData } = action;

      bucketDetailData.boardId = bucketData.boardId;
      bucketDetailData.title = bucketData.title;
      bucketDetailData.categoryList = bucketData.categoryList;
      bucketDetailData.cardContent = bucketData.cardContent;
      bucketDetailData.cardImg = bucketData.cardImg;
      bucketDetailData.created = bucketData.created;
      bucketDetailData.commentList = bucketData.commentList;
      bucketDetailData.heartCount = bucketData.heartCount;
      bucketDetailData.scrapCount = bucketData.scrapCount;
      bucketDetailData.nickname = bucketData.nickname;
      bucketDetailData.avatar = bucketData.avatar;
      bucketDetailData.isCompleted = bucketData.isCompleted;

      console.log(bucketData);
    },
    setScrollLocation(state, action) {
      const { payload: scrollY } = action;
      state.curScrollLocation = scrollY;
    },
    setCommentModalState(state, action) {
      const { bucketDetailData } = state;
      const { payload: curCommentPutModal } = action;
      let { curCommentNumber, putOptionsState } = curCommentPutModal;

      bucketDetailData.commentList.forEach((comment) => {
        comment.putOptions = false;
        bucketDetailData.commentList[curCommentNumber].putOptions =
          putOptionsState;
      });
    },
  },
});

export const { setDetailButcket, setCommentModalState, setScrollLocation } =
  bucketDetailSlice.actions;
export default bucketDetailSlice.reducer;
