import BucketCalander from "@/components/BucketCalander";
import Input from "@/components/Input/Input";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

import {
  ModalOuter,
  Container,
  ButtonBox,
} from "@/components/BucketChangeModal/style";
import {
  ImageUploadWrapper,
  ThumnailEditButton,
  GuideBox,
  AddButtonIcon,
  AddImgMsg,
  ContentsWrapper,
  InputBox,
  InputTextArea,
  CalanderSetButton,
  ColordBell,
  PrevButton,
} from "@/pages/AddBucketPage/style";

export default function BucketChangeModal({
  date,
  setDate,
  valueData,
  imgData,
  calanderModalState,
  setCalanderModalState,
  handleValueChange,
  handleImageUpload,
  handleBucketChangeModalState,
  handleBucketChangeSubmit,
}) {
  return (
    <>
      {calanderModalState && (
        <BucketCalander
          curdate={date}
          setCurDate={setDate}
          modalClose={() => {
            setCalanderModalState(false);
          }}
        />
      )}
      <ModalOuter>
        <Container>
          <form onSubmit={handleBucketChangeSubmit}>
            <ImageUploadWrapper>
              <input
                type="file"
                id="thumnailUpload"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imgData.previewImg ? (
                <>
                  <img src={imgData.previewImg} alt={"thumanilImg"} />
                  <ThumnailEditButton />
                </>
              ) : (
                <GuideBox>
                  <AddButtonIcon />
                  <AddImgMsg>이미지를 선택 하세요.</AddImgMsg>
                </GuideBox>
              )}
            </ImageUploadWrapper>
            <ContentsWrapper>
              <InputBox>
                <h2>알림 설정</h2>
                <CalanderSetButton
                  onClick={() => {
                    setCalanderModalState(true);
                  }}
                >
                  <p>
                    {date.getFullYear() +
                      "." +
                      String(date.getMonth() + 1).padStart(2, 0) +
                      "." +
                      String(date.getDate()).padStart(2, 0)}
                  </p>
                  <ColordBell />
                </CalanderSetButton>
              </InputBox>
              <InputBox>
                <h2>제목</h2>
                <Input
                  maxLength={25}
                  width={"100%"}
                  type={"text"}
                  name={"bucketTitle"}
                  placeholder={"제목을 입력하세요."}
                  value={valueData.bucketTitle}
                  onChange={handleValueChange}
                />
              </InputBox>
              <InputBox>
                <h2>설명</h2>
                <InputTextArea
                  maxLength={90}
                  value={valueData.bucketContent}
                  name={"bucketContent"}
                  placeholder={"내용을 입력하세요."}
                  onChange={handleValueChange}
                />
              </InputBox>
              <ButtonBox>
                <PrevButton onClick={handleBucketChangeModalState}>
                  취소
                </PrevButton>
                <SubmitButton width={"195px"} value={"완료"} />
              </ButtonBox>
            </ContentsWrapper>
          </form>
        </Container>
      </ModalOuter>
    </>
  );
}
