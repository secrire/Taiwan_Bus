import styled from "styled-components";

export const Container = styled.div`
  background: rgb(5, 23, 69);
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

export const Top = styled.div`
  padding: 24px 0 10px 0;
  position: relative;
  img {
    position: absolute;
    left: 18px;
    width: 30px;
    height: 30px;
  }
`;

export const Number = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: rgb(254, 255, 254);
  text-align: center;
  padding: 0 18px;
  line-height: 30px;
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
