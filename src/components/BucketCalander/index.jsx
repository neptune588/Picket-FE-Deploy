import moment from "moment";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "@/components/BucketCalander/style.scss";

import styled from "styled-components";

const ModalOuter = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999999999999999;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 45px 40px 40px 40px;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 25px;
  width: 480px;
  height: 550px;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 400px;
  position: absolute;
  justify-content: space-between;
  margin-top: 60px;
  bottom: 40px;
`;

const CansleButton = styled.div`
  width: 195px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: ${({ theme: { colors } }) => {
    return colors.gray["60"];
  }};
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.secondary;
    }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  border-radius: 15px;
  cursor: pointer;
`;

const ConfirmButton = styled(CansleButton)`
  border: none;
  color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  background-color: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
  cursor: pointer;
`;
export default function BucketCalander({ curdate, setCurDate, modalClose }) {
  //const [selectDate, setSelectDate] = useState(null);

  const minDateFnc = () => {
    const date = new Date();
    return new Date(date.getFullYear(), 0, 1);
  };
  const maxDateFnc = () => {
    const date = new Date();
    //일자리에 0 들어가면 년 월기준으로 바로 전월의 마지막날을 뜻함.
    //ex 2024 01 01 <- 2023 12 31 됨
    return new Date(date.getFullYear() + 5, 11, 0);
  };

  return (
    <ModalOuter>
      <Container>
        <Calendar
          locale="ko"
          //년도 넘기는 버튼
          next2Label={null}
          prev2Label={null}
          minDate={minDateFnc()}
          maxDate={maxDateFnc()}
          onChange={setCurDate}
          value={curdate}
          //이전날짜 5일 다음날짜 5일 보이게하는옵션
          showNeighboringMonth={true}
          //"일"글자 제거
          formatDay={(_, date) => moment(date).format("D")}
          //ex: "년도" 포매팅 2023년 1월 -> 2023. 01
          formatMonthYear={(_, date) => moment(date).format("Y. MM")}
          //요일 시작을 무슨요일로 시작할꺼냐 (월일화수...) (일월화수...)
          //일 부터시작 -> "hebrew"
          calendarType={"hebrew"}
          /*           onClickDay={(date) => {
            const refineDate =
              date.getFullYear() +
              "." +
              String(date.getMonth() + 1).padStart(2, 0) +
              "." +
              String(date.getDate()).padStart(2, 0);

            setSelectDate(refineDate);
          }} */
        />
        <ButtonBox>
          <CansleButton onClick={modalClose}>취소</CansleButton>
          <ConfirmButton onClick={modalClose}>확인</ConfirmButton>
        </ButtonBox>
      </Container>
    </ModalOuter>
  );
}
