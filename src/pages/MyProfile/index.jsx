import useMyProfile from "@/hooks/useMyProfile";

import HomeThumnailCard from "@/components/HomeThumnailCard";
import BucketCard from "@/components/BucketCard";
import Input from "@/components/Input/Input";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import BucketChangeModal from "@/components/BucketChangeModal";

import {
  Container,
  ProfileViewBox,
  EditProfileButton,
  EditModalOuter,
  EditModal,
  InputBox,
  UpLoadBox,
  ButtonBox,
  DoubleCheckButton,
  ProfileEditCansleButton,
  ProfileImgUploadButton,
  ModalCloseArea,
  BucketLengthWrapper,
  BucketLengthBox,
  BucketMenuBox,
  ActiveMenu,
  ContentsNotBox,
  CardWrppar,
} from "@/pages/MyProfile/style";

export default function MyProfile() {
  const {
    date,
    valueData,
    imgData,
    completeCount,
    pregressCount,
    activeNumber,
    detailModal,
    profileCardData,
    profileCardDetailData,
    profileEditModal,
    previewImg,
    nikcnameValue,
    nicknameRef,
    errors,
    isLoading,
    dummyObserver,
    bucketChangeModal,
    calanderModalState,
    setCalanderModalState,
    setDate,
    profileCardObserver,
    handleChange,
    handleProfileModalClose,
    handleProfileModalState,
    handleMenuClick,
    handleCardDetailView,
    handleCardDetailModalClose,
    handleBucketDelete,
    handleBucketComplete,
    handleMyDetailBucketComplete,
    handleMyDetailBucketDelete,
    handleDetailHeartClick,
    handleProfileImgChange,
    handleNicknameRepeatCheck,
    handleImageUpload,
    handleValueChange,
    handleBucketChangeSubmit,
    handleBucketChangeModalState,
    handleBucketChangeModalAndSetBoardId,
    profileEditReq,
  } = useMyProfile();
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
          boardId={profileCardDetailData.boardId}
          nickname={profileCardDetailData.nickname}
          avatar={
            profileCardDetailData.avatar
              ? profileCardDetailData.avatar
              : "/images/default_profile.png"
          }
          title={profileCardDetailData.title}
          cardImg={profileCardDetailData.cardImg}
          cardContent={profileCardDetailData.cardContent}
          commentList={profileCardDetailData.commentList}
          cardCreated={profileCardDetailData.created}
          heartCount={profileCardDetailData.heartCount}
          scrapCount={profileCardDetailData.scrapCount}
          putModalOptions={activeNumber === 0 && true}
          isCompleted={profileCardDetailData.isCompleted}
          date={date}
          setDate={setDate}
          valueData={valueData}
          imgData={imgData}
          calanderModalState={calanderModalState}
          setCalanderModalState={setCalanderModalState}
          modalCloseHandle={handleCardDetailModalClose}
          handleHeartClick={
            activeNumber === 0
              ? handleDetailHeartClick(0, profileCardDetailData.boardId)
              : handleDetailHeartClick(1, profileCardDetailData.boardId)
          }
          handleDetailBucketDelete={
            activeNumber === 0 &&
            handleMyDetailBucketDelete(profileCardDetailData.boardId)
          }
          handleDetailBucketComplete={
            activeNumber === 0 &&
            handleMyDetailBucketComplete(profileCardDetailData.boardId)
          }
          handleBucketChangeModalState={handleBucketChangeModalState}
          handleValueChange={handleValueChange}
          handleImageUpload={handleImageUpload}
          handleBucketChangeSubmit={handleBucketChangeSubmit}
        />
      )}
      {profileEditModal && (
        <EditModalOuter>
          <EditModal>
            <h2>프로필 편집</h2>
            <form onSubmit={profileEditReq}>
              <UpLoadBox>
                <label htmlFor="profileUpload">
                  <img
                    src={
                      previewImg
                        ? previewImg
                        : "/images/default_preview_img.png"
                    }
                    alt={previewImg}
                  />

                  <input
                    type="file"
                    id="profileUpload"
                    accept="image/*"
                    onChange={handleProfileImgChange}
                  />
                  <ProfileImgUploadButton></ProfileImgUploadButton>
                </label>
              </UpLoadBox>
              <InputBox>
                <Input
                  maxLength={6}
                  inputRef={nicknameRef}
                  width={"270px"}
                  vaildState={errors.nicknameInvaildNotice}
                  value={nikcnameValue}
                  onChange={handleChange}
                  placeholder={"닉네임을 입력하세요."}
                />
                <DoubleCheckButton onClick={handleNicknameRepeatCheck}>
                  중복확인
                </DoubleCheckButton>
                {errors.nicknameErrorMsg && <p>{errors.nicknameErrorMsg}</p>}
              </InputBox>
              <ButtonBox>
                <ProfileEditCansleButton onClick={handleProfileModalClose}>
                  취소
                </ProfileEditCansleButton>
                <SubmitButton width={"190px"} value={"확인"} />
              </ButtonBox>
            </form>
          </EditModal>
          <ModalCloseArea onClick={handleProfileModalClose} />
        </EditModalOuter>
      )}
      <Container>
        <ProfileViewBox>
          <div>
            <img
              src={
                JSON.parse(localStorage.getItem("userAvatar"))
                  ? JSON.parse(localStorage.getItem("userAvatar"))
                  : "/images/default_preview_img.png"
              }
              alt={"profile_preview_avatar"}
            ></img>
          </div>
          <div>
            <h2>{JSON.parse(localStorage.getItem("userNickname"))}</h2>
            <EditProfileButton onClick={handleProfileModalState} />
          </div>
        </ProfileViewBox>
        <BucketLengthWrapper>
          <BucketLengthBox>
            <span>달성 완료한 버킷</span>
            <span>{completeCount}</span>
          </BucketLengthBox>
          <BucketLengthBox>
            <span>미완료한 버킷</span>
            <span>{pregressCount}</span>
          </BucketLengthBox>
        </BucketLengthWrapper>
        <BucketMenuBox>
          <ActiveMenu
            $isActiveNum={activeNumber}
            $number={0}
            onClick={handleMenuClick(0)}
          >
            마이 버킷
          </ActiveMenu>
          <ActiveMenu
            $isActiveNum={activeNumber}
            $number={1}
            onClick={handleMenuClick(1)}
          >
            스크랩한 버킷
          </ActiveMenu>
        </BucketMenuBox>
        <CardWrppar>
          {Array.isArray(profileCardData) &&
            profileCardData.length > 0 &&
            profileCardData.map((data, idx) => {
              return (
                <HomeThumnailCard
                  key={data.boardId}
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
                  DdayViewState={activeNumber === 0 && true}
                  Dday={activeNumber === 0 && data.Dday}
                  thumnailSrc={
                    activeNumber === 0 ? data.filepath : data.bucketImg
                  }
                  avatar={data.filename}
                  isFinish={data.finishTotal}
                  isCompleted={data.isCompleted}
                  isProgress={data.progressTotal}
                  handleHomeDetailModal={handleCardDetailView(data.boardId)}
                  putOptionModalState={activeNumber === 0 && data.putOptions}
                  putOpitonsControl={activeNumber === 0 && true}
                  handleBucketDelete={
                    activeNumber === 0 && handleBucketDelete(data.boardId)
                  }
                  handleBucketComplete={
                    activeNumber === 0 && handleBucketComplete(data.boardId)
                  }
                  handleBucketChangeModalAndSetBoardId={handleBucketChangeModalAndSetBoardId(
                    data.boardId
                  )}
                />
              );
            })}
        </CardWrppar>
        {(profileCardData === "empty" || profileCardData.length === 0) &&
          !isLoading && (
            <ContentsNotBox>
              <p>버킷을 찾을 수 없습니다.</p>
            </ContentsNotBox>
          )}
        {isLoading && (
          <div style={{ height: "2000px" }} ref={dummyObserver}></div>
        )}
        {Array.isArray(profileCardData) && profileCardData.length > 0 && (
          <div ref={profileCardObserver}></div>
        )}
      </Container>
    </>
  );
}
