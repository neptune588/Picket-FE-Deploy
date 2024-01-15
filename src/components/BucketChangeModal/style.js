import styled from "styled-components";

const ModalOuter = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999999;
`;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 60px;
  background-color: white;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  > form {
    display: flex;
  }
`;

const ButtonBox = styled.div`
  margin-top: 40px;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  width: 400px;
`;
export { ModalOuter, Container, ButtonBox };
