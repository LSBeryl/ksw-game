import styled from "styled-components";
import Saying from "./Saying";

export default function Main(props) {
  return (
    <Wrapper
      onClick={() => {
        const setMoney = props.setMoney;
        const clickMoney = props.clickMoney;
        const setAddedMoney = props.setAddedMoney;
        const clickPercentage = props.clickPercentage;
        setMoney(
          (prevMoney) =>
            prevMoney + Math.floor(clickMoney * (clickPercentage / 100))
        );
        setAddedMoney((prevAddedMoney) => [...prevAddedMoney, clickMoney]);
      }}
    >
      <Background></Background>
      <Char>
        <img src="/images/won_stand.png" alt="김승원" />
      </Char>
      <Saying />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 5 1 0;
  background: url("/images/background.webp") no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
`;

const Char = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  & > img {
    height: 23rem;

    @media (max-width: 1024px) {
      height: 18rem;
    }
  }
`;
