import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: -webkit-fill-available;
  padding: 0 auto;
  background: #ffffff;
  box-shadow: 0px -3px 8px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0px 0px;
  margin-top: ${(p) => p.isMargin && "-20px"};
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
  height: 54px;
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
  color: rgb(50, 115, 246);
  > div:first-child {
    font-size: 15px;
  }

  > div:nth-child(2) {
    font-weight: bold;
    font-size: 16px;
    margin-left: 6px;
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
  border: ${(p) =>
    p.isApproaching
      ? "5px solid rgb(50, 115, 246)"
      : "5px solid rgb(5, 23, 69)"};
  width: 17px;
  height: 17px;
  border-radius: 50%;
`;

export const StopTime = styled.div`
  font-size: 16px;
  margin: 0 12px;
  color: ${(p) => (p.isApproaching ? "rgb(50, 115, 246)" : "rgb(82, 82, 82)")};
`;

export const StopName = styled.div`
  font-size: 16px;
  color: ${(p) => (p.isApproaching ? "rgb(50, 115, 246)" : "rgb(82, 82, 82)")};
`;

export const WheelchairContainer = styled.div`
  color: #5cbcdb;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 26px;
  font-size: 12px;
  border: 1px solid #5cbcdb;
  border-radius: 100px;
  margin-left: auto;
  div {
    line-height: 26px;
  }
`;

export const StopBelow = styled.div`
  height: 25px;
  max-width: 384px;
  border-left: 1px solid rgb(5, 23, 69);
  margin: 0 8px;
`;
