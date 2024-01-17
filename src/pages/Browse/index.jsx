import useBrwoseGetItem from "@/hooks/useBrwoseGetItem";

import Category from "@/components/Category/Category";
import ThumnailCard from "@/components/ThumnailCard";
import ThumnailCardSkeleton from "@/components/ThumnailCardSkeleton";
import TopButton from "@/components/TopButton/TopButton";
import BucketCard from "@/components/BucketCard";

import {
  Container,
  BucketNotContainer,
  CategoryBox,
  SubTitle,
} from "@/pages/Browse/style";

export default function Browse() {
  const {
    dummy,
    keyword,
    cardData,
    categoryData,
    isLoading,
    dummyObserver,
    CardDetailData,
    detailModal,
    observerRef,
    handleCategoryClick,
    handleDetailView,
    handleDetailModalClose,
    handleHeartAndScrapClick,
    handleDetailHeartAndScrapClick,
  } = useBrwoseGetItem();
  const nicknameViewLength = 8;
  const titleViewLength = 12;
  return (
    <>
      {detailModal && (
        <BucketCard
          boardId={CardDetailData.boardId}
          nickname={CardDetailData.nickname}
          avatar={
            CardDetailData.avatar
              ? CardDetailData.avatar
              : "/images/default_profile.png"
          }
          title={CardDetailData.title}
          cardImg={CardDetailData.cardImg}
          cardContent={CardDetailData.cardContent}
          cardCreated={CardDetailData.created}
          heartCount={CardDetailData.heartCount}
          commentList={CardDetailData.commentList}
          scrapCount={CardDetailData.scrapCount}
          isCompleted={CardDetailData.isCompleted}
          putModalOptions={false}
          handleHeartClick={handleDetailHeartAndScrapClick(
            "heart",
            CardDetailData.boardId
          )}
          handleScrapClick={handleDetailHeartAndScrapClick(
            "scrap",
            CardDetailData.boardId
          )}
          modalCloseHandle={handleDetailModalClose}
        />
      )}
      <SubTitle>
        {keyword.value
          ? `'${keyword.value}'에 대한 검색 결과 입니다.`
          : "오늘의 추천 버킷리스트를 발견 해보세요."}
      </SubTitle>
      <TopButton
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      />
      <CategoryBox>
        {categoryData.map((category, idx) => {
          return (
            <Category
              key={category.id}
              isActive={category.activeState}
              content={category.content}
              onClick={handleCategoryClick(idx, category.query)}
            />
          );
        })}
      </CategoryBox>
      <Container>
        {cardData.length > 0 &&
          cardData.map((card) => {
            return (
              <ThumnailCard
                key={"thumnail" + card.boardId}
                width={"290px"}
                height={"290px"}
                title={
                  card.title.length > titleViewLength
                    ? card.title.substring(0, titleViewLength) + "..."
                    : card.title
                }
                thumnailSrc={card.filepath}
                avatarSrc={
                  card.filename ? card.filename : "/images/default_profile.png"
                }
                nickname={
                  card.nickname?.length > nicknameViewLength
                    ? card.nickname.substring(0, nicknameViewLength) + "..."
                    : card.nickname
                }
                likeCount={card.likeCount}
                scrapCount={card.scrapCount}
                isCompleted={card.isCompleted}
                handleDetailView={handleDetailView(card.boardId)}
                handleHeartClick={handleHeartAndScrapClick(
                  "heart",
                  card.boardId
                )}
                handleScrapClick={handleHeartAndScrapClick(
                  "scrap",
                  card.boardId
                )}
              />
            );
          })}
        {isLoading &&
          dummy.map((dummyContent) => {
            return (
              <ThumnailCardSkeleton
                key={dummyContent.id}
                width={"290px"}
                height={"290px"}
              />
            );
          })}
      </Container>
      {cardData.length > 0 && (
        <>
          <div style={{ height: "2000px" }} ref={dummyObserver}></div>
          <div ref={observerRef}></div>
        </>
      )}
      {cardData.length === 0 && keyword.value && (
        <BucketNotContainer>
          <p>해당 버킷을 찾을 수 없습니다.</p>
        </BucketNotContainer>
      )}
    </>
  );
}
