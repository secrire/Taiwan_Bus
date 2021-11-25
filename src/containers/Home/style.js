import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #FFF;
  position: relative;
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
  background-color: #5A637E;
  position: fixed;
  bottom: 0;
  text-align: center;

  > div{
    font-size: 10px;
    color: #fff;
  }
`;
