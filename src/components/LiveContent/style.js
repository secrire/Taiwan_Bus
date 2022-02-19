import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 0 auto;
  background: #ffffff;
  box-shadow: 0px -3px 8px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0px 0px;
  margin-top: ${(p) => p.isMargin && "-18px"};
  position: relative;
`;

export const CaretContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 12px;
  img {
    height: 14px;
    width: 14px;
  }
`;

export const Header = styled.div`
  height: 64px;
  width: 90%;
  max-width: 400px;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0 auto;
  border-bottom: 0.75px solid #c4c4c4;
`;

export const HeaderTitle = styled.div`
  font-size: 12px;
  color: #a2a2a2;
`;

export const HeaderWay = styled.div`
  display: flex;
  align-items: center;
  > div :first-child {
    font-weight: 500;
    font-size: 14px;
    color: #4c546a;
    margin-right: 6px;
  }

  > div :nth-child(2) {
    font-weight: 500;
    font-size: 16px;
    color: #5cbcdb;
  }
`;

export const Content = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  background: #ffffff;
  padding: 14px 0;
  overflow-y: scroll;
  ${(p) =>
    p.showMap ? `height:calc(45vh - 158px)` : `height:calc(100vh - 230px)`}
`;

export const StopContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StopPoint = styled.div`
  border: ${(p) => (p.isSoon ? "5px solid #F76A4B" : "5px solid #4c546a")};
  width: 17px;
  height: 17px;
  border-radius: 50%;
`;

export const StopTime = styled.div`
  font-size: 16px;
  margin: 0 12px;
  color: ${(p) => (p.isSoon ? "#F66A4B" : "#b4b3b3")};
`;

export const StopName = styled.div`
  font-size: 16px;
  color: ${(p) => (p.isSoon ? "#4C546A" : "#b4b3b3")};
`;

export const WheelchairContainer = styled.div`
  color: #5cbcdb;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 26px;
  border: 1px solid #5cbcdb;
  border-radius: 100px;
  margin-left: auto;
`;

export const StopBelow = styled.div`
  height: 25px;
  max-width: 384px;
  border-left: 1px solid #4c546a;
  margin: 0 8px;
`;
