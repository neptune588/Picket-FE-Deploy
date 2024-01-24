//썸네일카드는 상호작용할일이 많아서 전역으로 안뺴두면 안될것같음.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thumnailCards: {
    data: [],
  },
  homeThumnailCards: {
    data: [],
  },
  curBoardId: null,
};

const bucketThumnailSlice = createSlice({
  name: "bucketThumnail",
  initialState,
  reducers: {
    setThumnailCard(state, action) {
      const { thumnailCards } = state;
      const { payload: curThumnailCards } = action;

      thumnailCards.data = [...thumnailCards.data, ...curThumnailCards];
      //console.log(thumnailCards.data[2].filename);
    },
    deleteThumnailCard(state) {
      state.thumnailCards.data = [];
    },
    setHomeTumnailCards(state, action) {
      const { homeThumnailCards } = state;
      const { payload: curHomeThumnailCards } = action;

      const condition = Array.isArray(curHomeThumnailCards);

      if (condition) {
        curHomeThumnailCards.length > 0 &&
          curHomeThumnailCards.forEach((obj) => {
            const date = new Date();
            const compareDate =
              date.getFullYear() +
              "-" +
              String(date.getMonth() + 1).padStart(2, 0) +
              "-" +
              String(date.getDate()).padStart(2, 0);

            const today = new Date(compareDate); // 20240107
            const deadlineDate = new Date(obj.deadline); // 20240106

            obj.Dday = (today - deadlineDate) / (1000 * 60 * 60 * 24);
            obj.putOptions = false;
          });

        homeThumnailCards.data = [
          ...homeThumnailCards.data,
          ...curHomeThumnailCards,
        ];
      } else {
        homeThumnailCards.data = [];
      }

      //console.log(curHomeThumnailCards);
    },
    deleteHomeThumnailCard(state) {
      state.homeThumnailCards.data = [];
    },
    setHomeThumnailPutModalState(state, action) {
      const { homeThumnailCards } = state;
      const { payload: curThumnail } = action;
      let { curThumnailNumber, curPutOptionsState } = curThumnail;

      //console.log(curThumnailNumber, curPutOptionsState);
      homeThumnailCards.data.forEach((obj) => {
        obj.putOptions = false;
      });
      homeThumnailCards.data[curThumnailNumber].putOptions = curPutOptionsState;
    },
    setCurBoardId(state, action) {
      const { payload: boardId } = action;
      state.curBoardId = boardId;
    },
  },
});

export const {
  setThumnailCard,
  deleteThumnailCard,
  setHomeTumnailCards,
  deleteHomeThumnailCard,
  setHomeThumnailPutModalState,
  setCurBoardId,
} = bucketThumnailSlice.actions;
export default bucketThumnailSlice.reducer;
