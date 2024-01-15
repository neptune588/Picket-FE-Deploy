import { useDispatch } from "react-redux";

import {
  setDetailBucketModal,
  setSearchModal,
  setBucketChangeModal,
  setProfileEditModal,
} from "@/store/modalsSlice";

export default function useModalControl() {
  const dispatch = useDispatch();

  const handleDetailModalState = () => {
    dispatch(setDetailBucketModal());
  };

  const handleSearchModalState = () => {
    dispatch(setSearchModal());
  };

  const handleProfileModalState = () => {
    dispatch(setProfileEditModal());
  };

  const handleBucketChangeModalState = () => {
    dispatch(setBucketChangeModal());
  };

  return {
    handleDetailModalState,
    handleSearchModalState,
    handleProfileModalState,
    handleBucketChangeModalState,
  };
}
