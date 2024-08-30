import styled from "styled-components";
import sayingJSON from "../data/saying.json";
import { useEffect, useState } from "react";

export default function Saying() {
  const [msg, setMsg] = useState("");

  function wait(s) {
    return new Promise((res) => setTimeout(res, s * 1000));
  }

  useEffect(() => {
    async function changeMsg() {
      let msgIdx = 0;
      while (1) {
        setMsg("");
        const curMsgArr = sayingJSON.saying[msgIdx].split("");
        for (let curMsg of curMsgArr) {
          setMsg((prevMsg) => prevMsg + curMsg);
          await wait(0.07);
        }
        await wait(3);
        msgIdx = (msgIdx + 1) % sayingJSON.saying.length;
      }
    }
    changeMsg();
  }, []);

  return (
    <Wrapper>
      <div>
        <div>김승원</div>
      </div>
      <div>{msg}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100vw;
  height: 10rem;
  & > div {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    &:nth-child(1) {
      height: 2rem;
      & > div {
        width: 30%;
        background: linear-gradient(#937042, #ca9655, #ca9655, #ca9655);
        padding: 1rem;
        font-size: 1.2rem;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
    }
    &:nth-child(2) {
      flex-grow: 1;
      background: #ffe0bb;
      padding: 1rem;
      border-radius: 1rem;
      border-top-left-radius: 0.8rem;
      border: 10px solid #ca9655;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    @media (max-width: 1024px) {
      width: 90%;
      font-size: 0.9rem;
    }
  }
`;
