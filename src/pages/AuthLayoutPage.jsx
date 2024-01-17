import { useEffect } from "react";

import { useLocation, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteThumnailCard } from "@/store/bucketThumnailSlice";
import {
  setKeywordParams,
  setPrevParams,
  setTotalParams,
} from "@/store/parameterSlice";

import useModalControl from "@/hooks/useModalControl";
import useSelectorList from "@/hooks/useSelectorList";

import { setMenuActive } from "@/store/navBarMenuSlice";

export default function AuthLayoutPage() {
  const dispatch = useDispatch();

  const { detailModal, searchModal, navDetailModal } = useSelectorList();
  const {
    handleSearchModalState,
    handleDetailModalState,
    handleNavDetailModalState,
  } = useModalControl();

  const location = useLocation();

  useEffect(() => {
    searchModal && handleSearchModalState();
    detailModal && handleDetailModalState();
    navDetailModal && handleNavDetailModalState();

    const browseUrl = location.pathname.split("/").includes("search");
    if (!browseUrl) {
      dispatch(setKeywordParams(["", ""]));
      dispatch(setTotalParams());
      dispatch(setPrevParams());
      dispatch(deleteThumnailCard());
    }

    if (!(location.pathname === "/" || browseUrl)) {
      dispatch(setMenuActive(null));
    }
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
}
