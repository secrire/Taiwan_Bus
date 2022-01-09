import styled from "styled-components";

export const BackGround = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  width: 90%;
  max-width: 360px;
  height: 85%;
  max-height: 730px;
  margin: auto;
  z-index: 2;
  background: #ffffff;
  border-radius: 20px;
  overflow-y: scroll;
`;

export const Header = styled.div`
  width: 300px;
  height: 77px;
  margin: 0 auto;
  text-align: center;
  padding: 32px 0 22px 0;
  position: relative;
  > img {
    width: 16px;
    position: absolute;
    left: 0;
  }
  > div {
    font-weight: bold;
    font-size: 16px;
    letter-spacing: -0.3px;
    color: #4c546a;
  }
`;

export const Content = styled.div`
  width: 300px;
  margin: 0 auto 40px;
  text-align: center;
  padding-bottom: 24px;
  border: 1px solid rgba(234, 234, 234, 0.5);
  box-sizing: border-box;
  box-shadow: 0px 4px 10px -1px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  overflow-y: scroll;
  > div:first-child {
    /* height: 40px; */
    word-break: keep-all;
    background: #5a637e;
    font-size: 16px;
    color: #ffffff;
    line-height: 40px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 85%;
  margin: 0 auto;
  > div:first-child {
    margin-right: 10px;
  }
`;

export const Detail = styled.div`
  width: 50%;
  > div {
    height: 32px;
    line-height: 32px;
  }
  > div:nth-child(2n) {
    background: #d8dae0;
  }
`;

export const Title = styled.p`
  font-weight: 500;
  font-size: 16px;
  letter-spacing: -0.3px;
  color: #5cbcdb;
  height: 54px;
  margin-bottom: 0px;
  line-height: 54px;
`;
