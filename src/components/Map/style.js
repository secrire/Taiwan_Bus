import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  ${(p) => (p.showAllLiveContent ? `height:55vh` : `height:calc(100vh - 85px)`)}
`;

export const ToggleContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 18px;
  z-index: 999;
`;
