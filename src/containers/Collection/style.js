import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Top = styled.div`
  width: 100%;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 0px 0px 20px 20px;
  background-color: #5a637e;
  padding-bottom: 20px;
`;

export const InputContainer = styled.div`
  height: 40px;
  width: 90%;
  text-align: center;
  margin: 12px auto;
  position: relative;
`;

export const Input = styled.input`
  height: 40px;
  width: 76%;
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
  right: 58px;
`;

export const TabContainer = styled.div`
  width: 100%;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  text-align: center;
  color: #4c546a;
  > div {
    width: 50%;
    padding: 12px 0;
    :hover {
      border-bottom: 2px solid #f76a4b;
    }
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  padding: 0 18px;
`;
