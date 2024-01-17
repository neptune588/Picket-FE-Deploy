import { useDispatch } from "react-redux";

import {
  Container,
  ContentsWrapper,
  ThumnailImgBox,
  CreateDateBox,
  Title,
  ContentBox,
  DdayView,
  ThumnailPutButton,
  ThumnailPutModalOuter,
  ThumnailPutModal,
  PutOptionList,
  Complete,
} from "@/components/HomeThumnailCard/style";

import { setHomeThumnailPutModalState } from "@/store/bucketThumnailSlice";

import ThumnailImg from "@/components/ThumnailImg/ThumnailImg";

export default function HomeThumnailCard({
  boardId,
  title,
  content,
  deadline,
  thumnailSrc,
  handleHomeDetailModal,
  curThumnail,
  putOpitonsControl = null,
  putOptionModalState = null,
  handleBucketDelete = null,
  handleBucketComplete = null,
  handleBucketChangeModalAndSetBoardId,
  Dday = null,
  DdayViewState = null,
  isCompleted,
  /*   avatar,
  isFinish,
  isProgress, */
}) {
  const dispatch = useDispatch();

  const handlePutOptionModalState = (curThumnailNumber, curPutOptionsState) => {
    return () => {
      dispatch(
        setHomeThumnailPutModalState({ curThumnailNumber, curPutOptionsState })
      );
    };
  };

  return (
    <Container>
      {isCompleted === 1 && <Complete />}
      {putOptionModalState && (
        <ThumnailPutModalOuter>
          <ThumnailPutModal>
            <PutOptionList onClick={handleBucketComplete}>
              버킷 달성
            </PutOptionList>
            <PutOptionList onClick={handleBucketChangeModalAndSetBoardId}>
              버킷 수정
            </PutOptionList>
            <PutOptionList onClick={handleBucketDelete}>
              버킷 삭제
            </PutOptionList>
            <PutOptionList
              onClick={handlePutOptionModalState(curThumnail, false)}
            >
              취소
            </PutOptionList>
          </ThumnailPutModal>
        </ThumnailPutModalOuter>
      )}
      <ThumnailImgBox onClick={handleHomeDetailModal}>
        <ThumnailImg
          thumnailSrc={thumnailSrc ? thumnailSrc : "/images/test_thumnail.jpg"}
        />
      </ThumnailImgBox>
      <ContentsWrapper>
        {isCompleted === 0 && DdayViewState && (
          <DdayView $isOverdue={Dday}>
            {Dday > 0 ? "D+" + Dday : "D-" + Math.abs(Dday)}
          </DdayView>
        )}

        {putOpitonsControl && (
          <ThumnailPutButton
            onClick={handlePutOptionModalState(curThumnail, true)}
          />
        )}

        <CreateDateBox onClick={handleHomeDetailModal}>
          {deadline}
        </CreateDateBox>
        <Title onClick={handleHomeDetailModal}>{title}</Title>
        <ContentBox onClick={handleHomeDetailModal}>{content}</ContentBox>
      </ContentsWrapper>
    </Container>
  );
}
