import { useEffect } from "react";

import { useLocation, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSearchModal, setDetailBucketModal } from "@/store/modalsSlice";
import { deleteThumnailCard } from "@/store/bucketThumnailSlice";
import {
  setKeywordParams,
  setPrevParams,
  setTotalParams,
} from "@/store/parameterSlice";
import { setMenuActive } from "@/store/navBarMenuSlice";

import useSelectorList from "@/hooks/useSelectorList";

import styled from "styled-components";
import NavBar from "@/components/NavBar";

const CenterdContainer = styled.div`
  position: relative;
  width: 1440px;
  height: ${({
    $isSearchModal,
    $isDetailModal,
    $isProfileEditModal,
    $isBucketChangeModal,
  }) => {
    return (
      ($isSearchModal ||
        $isDetailModal ||
        $isProfileEditModal ||
        $isBucketChangeModal) &&
      "calc(100vh - 70px)"
    );
  }};
  overflow: ${({
    $isSearchModal,
    $isDetailModal,
    $isProfileEditModal,
    $isBucketChangeModal,
  }) => {
    return $isSearchModal ||
      $isDetailModal ||
      $isProfileEditModal ||
      $isBucketChangeModal
      ? "hidden"
      : "visible";
  }};
  padding: 0px 80px;
  margin: 0 auto;
`;

export default function Layout() {
  const { detailModal, profileEditModal, searchModal, bucketChangeModal } =
    useSelectorList();

  const dispatch = useDispatch();

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
      <NavBar />
      <CenterdContainer
        $isProfileEditModal={profileEditModal}
        $isSearchModal={searchModal}
        $isDetailModal={detailModal}
        $isBucketChangeModal={bucketChangeModal}
      >
        <Outlet />
      </CenterdContainer>
    </>
  );
}
7;
