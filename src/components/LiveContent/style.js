import styled from "styled-components";

export const Container = styled.div`
  height: 70px;
  width: 90%;
  padding: 8px 16px;
  margin: 10px auto;
  background: #ffffff;
  border: 1px solid rgba(238, 238, 238, 0.5);
  box-sizing: border-box;
  box-shadow: 0px 4px 10px -1px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  > div:first-child{
    margin-bottom: 6px;
  }
`;

export const Row = styled.div`
  height: 30px;
  width: 100%;
  max-width: 360px;
  display: flex;
  align-items: center;
  text-align: left;
`;

export const BusNumber = styled.div`
  font-size: 20px;
  color: #f66a4b;
  line-height: ;
  margin-right: auto;
`;

export const Heart = styled.img`
  height: 16px;
  width: 16px;
`;

export const Arrows = styled.img`
  height: 12px;
  width: 12px;
  margin: 0 7px;
`;

export const BusCity = styled.div`
  font-size: 12px;
  width: 24px;
  color: #8b94b2;
  line-height: ;
`;
