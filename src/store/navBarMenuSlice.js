import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeNumber: 0,
};

const navBarMenuSlice = createSlice({
  name: "navBarMenu",
  initialState,
  reducers: {
    setMenuActive(state, action) {
      state.activeNumber = action.payload;
    },
  },
});

export const { setMenuActive } = navBarMenuSlice.actions;
export default navBarMenuSlice.reducer;
