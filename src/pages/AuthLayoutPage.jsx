import { useEffect } from "react";

import { useLocation, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteThumnailCard } from "@/store/bucketThumnailSlice";
import { setSearchModal, setDetailBucketModal } from "@/store/modalsSlice";
import {
  setKeywordParams,
  setPrevParams,
  setTotalParams,
} from "@/store/parameterSlice";
import { setMenuActive } from "@/store/navBarMenuSlice";

export default function AuthLayoutPage() {
  const dispatch = useDispatch();

  const modals = useSelector((state) => {
    return state.modals;
  });
  const { searchModal, detailModal } = modals;
  const location = useLocation();

  useEffect(() => {
    searchModal && dispatch(setSearchModal());
    detailModal && dispatch(setDetailBucketModal());

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
