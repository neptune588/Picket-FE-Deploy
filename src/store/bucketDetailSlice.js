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
      //백단에서 디테일쪽은 completed를안주기떄문에 내가 자체적으로 설정해놨음
      //코멘트달떄는 isCompleted키밸류를 프론트단에서 못달아주기떄문에
      // 0이나 1이라는 값이있을때는(존재하면) 그값을 할당 그게 아닌경우에는 그 전의 값을 할당
      bucketDetailData.isCompleted =
        bucketData.isCompleted === 0 || bucketData.isCompleted === 1
          ? bucketData.isCompleted
          : bucketDetailData.isCompleted;

      console.log(bucketDetailData.commentList);
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
