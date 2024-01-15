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

  const { detailModal, searchModal, profileEditModal, bucketChangeModal } =
    moadals;
  const { page: homePage, totalParams: totalHomeParams } = homeParams;
  const { page, keyword, categoryList, prevParams, totalParams } = params;
  const {
    homeThumnailCards,
    thumnailCards,
    curBoardId: curHomeThumnailBoardId,
  } = cards;
  const { bucketDetailData, curScrollLocation } = bucketDetailObj;

  return {
    detailModal,
    searchModal,
    profileEditModal,
    bucketChangeModal,
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
    curHomeThumnailBoardId,
  };
}
