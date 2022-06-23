import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  ${(p) => (p.showAllLiveContent ? `height:55%` : `height:calc(100vh - 85px)`)};
`;

export const ToggleContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 18px;
  z-index: 5;
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 7px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  > span {
    font-size: 10px;
    color: #4c546a;
  }
`;

export const WindowBusName = styled.div`
  font-size: 16px;
  color: rgb(82, 82, 82);
  font-weight: bold;
  margin: 8px 16px;
`;

export const Mask = styled.div`
  background-color: transparent;
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
`;
