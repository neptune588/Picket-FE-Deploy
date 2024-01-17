import { useDispatch } from "react-redux";

import {
  setDetailBucketModal,
  setNavDetailBucketModal,
  setSearchModal,
  setBucketChangeModal,
  setProfileEditModal,
} from "@/store/modalsSlice";

export default function useModalControl() {
  const dispatch = useDispatch();

  const handleDetailModalState = () => {
    dispatch(setDetailBucketModal());
  };

  const handleNavDetailModalState = () => {
    dispatch(setNavDetailBucketModal());
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
    handleNavDetailModalState,
    handleSearchModalState,
    handleProfileModalState,
    handleBucketChangeModalState,
  };
}
