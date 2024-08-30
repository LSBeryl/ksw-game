import styled from "styled-components";

export default function Setting(props) {
  return (
    <Wrapper>
      <Save
        onClick={() => {
          window.localStorage.setItem("data", JSON.stringify(props));
        }}
      >
        게임 저장하기
      </Save>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Save = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background: #175710;
  color: #fff;
  cursor: pointer;
`;
