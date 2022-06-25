import styled from "styled-components";

export const Top = styled.div`
  width: 100%;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  background-color: rgb(5, 23, 69);
  padding: 40px 0 14px;
`;

export const InputContainer = styled.div`
  height: 40px;
  width: 60%;
  text-align: center;
  margin: 12px auto;
  position: relative;
`;

export const Input = styled.input`
  height: 40px;
  width: 100%;
  background: #e5e5e5;
  text-align: left;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 16px;
  border: transparent;
`;

export const InputImg = styled.img`
  height: 14px;
  width: 14px;
  line-height: 12px;
  position: absolute;
  top: 13px;
  right: 20px;
`;

export const TabContainer = styled.div`
  width: 100%;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  text-align: center;
  color: #4c546a;
  .${(p) => p.selected} {
    border-bottom: 2px solid #f76a4b;
  }
  > div {
    width: 50%;
    padding: 10px 0;
    :hover {
      border-bottom: 2px solid #f76a4b;
    }
  }
`;

export const CardContainer = styled.div`
  height: calc(100vh - 225px);
  overflow-y: scroll;
  width: 100%;
  padding: ${(p) => (p.isStop ? "12px 18px" : "0 18px")};
`;
