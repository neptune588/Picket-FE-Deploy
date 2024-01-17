import ThumnailImg from "@/components/ThumnailImg/ThumnailImg";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import LikeButton from "@/components/LikeButton/LikeButton";
import ScrapButton from "@/components/ScrapButton/ScrapButton";

import {
  Container,
  ThumnailImgBox,
  ProfileWrapper,
  ButtonBox,
  Complete,
} from "@/components/ThumnailCard/style";

export default function ThumnailCard({
  width,
  height,
  title,
  avatarSrc,
  nickname = "빈값",
  thumnailSrc = "/images/test_thumnail.jpg",
  likeCount,
  scrapCount,
  isCompleted,
  likeAndScrap = true,
  handleDetailView,
  handleHeartClick = null,
  handleScrapClick = null,
}) {
  return (
    <Container $width={width}>
      {isCompleted === 1 && <Complete />}
      <ThumnailImgBox $height={height} onClick={handleDetailView}>
        <ThumnailImg thumnailSrc={thumnailSrc} />
        <h2>{title}</h2>
      </ThumnailImgBox>
      {likeAndScrap && (
        <ProfileWrapper>
          <ProfileAvatar nickname={nickname} avatarSrc={avatarSrc} />
          <ButtonBox>
            <LikeButton
              handleHeartClick={handleHeartClick}
              width={16}
              height={16}
            />
            <span>{likeCount}</span>
            <ScrapButton
              handleScrapClick={handleScrapClick}
              width={18}
              height={18}
            />
            <span>{scrapCount}</span>
          </ButtonBox>
        </ProfileWrapper>
      )}
    </Container>
  );
}
