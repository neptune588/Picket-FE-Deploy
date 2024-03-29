import { Link } from "react-router-dom";

import styled from "styled-components";
import Alarm from "@/assets/icons/alarm.svg?react";
import Symbol from "@/assets/icons/symbol.svg?react";
import Search from "@/assets/icons/search.svg?react";
import Cross from "@/assets/icons/cross.svg?react";

const NavBarWrapper = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0px 20px;
  border-bottom: solid 1px
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
  z-index: 10000;
`;

const SymbolIcon = styled(Symbol)`
  margin-right: 15px;
`;

const NavLinkBox = styled.div`
  a {
    margin-right: 5px;
  }
`;
const NavStyle = styled(Link)`
  display: inline-block;
  width: ${({ $width }) => {
    return $width;
  }};
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  outline: none;
  border-radius: 30px;
  cursor: pointer;
  color: ${({ $menuNum, $activeNum, theme: { colors } }) => {
    return $activeNum === $menuNum && colors.white;
  }};
  background-color: ${({ $menuNum, $activeNum, theme: { colors } }) => {
    return $activeNum === $menuNum && colors.gray["80"];
  }};
  &:hover {
    background-color: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
    color: white;
  }
`;

const SearchBarBox = styled.div`
  position: absolute;
  display: block;
  left: 50%;
  transform: translateX(-50%);
  width: 1060px;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 20px;
  height: 20px;
`;

const SearchBar = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  padding: 10px 10px 10px 30px;
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["20"];
  }};
  color: ${({ theme: { colors } }) => {
    return colors.black;
  }};
  text-indent: 1em;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  outline: none;
  border: none;
  border-radius: 30px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 20px;
  height: 20px;
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
`;

const CloseCrossIcon = styled(Cross)`
  position: absolute;
  display: inline-block;
  width: 10px;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  stroke: #e9e9ee;
`;

const AlarmBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  align-items: center;
  user-select: none;
  z-index: 9000;
`;

const AlarmIcon = styled(Alarm)`
  width: ${({ $width }) => {
    return $width;
  }};
  height: ${({ $height }) => {
    return $height;
  }};
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  cursor: pointer;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 24px;
    height: 24px;
    overflow: hidden;
    border-radius: 50%;
  }
  > p {
    margin-left: 5px;
  }
`;

const Dropdown = styled.ul`
  top: 65px;
  right: 20px;
  width: 160px;
  height: 150px;
  border-radius: 2em;
  position: absolute;
  background: white;
  box-shadow: gray 0px 3px 8px;

  & > li {
    height: calc(150px / 2);
    text-align: center;
    display: flex;
    user-select: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const LoginNotice = styled.p`
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.medium;
  }};
  color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  margin-left: 5px;
  cursor: pointer;
  user-select: none;
`;

const SearchModalWrraper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const SearchModalCloseArea = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  cursor: pointer;
`;

const SearchModal = styled.div`
  position: relative;
  width: 1060px;
  margin: 0 auto;
  padding: 0 40px 40px;
  background-color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 10;
`;

const SubTitle = styled.h2`
  font-size: ${({ theme: { typo } }) => {
    return typo.size.lg;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  padding: 45px 0 20px;
`;

const NavTagBox = styled.div`
  display: flex;
  align-items: center;
`;

const NavTag = styled.div`
  padding: 20px 25px;
  color: ${({ theme: { colors } }) => {
    return colors.gray["60"];
  }};
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["0"];
  }};
  border-radius: 30px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
    color: white;
    > svg {
      stroke: ${({ theme: { colors } }) => {
        return colors.gray["20"];
      }};
    }
  }
`;

const NavTagDelButton = styled(Cross)`
  display: inline-block;
  width: 15px;
  hegiht: 15px;
  stroke: ${({ theme: { colors } }) => {
    return colors.gray["40"];
  }};
  margin: 0 20px 0 10px;
  cursor: pointer;
  user-select: none;

  &:hover {
    stroke: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
  }
`;

const ThumnailCardBox = styled.div`
  display: flex;
  > li {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export {
  NavBarWrapper,
  SymbolIcon,
  NavLinkBox,
  NavStyle,
  SearchBarBox,
  SearchIcon,
  SearchBar,
  CloseButton,
  CloseCrossIcon,
  AlarmBox,
  AlarmIcon,
  ProfileWrapper,
  ProfileBox,
  Dropdown,
  LoginNotice,
  SubTitle,
  NavTagBox,
  NavTag,
  NavTagDelButton,
  ThumnailCardBox,
  SearchModalWrraper,
  SearchModalCloseArea,
  SearchModal,
};
