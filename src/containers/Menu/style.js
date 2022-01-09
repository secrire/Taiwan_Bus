import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #5a637e;
  padding-top: 15vh;
`;

export const IconContainer = styled.div`
  width: 30%;
  max-width: 160px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 18px;
  :hover {
    //border: 1px solid #fff;
    /* border-radius: 100px; */
    position: relative;
    top: 2px;
    left: 2px;
  }

  > p {
    margin: 0;
    color: #fff;
    height: 40px;
    line-height: 40px;
  }
`;
