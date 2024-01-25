import NavBar from "@/components/NavBar";
import LocationBar from "@/components/LocationBar/LocationBar";
import Category from "@/components/Category/Category";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import BucketCalander from "@/components/BucketCalander";

import useAddBucket from "@/hooks/useAddBucket";

import {
  Container,
  ImageUploadWrapper,
  ThumnailEditButton,
  GuideBox,
  AddButtonIcon,
  AddImgMsg,
  ContentsWrapper,
  InputBox,
  InputTextArea,
  ButtonBox,
  NextButton,
  PrevButton,
  CalanderSetButton,
  ColordBell,
} from "@/pages/AddBucketPage/style";
import Input from "@/components/Input/Input";

export default function AddBucketPage() {
  const {
    date,
    imgData,
    valueData,
    categoryData,
    step,
    calanderModalState,
    setDate,
    setStep,
    setCalanderModalState,
    handleImageUpload,
    handleValueChange,
    handleCategoryClick,
    handleNextStepCheck,
    handleSubmit,
  } = useAddBucket();

  return (
    <>
      <NavBar />
      {calanderModalState && (
        <BucketCalander
          curdate={date}
          setCurDate={setDate}
          modalClose={() => {
            setCalanderModalState(false);
          }}
        />
      )}
      <LocationBar content={"버킷 추가"} />
      <Container>
        <form onSubmit={handleSubmit}>
          <ImageUploadWrapper htmlFor="thumnailUpload">
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
            {step === 0 && (
              <>
                <InputBox>
                  <h2>태그</h2>
                  <ul>
                    {categoryData.map((data, idx) => {
                      return (
                        <Category
                          key={data.id}
                          isActive={data.activeState}
                          content={data.content}
                          onClick={handleCategoryClick(idx, data.query)}
                        />
                      );
                    })}
                  </ul>
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
                    maxLength={210}
                    value={valueData.bucketContent}
                    name={"bucketContent"}
                    placeholder={"내용을 입력하세요."}
                    onChange={handleValueChange}
                  />
                </InputBox>
                <NextButton onClick={handleNextStepCheck}>다음</NextButton>
              </>
            )}
            {step === 1 && (
              <>
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
                <ButtonBox>
                  <PrevButton
                    onClick={() => {
                      setStep(0);
                    }}
                  >
                    이전
                  </PrevButton>
                  <SubmitButton width={"195px"} value={"작성"} />
                </ButtonBox>
              </>
            )}
          </ContentsWrapper>
        </form>
      </Container>
    </>
  );
}
