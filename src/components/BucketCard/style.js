import styled from "styled-components";
import Comment from "@/assets/icons/commentIcon.svg?react";
import Cross from "@/assets/icons/cross.svg?react";
import Dot from "@/assets/icons/dot.svg?react";
import complete from "@/assets/icons/complete.svg?react";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99999;
`;

const CardPutModalOuter = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999999;
`;

const CardPutModal = styled.ul`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 325px;
  background-color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  border-radius: 40px;
  z-index: 10;
  > li {
    padding: 10px 40px;
    font-size: ${({ theme: { typo } }) => {
      return typo.size.md;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.medium;
    }};
    transition: all 0.1s;
    border-radius: 25px;
    margin-bottom: 5px;
    &:hover {
      color: ${({ theme: { colors } }) => {
        return colors.white;
      }};
      background-color: ${({ theme: { colors } }) => {
        return colors.gray["80"];
      }};
    }
    &:last-child {
      margin-bottom: 0;
    }
    cursor: pointer;
  }
  > h2 {
    font-size: ${({ theme: { typo } }) => {
      return typo.size.xl;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.bold;
    }};
    user-select: none;
    margin-bottom: 50px;
  }
`;

const CardPutButton = styled(Dot)`
  width: 20px;
  height: 20px;
  transition: all 0.2s;
  cursor: pointer;
  fill: ${({ theme: { colors } }) => {
    return colors.gray["40"];
  }};
  &:hover {
    fill: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
  }
`;

const ModalCloseArea = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  cursor: pointer;
  z-index: 1;
`;

const ModalCloseButton = styled(Cross)`
  position: absolute;
  width: 25px;
  height: 25px;
  top: 20px;
  right: 30px;
  stroke: ${({ theme: { colors } }) => {
    return colors.black;
  }};
  z-index: 10;
  cursor: pointer;

  &:hover {
    stroke: ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
  }
`;

const BucketWrraper = styled.div`
  position: absolute;
  display: flex;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1100px;
  height: 550px;
  border-radius: 35px;
  z-index: 10;
`;

const ImgWrapper = styled.div`
  width: 50%;
  height: 100%;
  user-select: none;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TotalContentWrapper = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  padding: 45px 45px 40px 40px;
`;

const ProfileBox = styled.div`
  > p {
    margin-left: 10px;
    color: ${({ theme: { colors } }) => {
      return colors.gray["100"];
    }};
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0 20px;
  > h2 {
    font-size: ${({ theme: { typo } }) => {
      return typo.size.xl;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.bold;
    }};
  }
`;

const CardCreatedDate = styled.p`
  font-size: ${({ theme: { typo } }) => {
    return typo.size.sm;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  color: ${({ theme: { colors } }) => {
    return colors.gray["60"];
  }};
  margin-bottom: 20px;
`;

const ContentBox = styled.div`
  height: 120px;
  margin-bottom: 30px;
  > p {
    color: ${({ theme: { colors } }) => {
      return colors.gray["100"];
    }};
    line-height: 25px;
  }
`;

const IconsBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  > div {
    display: flex;
    align-items: center;
    margin-right: 12px;
    > span {
      display: inline-block;
      font-size: ${({ theme: { typo } }) => {
        return typo.size.md;
      }};
      color: ${({ theme: { colors } }) => {
        return colors.gray["60"];
      }};
      margin-left: 2px;
    }
  }
`;

const CommentIcon = styled(Comment)`
  width: 12px;
  height: 12px;
  margin-right: 2px;
`;

const CommentListBox = styled.div`
  height: 100px;
  overflow-y: scroll;
  line-height: 30px;
  > div {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    > img {
      flex: 0 0 auto;
      width: 30px;
      height: 30px;
      overflow: hidden;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 10px;
    }
    > p {
      color: ${({ theme: { colors } }) => {
        return colors.gray["100"];
      }};
      &:nth-child(2) {
        width: 80px;
        margin-right: 10px;
        font-weight: ${({ theme: { typo } }) => {
          return typo.weight.bold;
        }};
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      &:last-child {
        width: 360px;
        margin-right: 10px;
      }
    }
  }
`;

const CommentPutButton = styled(Dot)`
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 7px;
  right: 20px;
  transition: all 0.2s;
  cursor: pointer;
  fill: ${({ theme: { colors } }) => {
    return colors.gray["40"];
  }};
  &:hover {
    fill: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
  }
`;

const CommentPutArea = styled.ul`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0px;
  right: 15px;
  user-select: none;
  > li {
    cursor: pointer;
    margin-left: 10px;
    transition: all 0.2s;
    color: ${({ theme: { colors } }) => {
      return colors.gray["60"];
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.medium;
    }};
    &:hover {
      color: ${({ theme: { colors } }) => {
        return colors.gray["100"];
      }};
    }
    &:first-child {
      margin-left: 0;
    }
  }
`;

const CommentListNot = styled.div`
  height: 100px;
  line-height: 65px;
  color: ${({ theme: { colors } }) => {
    return colors.gray["60"];
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.medium;
  }};
  text-align: center;
`;

const CommentBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  > form {
    display: flex;
    align-items: center;
  }

  > p {
    margin-right: 5px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
  > svg {
    width: 15px;
    height: 15px;
  }
`;

const CommentUserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextInputArea = styled.textarea`
  display: flex;
  width: 400px;
  height: 50px;
  margin-left: 10px;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  color: ${({ theme: { colors } }) => {
    return colors.gray["60"];
  }};
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["20"];
  }};
  border: none;
  resize: none;
  border-radius: 35px;
  padding: 15px 50px 15px 15px;
  overflow: hidden;
  &:focus {
    outline: none;
    border: none;
  }
`;

const SendIcon = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  color: ${({ theme: { colors } }) => {
    return colors.gray["60"];
  }};
  user-select: none;
  margin-left: 10px;
  transition: all 0.2s;
  transform: translateY(-2px);
  > input {
    cursor: pointer;
    position: relative;
    border: none;
    display: block;
    width: 100%;
    height: 100%;
    background-color: transparent;
    outline: none;
    z-index: 10;
  }
  > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &:hover {
    color: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
  }
`;

const MentDelButton = styled.div`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
`;

const CrossIcon = styled(Cross)`
  position: absolute;
  display: inline-block;
  width: 10px;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  stroke: #e9e9ee;
`;

const Complete = styled(complete)`
  position: absolute;
  width: 35px;
  height: 35px;
  top: 20px;
  left: 20px;
  z-index: 1;
  fill: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
`;

export {
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
  TextInputArea,
  SendIcon,
  MentDelButton,
  CrossIcon,
  Complete,
};
