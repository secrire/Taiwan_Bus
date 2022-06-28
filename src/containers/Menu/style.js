import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgb(255, 255, 255);
  /* padding-top: 15%; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  border-top: 1px rgb(229 228 228) solid;
`;

export const IconContainer = styled.div`
  /* width: 30%;
  max-width: 160px; */
  /* height: 44px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin: 0 auto 18px; */
  :hover {
    //border: 1px solid #fff;
    /* border-radius: 100px; */
    position: relative;
    top: 2px;
    left: 2px;
  }

  > p {
    margin: 0;
    color: rgb(82, 82, 82);
    font-size: 10px;
    /* height: 40px; */
    /* line-height: 40px; */
  }
`;
