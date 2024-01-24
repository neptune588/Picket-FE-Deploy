import { useSelector } from "react-redux";

export default function useSelectorList() {
  const homeParams = useSelector((state) => {
    return state.homeParameter;
  });
  const params = useSelector((state) => {
    return state.parameter;
  });
  const moadals = useSelector((state) => {
    return state.modals;
  });
  const cards = useSelector((state) => {
    return state.bucketThumnail;
  });
  const bucketDetailObj = useSelector((state) => {
    return state.bucketDetail;
  });
  const navBarMenuNumber = useSelector((state) => {
    return state.navBarMenu;
  });

  const {
    detailModal,
    searchModal,
    profileEditModal,
    bucketChangeModal,
    navDetailModal,
  } = moadals;
  const { page: homePage, totalParams: totalHomeParams } = homeParams;
  const { page, keyword, categoryList, prevParams, totalParams } = params;
  const { homeThumnailCards, thumnailCards, curBoardId } = cards;
  const { bucketDetailData, curScrollLocation } = bucketDetailObj;
  const { activeNumber: navActiveNumber } = navBarMenuNumber;

  return {
    detailModal,
    searchModal,
    profileEditModal,
    bucketChangeModal,
    navDetailModal,
    bucketDetailData,
    curScrollLocation,
    homePage,
    totalHomeParams,
    page,
    keyword,
    categoryList,
    prevParams,
    totalParams,
    homeThumnailCards,
    thumnailCards,
    curBoardId,
    navActiveNumber,
  };
}
