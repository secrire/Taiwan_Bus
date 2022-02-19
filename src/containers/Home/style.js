import styled from "styled-components";
import CoverMobile from "images/cover-mobile.jpg";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const CoverContainer = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, -0.3), rgba(0, 0, 0, 0.2)),
    url(${CoverMobile});
`;

export const IconContainer = styled.div`
  width: 80%;
  height: 100px;
  display: flex;
  justify-content: space-around;
`;

export const Footer = styled.div`
  width: 100%;
  height: 60px;
  background-color: rgb(5, 23, 69);
  position: fixed;
  bottom: 0;
  text-align: center;

  > div {
    font-size: 10px;
    color: #fff;
  }
`;
