import useMypage from "@/hooks/useMypage";
import HomeThumnailCard from "@/components/HomeThumnailCard";
import BucketCard from "@/components/BucketCard";
import BucketChangeModal from "@/components/BucketChangeModal";

import {
  DefaultContainer,
  DefaultImgWrapper,
  DefaultImg,
  DefaultNotice,
  AddBucketButton,
  PlusIcon,
  CardContainer,
} from "@/pages/Main/style";

export default function Main() {
  const {
    detailModal,
    bucketChangeModal,
    homeCardData,
    homeCardDetailData,
    isLoading,
    date,
    imgData,
    valueData,
    calanderModalState,
    homeObserver,
    handleHomeDetailView,
    handleHomeDetailModalClose,
    handleAddBucket,
    handleHomeDetailBucketDelete,
    handleDetailHeartAndScrapClick,
    handleBucketDelete,
    handleBucketComplete,
    handleHomeDetailBucketComplete,
    handleBucketChangeModalState,
    handleBucketChangeModalAndSetBoardId,
    handleValueChange,
    handleImageUpload,
    handleBucketChangeSubmit,
    setDate,
    setCalanderModalState,
  } = useMypage();
  const contentMaxViewLength = 18;
  const titleMaxViewLength = 15;

  return (
    <>
      {bucketChangeModal && (
        <BucketChangeModal
          date={date}
          setDate={setDate}
          valueData={valueData}
          imgData={imgData}
          calanderModalState={calanderModalState}
          setCalanderModalState={setCalanderModalState}
          handleValueChange={handleValueChange}
          handleImageUpload={handleImageUpload}
          handleBucketChangeModalState={handleBucketChangeModalState}
          handleBucketChangeSubmit={handleBucketChangeSubmit}
        />
      )}
      {detailModal && (
        <BucketCard
          boardId={homeCardDetailData.boardId}
          nickname={homeCardDetailData.nickname}
          avatar={
            homeCardDetailData.avatar
              ? homeCardDetailData.avatar
              : "/images/default_profile.png"
          }
          title={homeCardDetailData.title}
          cardImg={homeCardDetailData.cardImg}
          cardContent={homeCardDetailData.cardContent}
          commentList={homeCardDetailData.commentList}
          cardCreated={homeCardDetailData.created}
          heartCount={homeCardDetailData.heartCount}
          scrapCount={homeCardDetailData.scrapCount}
          isCompleted={homeCardDetailData.isCompleted}
          putModalOptions={true}
          bucketChangeModalState={bucketChangeModal}
          date={date}
          setDate={setDate}
          valueData={valueData}
          imgData={imgData}
          calanderModalState={calanderModalState}
          setCalanderModalState={setCalanderModalState}
          handleValueChange={handleValueChange}
          handleImageUpload={handleImageUpload}
          handleBucketChangeModalState={handleBucketChangeModalState}
          handleBucketChangeSubmit={handleBucketChangeSubmit}
          handleHeartClick={handleDetailHeartAndScrapClick(
            "heart",
            homeCardDetailData.boardId
          )}
          handleScrapClick={handleDetailHeartAndScrapClick(
            "scrap",
            homeCardDetailData.boardId
          )}
          modalCloseHandle={handleHomeDetailModalClose}
          handleDetailBucketDelete={handleHomeDetailBucketDelete(
            homeCardDetailData.boardId
          )}
          handleDetailBucketComplete={handleHomeDetailBucketComplete(
            homeCardDetailData.boardId
          )}
        />
      )}
      {!localStorage.getItem("userAccessToken") ||
      (homeCardData?.length === 0 && !isLoading) ? (
        <DefaultContainer>
          <DefaultImgWrapper>
            <DefaultImg onClick={handleAddBucket} />
            <DefaultNotice>새로운 버킷 리스트를 만들어 보세요!</DefaultNotice>
          </DefaultImgWrapper>
          <AddBucketButton onClick={handleAddBucket}>
            <PlusIcon />
          </AddBucketButton>
        </DefaultContainer>
      ) : (
        <>
          <CardContainer>
            {Array.isArray(homeCardData) &&
              homeCardData.map((data, idx) => {
                return (
                  <HomeThumnailCard
                    key={"homeThumnail" + data.boardId}
                    boardId={data.boardId}
                    curThumnail={idx}
                    title={
                      data.title.length > titleMaxViewLength
                        ? data.title.substring(0, titleMaxViewLength) + "..."
                        : data.title
                    }
                    content={
                      data.content?.length > contentMaxViewLength
                        ? data.content.substring(0, contentMaxViewLength) +
                          "\n" +
                          data.content.substring(
                            contentMaxViewLength,
                            contentMaxViewLength * 2
                          ) +
                          "..."
                        : data.content
                    }
                    deadline={data.deadline}
                    DdayViewState={true}
                    Dday={data.Dday}
                    thumnailSrc={data.filepath}
                    avatar={data.filename}
                    isFinish={data.finishTotal}
                    isCompleted={data.isCompleted}
                    isProgress={data.progressTotal}
                    putOptionModalState={data.putOptions}
                    putOpitonsControl={true}
                    handleHomeDetailModal={handleHomeDetailView(data.boardId)}
                    handleBucketDelete={handleBucketDelete(data.boardId)}
                    handleBucketComplete={handleBucketComplete(data.boardId)}
                    handleBucketChangeModalAndSetBoardId={handleBucketChangeModalAndSetBoardId(
                      data.boardId
                    )}
                  />
                );
              })}
          </CardContainer>
          <AddBucketButton onClick={handleAddBucket}>
            <PlusIcon />
          </AddBucketButton>
        </>
      )}
      {/* 데이터 없으면 빈배열이아니라 문자열오기떄문에 배열인지 한번더확인해줘야함 */}
      {Array.isArray(homeCardData) && homeCardData.length > 0 && (
        <div ref={homeObserver}></div>
      )}
    </>
  );
}
