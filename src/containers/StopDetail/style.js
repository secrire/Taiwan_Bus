import styled from "styled-components";

export const Container = styled.div`
  background: #5a637e;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 18px 0;
`;

export const Number = styled.div`
  font-family: Noto Sans TC;
  font-size: 48px;
  text-align: right;
  letter-spacing: -0.3px;
  color: #ffffff;
  padding: 0 18px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 0 18px 16px 18px;
  > img:first-child {
    margin-right: 16px;
  }
  > img:nth-child(2) {
    margin-right: auto;
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  height: 70vh;
  overflow-y: scroll;
`;

export const StopTItle = styled.div`
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  padding-left: 20px;
`;

export const Heart = styled.img`
  height: 16px;
  width: 16px;
  margin-left: auto;
`;
