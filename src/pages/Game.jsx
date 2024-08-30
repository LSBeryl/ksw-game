import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import imgJSON from "../data/imgs.json";
import goodsJSON from "../data/goods.json";
import classMoneyJSON from "../data/classmoney.json";
import bonusJSON from "../data/bonus.json";

export default function Game() {
  // 로직
  // 회원가입(UID 받아올 수 있도록) > 게임 하면서 10초마다 정보 자동 저장(Firestore) > 나중에 다시 로그인 하면 그 정보로 할 수 있음
  // 이런 방식으로 하면 굳이 LocalStorage 안 써도 됨 > 크로스 플랫폼

  const [isImgLoaded, setIsImgLoaded] = useState(false); // 게임 내 이미지 파일 로딩 되었는지 확인
  const [money, setMoney] = useState(0); // 현재 가진 돈
  const [clickMoney, setClickMoney] = useState(1); // 클릭 당 돈
  const [addedMoney, setAddedMoney] = useState([]); // 클릭 시 현재 돈 위에 뜨는 추가되는 돈
  const [level, setLevel] = useState(1); // 현재 레벨
  const [addNum, setAddNum] = useState(1); // 레벨 업 시 증가되는 클릭 당 돈
  const [changeCost, setChangeCost] = useState(10); // 레벨 업 비용
  const [clickPercentage, setClickPercentage] = useState(100); // 클릭 당 돈 추가 퍼센트
  const [secondMoney, setSecondMoney] = useState(0); // 초당 돈
  const [boughtGoods, setBoughtGoods] = useState([]); // 구매한 매점 상품 / true면 삼, false면 안 삼
  const [boughtClassMoney, setBoughtClassMoney] = useState([]); // 구매한 학급비 상품
  const [bonusCount, setBonusCount] = useState([0, 0, 0]); // 구매한 보너스 개수

  const [isKeyUp, setIsKeyUp] = useState(true); // 스페이스 눌렸는지 확인

  const imgs = imgJSON.data; // 미리 로딩할 파일명

  const preLoadImg = useCallback(() => {
    const loadImg = imgs.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.src = url;
      });
    });
    return Promise.all(loadImg);
  }, [imgs]);

  useEffect(() => {
    const saveData = JSON.parse(window.localStorage.getItem("data"));
    if (saveData) {
      setMoney(saveData.money);
      setClickMoney(saveData.clickMoney);
      setLevel(saveData.level);
      setAddNum(saveData.addNum);
      setChangeCost(saveData.changeCost);
      setClickPercentage(saveData.clickPercentage);
      setSecondMoney(saveData.secondMoney);
      setBoughtGoods(saveData.boughtGoods);
      setBoughtClassMoney(saveData.boughtClassMoney);
      setBonusCount(saveData.bonusCount);
    } else {
      goodsJSON.data.forEach((_) => {
        setBoughtGoods((prevBoughtGoods) => [...prevBoughtGoods, false]);
      });
      classMoneyJSON.data.forEach((_) => {
        setBoughtClassMoney((prevBoughtClassMoney) => [
          ...prevBoughtClassMoney,
          false,
        ]);
      });
    }
  }, []);

  useEffect(() => {
    const preLoad = async () => await preLoadImg();
    preLoad().then(() => {
      setIsImgLoaded(true);
    });
  }, [preLoadImg]);

  useEffect(() => {
    const keydownEvent = (e) => {
      if (e.key == " " && isKeyUp) {
        setMoney(
          (prevMoney) =>
            prevMoney + Math.floor(clickMoney * (clickPercentage / 100))
        );
        setAddedMoney((prevAddedMoney) => [...prevAddedMoney, clickMoney]);
        setIsKeyUp(false);
      } else if (e.key == "u" || e.key == "U" || e.key == "ㅕ") {
        setMoney((prevMoney) => {
          if (prevMoney >= Math.floor(changeCost)) {
            setAddNum((prev) => prev + 1.1); // prev => prev + n >> n값 조정해서 증가 비율 달리 할 수 있음
            setClickMoney(
              (prevClickMoney) => prevClickMoney + Math.floor(addNum)
            );
            setChangeCost((prevCost) => prevCost * 1.1);
            setLevel((prevLevel) => prevLevel + 1);
            return prevMoney - Math.floor(changeCost);
          } else return prevMoney;
        });
      }
    };
    const keyupEvent = (e) => {
      if (e.key == " " && !isKeyUp) {
        setIsKeyUp(true);
      }
    };
    window.addEventListener("keydown", keydownEvent);
    window.addEventListener("keyup", keyupEvent);
    return () => {
      window.removeEventListener("keydown", keydownEvent);
      window.removeEventListener("keyup", keyupEvent);
    };
  }, [clickMoney, isKeyUp]);

  return (
    <>
      {isImgLoaded ? (
        <Wrapper>
          <Header
            money={money}
            setMoney={setMoney}
            clickMoney={clickMoney}
            addedMoney={addedMoney}
            clickPercentage={clickPercentage}
            secondMoney={secondMoney}
          />
          <Main
            setMoney={setMoney}
            clickMoney={clickMoney}
            setAddedMoney={setAddedMoney}
            clickPercentage={clickPercentage}
          />
          <Footer
            setClickMoney={setClickMoney}
            clickMoney={clickMoney}
            setMoney={setMoney}
            money={money}
            level={level}
            setLevel={setLevel}
            addNum={addNum}
            setAddNum={setAddNum}
            changeCost={changeCost}
            setChangeCost={setChangeCost}
            setClickPercentage={setClickPercentage}
            clickPercentage={clickPercentage}
            boughtGoods={boughtGoods}
            setBoughtGoods={setBoughtGoods}
            boughtClassMoney={boughtClassMoney}
            setBoughtClassMoney={setBoughtClassMoney}
            secondMoney={secondMoney}
            setSecondMoney={setSecondMoney}
            bonusCount={bonusCount}
            setBonusCount={setBonusCount}
          />
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
