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
  z-index: 999;
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
`;
