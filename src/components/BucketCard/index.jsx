import { Fragment } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import LikeButton from "@/components/LikeButton/LikeButton";
import ScrapButton from "@/components/ScrapButton/ScrapButton";
import BucketChangeModal from "@/components/BucketChangeModal";

import useBucketOptions from "@/hooks/useBucketOptions";

import {
  CardPutModalOuter,
  CardPutModal,
  CardPutButton,
  Container,
  ModalCloseArea,
  ModalCloseButton,
  BucketWrraper,
  ImgWrapper,
  TotalContentWrapper,
  ProfileBox,
  TitleBox,
  CardCreatedDate,
  ContentBox,
  IconsBox,
  CommentListBox,
  CommentIcon,
  CommentBox,
  CommentPutButton,
  CommentPutArea,
  CommentListNot,
  CommentUserAvatar,
  SendIcon,
  TextInputArea,
  MentDelButton,
  CrossIcon,
  Complete,
} from "@/components/BucketCard/style";

export default function BucketCard({
  boardId,
  nickname,
  avatar,
  title,
  cardImg = "/images/test_thumnail.jpg",
  cardContent,
  cardCreated,
  heartCount,
  scrapCount,
  putModalOptions = false,
  bucketChangeModalState = null,
  date = null,
  setDate = null,
  valueData = null,
  imgData = null,
  calanderModalState = null,
  setCalanderModalState = null,
  isCompleted,
  commentList,
  handleHeartClick,
  handleScrapClick = null,
  modalCloseHandle,
  handleDetailBucketDelete = null,
  handleDetailBucketComplete = null,
  handleValueChange = null,
  handleImageUpload = null,
  handleBucketChangeModalState = null,
  handleBucketChangeSubmit = null,
}) {
  const {
    putModal,
    commentValue,
    commentCreateInput,
    commentDeleteButton,
    setPutModal,
    setCommentDeleteButton,
    handleChange,
    handleCurCommentDel,
    handleLoginCheck,
    handleCommentCreate,
    handlePutModal,
    handleCommentDelReq,
  } = useBucketOptions();
  return (
    <>
      {bucketChangeModalState && (
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
      {putModal && (
        <CardPutModalOuter>
          <CardPutModal>
            <h2>{title}</h2>
            <li onClick={handleDetailBucketComplete}>버킷 달성</li>
            <li onClick={handleBucketChangeModalState}>버킷 수정</li>
            <li onClick={handleDetailBucketDelete}>버킷 삭제</li>
            <li
              onClick={() => {
                setPutModal((prev) => !prev);
              }}
            >
              취소
            </li>
          </CardPutModal>
          <ModalCloseArea
            onClick={() => {
              setPutModal((prev) => !prev);
            }}
          />
        </CardPutModalOuter>
      )}
      <Container>
        <BucketWrraper>
          {isCompleted === 1 && <Complete />}
          <ImgWrapper>
            <img src={cardImg} />
          </ImgWrapper>
          <TotalContentWrapper>
            <ModalCloseButton onClick={modalCloseHandle} />
            <ProfileBox>
              <ProfileAvatar
                avatarSrc={avatar}
                nickname={nickname}
              ></ProfileAvatar>
            </ProfileBox>
            <TitleBox>
              <h2> {title}</h2>
              {localStorage.getItem("userAccessToken") && putModalOptions && (
                <CardPutButton
                  onClick={() => {
                    setPutModal((prev) => !prev);
                  }}
                />
              )}
            </TitleBox>
            <CardCreatedDate>{cardCreated}</CardCreatedDate>
            <ContentBox>
              <p>{cardContent}</p>
            </ContentBox>
            {commentList && commentList.length > 0 ? (
              <CommentListBox>
                {commentList.map((comment, idx) => (
                  <Fragment key={"comment" + comment.id}>
                    <div>
                      <img
                        src={
                          comment.profileUrl
                            ? comment.profileUrl
                            : "/images/default_profile.png"
                        }
                        alt={"profile_avatar"}
                      ></img>
                      <p>{comment.nickname}</p>
                      <p>{comment.content}</p>
                    </div>
                    {localStorage.getItem("userAccessToken") &&
                      JSON.parse(localStorage.getItem("userId")) ===
                        comment.memberId && (
                        <div>
                          {comment.putOptions ? (
                            <CommentPutArea>
                              <li
                                onClick={handleCommentDelReq(
                                  boardId,
                                  comment.id
                                )}
                              >
                                삭제
                              </li>
                              <li onClick={handlePutModal(idx, false)}>취소</li>
                            </CommentPutArea>
                          ) : (
                            <CommentPutButton
                              onClick={handlePutModal(idx, true)}
                            />
                          )}
                        </div>
                      )}
                  </Fragment>
                ))}
              </CommentListBox>
            ) : (
              <CommentListNot>댓글이 존재하지 않습니다.</CommentListNot>
            )}

            <IconsBox>
              <div>
                <LikeButton
                  handleHeartClick={handleHeartClick}
                  width={16}
                  height={16}
                />
                <span>{heartCount}</span>
              </div>
              <div>
                <ScrapButton
                  handleScrapClick={handleScrapClick}
                  width={18}
                  height={18}
                />
                <span>{scrapCount}</span>
              </div>
              <div>
                <CommentIcon />
                <span>{commentList ? commentList?.length : 0}</span>
              </div>
            </IconsBox>
            <CommentBox>
              {localStorage.getItem("userAccessToken") ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommentCreate(boardId);
                  }}
                >
                  <CommentUserAvatar>
                    <img
                      src={
                        JSON.parse(localStorage.getItem("userAvatar"))
                          ? JSON.parse(localStorage.getItem("userAvatar"))
                          : "/images/default_profile.png"
                      }
                      alt={"profile_avatar"}
                    ></img>
                  </CommentUserAvatar>
                  <TextInputArea
                    ref={commentCreateInput}
                    value={commentValue}
                    onChange={handleChange}
                    onFocus={() => {
                      setCommentDeleteButton(true);
                    }}
                    onBlur={() => {
                      setCommentDeleteButton(false);
                    }}
                    placeholder="댓글을 입력하세요."
                    maxLength={150}
                  ></TextInputArea>
                  {commentDeleteButton && (
                    <MentDelButton onClick={handleCurCommentDel}>
                      <CrossIcon />
                    </MentDelButton>
                  )}

                  <SendIcon>
                    <input type="submit" value="" />
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </SendIcon>
                </form>
              ) : (
                <>
                  <p onClick={handleLoginCheck}>댓글달기</p>
                  <CommentIcon />
                </>
              )}
            </CommentBox>
          </TotalContentWrapper>
        </BucketWrraper>

        <ModalCloseArea onClick={modalCloseHandle} />
      </Container>
    </>
  );
}
