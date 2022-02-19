import styled from "styled-components";

export const Container = styled.div`
  background: rgb(5, 23, 69);
  width: 100%;
  height: ${(p) => (p.isWholePage ? "100%" : "unset")};
  overflow-y: hidden;
  border-radius: ${(p) => (p.isWholePage ? "unset" : "8px")};
  margin-bottom: ${(p) => (p.isWholePage ? "unset" : "14px")};
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 18px 0;
  padding: ${(p) => (p.isWholePage ? "24px 18px 0" : "12px 18px 0")};
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
  height: ${(p) => (p.isWholePage ? "70%" : "unset")};
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

export const BusImg = styled.img`
  height: 16px;
  width: 16px;
  margin-right: -10px;
`;
