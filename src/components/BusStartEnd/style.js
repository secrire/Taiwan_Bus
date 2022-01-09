import styled from "styled-components";

export const Arrows = styled.img`
  height: 12px;
  width: 12px;
  margin: 0 7px;
`;

export const StartEndContainer = styled.div`
  color: #4c546a;
  display: flex;
  align-items: center;
  color: ${(p) => p.color};
`;

export const BusStartEndName = styled.div`
  font-size: ${(p) => p.fontSize};
`;
