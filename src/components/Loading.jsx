import styled from "styled-components";

export default function Loading() {
  return <Wrapper>로딩 중...</Wrapper>;
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eac79c;
`;
