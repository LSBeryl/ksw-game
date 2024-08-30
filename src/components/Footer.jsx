import { useState } from "react";
import styled from "styled-components";
import Upgrade from "./menu/Upgrade";
import Shop from "./menu/Shop";
import ClassMoney from "./menu/ClassMoney";
import Bonus from "./menu/Bonus";
import Item from "./menu/Item";
import Setting from "./menu/Setting";

export default function Footer(props) {
  const [menu, setMenu] = useState("main");

  return (
    <Wrapper>
      {menu == "main" ? (
        <Container>
          <div>
            <Box
              onClick={() => {
                setMenu("upgrade");
              }}
            >
              <img src="/images/logo.png" alt="김승원" />
              김승원
            </Box>
            <Box
              onClick={() => {
                setMenu("shop");
              }}
            >
              <img src="/images/dimipay.png" alt="매점" />
              매점
            </Box>
          </div>
          <div>
            <Box
              onClick={() => {
                setMenu("classmoney");
              }}
            >
              <img src="/images/money.png" alt="학급비" />
              학급비
            </Box>
            <Box
              onClick={() => {
                if (props.money >= 100000000) setMenu("bonus");
              }}
            >
              {props.money >= 100000000 ? null : (
                <Lock>
                  <img src="/images/lock.png" alt="잠금" />
                </Lock>
              )}
              <img src="/images/thief.png" alt="보너스" />
              보너스
            </Box>
          </div>
          <div>
            <Box
              onClick={() => {
                setMenu("item");
              }}
            >
              <img src="/images/coin.svg" alt="아이템" />
              아이템
            </Box>
            <Box
              onClick={() => {
                setMenu("setting");
              }}
            >
              <img src="/images/setting.png" alt="설정" />
              설정
            </Box>
          </div>
        </Container>
      ) : null}
      {menu != "main" ? (
        <Back
          onClick={() => {
            setMenu("main");
          }}
        >
          돌아가기
        </Back>
      ) : null}
      {menu == "upgrade" ? (
        <Upgrade
          setClickMoney={props.setClickMoney}
          setMoney={props.setMoney}
          money={props.money}
          level={props.level}
          setLevel={props.setLevel}
          addNum={props.addNum}
          setAddNum={props.setAddNum}
          changeCost={props.changeCost}
          setChangeCost={props.setChangeCost}
          clickMoney={props.clickMoney}
          clickPercentage={props.clickPercentage}
          secondMoney={props.secondMoney}
        />
      ) : null}
      {menu == "shop" ? (
        <Shop
          setClickPercentage={props.setClickPercentage}
          setMoney={props.setMoney}
          money={props.money}
          boughtGoods={props.boughtGoods}
          setBoughtGoods={props.setBoughtGoods}
        />
      ) : null}
      {menu == "classmoney" ? (
        <ClassMoney
          setSecondMoney={props.setSecondMoney}
          setMoney={props.setMoney}
          money={props.money}
          boughtClassMoney={props.boughtClassMoney}
          setBoughtClassMoney={props.setBoughtClassMoney}
        />
      ) : null}
      {menu == "bonus" ? (
        <Bonus
          setMoney={props.setMoney}
          money={props.money}
          bonusCount={props.bonusCount}
          setBonusCount={props.setBonusCount}
        />
      ) : null}
      {menu == "item" ? <Item /> : null}
      {menu == "setting" ? (
        <Setting
          money={props.money}
          clickMoney={props.clickMoney}
          level={props.level}
          addNum={props.addNum}
          changeCost={props.changeCost}
          clickPercentage={props.clickPercentage}
          secondMoney={props.secondMoney}
          boughtGoods={props.boughtGoods}
          boughtClassMoney={props.boughtClassMoney}
          bonusCount={props.bonusCount}
        />
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 4 1 0;
  background: #ca9655;
  border-top: 3px solid #9a7547;
  box-sizing: border-box;
  padding: 1rem;
`;

const Box = styled.div`
  background: #ffe3c2;
  display: flex;
  gap: 0.5rem;
  font-size: 1.3rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  /* border: 2px solid #bf894b; */
  width: 50vw;
  max-width: 230px;
  height: 4rem;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  & > img {
    height: 2rem;
    border-radius: 20%;
  }
  &:hover {
    background: #e7cdaf;
  }
  @media (max-width: 1024px) {
    font-size: 1.2rem;
    max-width: 150px;
    height: 3.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  & > div {
    display: flex;
    gap: 1rem;
  }
`;

const Back = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  cursor: pointer;
  &::before {
    content: "<";
    margin-right: 0.5rem;
  }
`;

const Lock = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #00000035;
  border-radius: 1rem;
  z-index: 1;
  cursor: not-allowed;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    height: 3rem;
    transition: all 0.2s ease;
  }
  &:hover > img {
    opacity: 0.5;
  }
`;
