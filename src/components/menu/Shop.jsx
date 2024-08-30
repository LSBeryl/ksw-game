import styled from "styled-components";
import { formatMoney } from "../../utils/formatMoney";
import goodsJSON from "../../data/goods.json";
import { useEffect, useState } from "react";

export default function Shop(props) {
  return (
    <Wrapper>
      <Container>
        <Title>매점</Title>
        <GoodsContainer>
          {goodsJSON.data &&
            goodsJSON.data.map((data, idx) => (
              <Goods key={idx}>
                <div>
                  <img src={data.img} alt={data.name} />
                  <div>
                    <div>{data.name}</div>
                    <div>{data.desc}</div>
                  </div>
                </div>
                {props.boughtGoods[idx] ? (
                  <div>구매함</div>
                ) : (
                  <div
                    onClick={() => {
                      const setMoney = props.setMoney;
                      const setClickPercentage = props.setClickPercentage;
                      const setBoughtGoods = props.setBoughtGoods;
                      if (props.money >= data.cost && !props.boughtGoods[idx]) {
                        setMoney((prevMoney) => {
                          if (
                            props.money >= data.cost &&
                            !props.boughtGoods[idx]
                          ) {
                            return prevMoney - data.cost;
                          } else return prevMoney;
                        });
                        setBoughtGoods((prevBoughtGoods) => {
                          const tempBoughtGoods = [...prevBoughtGoods];
                          tempBoughtGoods[idx] = true;
                          return tempBoughtGoods;
                        });
                        setClickPercentage(
                          (prevClickPercentage) =>
                            prevClickPercentage + data.plus
                        );
                      }
                    }}
                  >
                    <div>{formatMoney(data.cost)}원</div>
                    <div>+{formatMoney(data.plus)}% 원/클릭</div>
                  </div>
                )}
              </Goods>
            ))}
        </GoodsContainer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  border-top: 0.5rem solid #6a4921;
  background: #ffe3c2;
  border-radius: 1rem;
  padding: 1rem;
  width: 40%;
  height: 28vh;
  overflow-y: scroll;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1024px) {
    width: 90%;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const GoodsContainer = styled.div`
  /* gap: 1rem; */
  display: flex;
  flex-direction: column;
  border-top: 2px solid #6a4921;
`;

const Goods = styled.div`
  padding: 1rem;
  flex-grow: 1;
  border-bottom: 2px solid #6a4921;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  & > div {
    &:nth-child(1) {
      display: flex;
      align-items: center;
      gap: 1rem;
      & > img {
        height: 5rem;
        @media (max-width: 1024px) {
          height: 3rem;
        }
      }
      & > div {
        & > div:nth-child(1) {
          font-size: 1.1rem;
        }
        & > div:nth-child(2) {
          font-size: 0.8rem;
        }
        @media (max-width: 1024px) {
          & > div:nth-child(1) {
            font-size: 0.9rem;
          }
          & > div:nth-child(2) {
            font-size: 0.6rem;
          }
        }
      }
    }
    &:nth-child(2) {
      background: #175710;
      color: #fff;
      border-radius: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 5.5rem;
      height: 2.5rem;
      transition: all 0.1s ease;
      font-size: 0.7rem;
      min-width: 88px;
      cursor: pointer;
      &:hover {
        background: #175710ad;
      }
      & > div:nth-child(2) {
        font-size: 0.6rem;
        color: #ffffffce;
        @media (max-width: 1024px) {
          font-size: 0.5rem;
        }
      }
      @media (max-width: 1024px) {
        font-size: 0.6rem;
      }
    }
  }
  @media (max-width: 1024px) {
    padding: 0.5rem;
  }
`;
