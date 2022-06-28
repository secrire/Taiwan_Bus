import styled from "styled-components";

export const Container = styled.div`
  height: ${(p) => p.size};
  position: ${(p) => p.position};
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  margin: ${(p) => p.margin};
`;

export const IconCircle = styled.div`
  height: ${(p) => p.size};
  width: ${(p) => p.size};
  background: ${(p) => p.color};
  text-align: center;
  line-height: ${(p) => p.size};
  border-radius: 50%;
`;

export const IconImg = styled.img`
  height: ${(p) => p.size};
  width: ${(p) => p.size};
`;

export const IconTitle = styled.p`
  font-size: 14px;
  margin: ${(p) => p.margin} auto 0 auto;
`;
