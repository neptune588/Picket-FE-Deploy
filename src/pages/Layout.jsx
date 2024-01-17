import { useEffect } from "react";

import { useLocation, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";

import { deleteThumnailCard } from "@/store/bucketThumnailSlice";
import {
  setKeywordParams,
  setPrevParams,
  setTotalParams,
} from "@/store/parameterSlice";
import { setMenuActive } from "@/store/navBarMenuSlice";

import useModalControl from "@/hooks/useModalControl";
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
    $isNavDetailModal,
  }) => {
    return (
      ($isSearchModal ||
        $isDetailModal ||
        $isProfileEditModal ||
        $isNavDetailModal ||
        $isBucketChangeModal) &&
      "calc(100vh - 70px)"
    );
  }};
  overflow: ${({
    $isSearchModal,
    $isDetailModal,
    $isProfileEditModal,
    $isBucketChangeModal,
    $isNavDetailModal,
  }) => {
    return $isSearchModal ||
      $isDetailModal ||
      $isProfileEditModal ||
      $isNavDetailModal ||
      $isBucketChangeModal
      ? "hidden"
      : "visible";
  }};
  padding: 0px 80px;
  margin: 0 auto;
`;

export default function Layout() {
  const {
    detailModal,
    profileEditModal,
    searchModal,
    bucketChangeModal,
    navDetailModal,
  } = useSelectorList();
  const {
    handleSearchModalState,
    handleDetailModalState,
    handleNavDetailModalState,
  } = useModalControl();

  const dispatch = useDispatch();

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
      <NavBar />
      <CenterdContainer
        $isProfileEditModal={profileEditModal}
        $isSearchModal={searchModal}
        $isDetailModal={detailModal}
        $isBucketChangeModal={bucketChangeModal}
        $isNavDetailModal={navDetailModal}
      >
        <Outlet />
      </CenterdContainer>
    </>
  );
}
7;
