import styled from "styled-components";
import Dot from "@/assets/icons/dot.svg?react";
import complete from "@/assets/icons/complete.svg?react";

const Container = styled.li`
  position: relative;
  width: 290px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.5);
  cursor: pointer;
`;

const ContentsWrapper = styled.div`
  position: relative;
  height: 169px;
  overflow: hidden;
  padding: 0 20px 20px 20px;
  background-color: white;
`;

const ThumnailImgBox = styled.div`
  position: relative;
  height: 290px;
`;

const CreateDateBox = styled.div`
  color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  font-size: ${({ theme: { typo } }) => {
    return typo.size.sm;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.medium;
  }};
  padding-top: 20px;
`;

const Title = styled.h2`
  color: ${({ theme: { colors } }) => {
    return colors.black;
  }};
  font-size: ${({ theme: { typo } }) => {
    return typo.size.lg;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  padding: 20px 0 30px;
`;

const ContentBox = styled.p`
  color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  line-height: 23px;
  white-space: pre-wrap;
`;

const DdayView = styled.div`
  position: absolute;
  width: 60px;
  height: 30px;
  right: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ $isOverdue, theme: { colors } }) => {
    return $isOverdue > 0 ? colors.inVaild : colors.primary;
  }};
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  border-radius: 20px;
`;

const ThumnailPutButton = styled(Dot)`
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 20px;
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

const ThumnailPutModalOuter = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
`;
const ThumnailPutModal = styled.ul`
  bottom: 20px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 180px;
  background-color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  border-radius: 20px;
`;

const PutOptionList = styled.li`
  padding: 5px 25px;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.medium;
  }};
  transition: all 0.1s;
  border-radius: 15px;
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
`;

const Complete = styled(complete)`
  position: absolute;
  width: 25px;
  height: 25px;
  top: 20px;
  left: 20px;
  z-index: 1;
  fill: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
`;

export {
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
};
