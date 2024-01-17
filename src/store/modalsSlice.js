import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchModal: false,
  detailModal: false,
  navDetailModal: false,
  profileEditModal: false,
  bucketChangeModal: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setSearchModal(state) {
      state.searchModal = !state.searchModal;
    },
    setDetailBucketModal(state) {
      state.detailModal = !state.detailModal;
    },
    setNavDetailBucketModal(state) {
      state.navDetailModal = !state.navDetailModal;
    },
    setProfileEditModal(state) {
      state.profileEditModal = !state.profileEditModal;
    },
    setBucketChangeModal(state) {
      state.bucketChangeModal = !state.bucketChangeModal;
    },
  },
});

export const {
  setSearchModal,
  setDetailBucketModal,
  setNavDetailBucketModal,
  setProfileEditModal,
  setBucketChangeModal,
} = modalsSlice.actions;
export default modalsSlice.reducer;
