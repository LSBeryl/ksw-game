import { useState } from "react";
import styled from "styled-components";
import { formatMoney } from "../../utils/formatMoney";

export default function Upgrade(props) {
  return (
    <Wrapper>
      <Box>
        <div>김승원 Lv.{props.level}</div>
        <Stat>
          <div>
            {formatMoney(
              Math.floor(props.clickMoney * (props.clickPercentage / 100))
            )}
            원/클릭 (기본 {formatMoney(props.clickMoney)}원/클릭)
          </div>
          <div>{formatMoney(props.secondMoney)}원/초</div>
        </Stat>
      </Box>
      <Button
        style={{
          background: props.money >= props.changeCost ? "#ffbd72" : "#cac2b6",
        }}
        onClick={() => {
          const setClickMoney = props.setClickMoney;
          const setMoney = props.setMoney;
          const setLevel = props.setLevel;
          const changeCost = props.changeCost;
          const setChangeCost = props.setChangeCost;
          const setAddNum = props.setAddNum;
          setMoney((prevMoney) => {
            if (prevMoney >= Math.floor(changeCost)) {
              setAddNum((prev) => prev + 1.1); // prev => prev + n >> n값 조정해서 증가 비율 달리 할 수 있음
              setClickMoney(
                (prevClickMoney) => prevClickMoney + Math.floor(props.addNum)
              );
              setChangeCost((prevCost) => prevCost * 1.1);
              setLevel((prevLevel) => prevLevel + 1);
              return prevMoney - Math.floor(changeCost);
            } else return prevMoney;
          });
        }}
      >
        <div>{formatMoney(Math.floor(props.changeCost))}원 (U)</div>
        <div>+{formatMoney(Math.floor(props.addNum))}원/클릭</div>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const Box = styled.div`
  background: #ffe3c2;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 1rem;
  width: 50vw;
  max-width: 300px;
  padding: 1rem 0;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));
  @media (max-width: 1024px) {
    width: 80vw;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;
  & > div {
    font-size: 0.9rem;
    color: #00000084;
  }
`;

const Button = styled(Box)`
  background: #ffbd72;
  padding: 1rem 0;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.1s ease;
`;
