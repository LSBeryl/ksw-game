import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { formatMoney } from "../utils/formatMoney";

export default function Header(props) {
  useEffect(() => {
    const secondMoneyInterval = setInterval(() => {
      const setMoney = props.setMoney;
      setMoney((prevMoney) => prevMoney + props.secondMoney);
    }, 1000);
    return () => {
      clearInterval(secondMoneyInterval);
    };
  }, [props.secondMoney]);

  return (
    <Wrapper>
      <div>
        <CoinImg src="images/coin.svg" alt="coin.svg" />
        <Coin>{formatMoney(props.money)}원</Coin>
        {props.addedMoney &&
          props.addedMoney.map((money, idx) => (
            <AddedCoin key={idx}>
              {formatMoney(Math.floor(money * (props.clickPercentage / 100)))}
            </AddedCoin>
          ))}
      </div>
      <div>
        <div>
          {formatMoney(
            Math.floor(props.clickMoney * (props.clickPercentage / 100))
          )}
          원/클릭
        </div>
        <div>{formatMoney(props.secondMoney)}원/초</div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1 1 0;
  /* background: linear-gradient(to right, #dfa156, #ffc57e); */
  background: #0c3707;
  color: #fff;
  border-bottom: 3px solid #803e13;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem 0 0.5rem;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-child(2) {
      flex-direction: column;
      font-size: 1rem;
      gap: 0.3rem;
      @media (max-width: 1024px) {
        font-size: 0.8rem;
      }
    }
  }
`;

const CoinImg = styled.img`
  height: 3rem;
  position: relative;
  top: 0.1rem;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));
`;

const Coin = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const AddedCoinAnimation = keyframes`
  from {
    transform: translate(0, 0);
    opacity: 1;
  }
  to {
    transform: translate(0, -1rem);
    opacity: 0;
  }
`;

const AddedCoin = styled.div`
  /* font-size: 0.9rem; */
  animation: ${AddedCoinAnimation} 0.5s forwards;
  width: 0;
  position: relative;
  white-space: nowrap;
  top: 0.1rem;
  left: 0.5rem;
  &::before {
    content: "+";
  }
`;
