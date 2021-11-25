import styled from 'styled-components';

export const Container = styled.div`
  height: 100px;
  width: 90%;
`;

export const InputContainer = styled.div`
  height: 40px;
  width: 90%;
  /* background: #E5E5E5; */
  text-align: center;
  margin: 0 auto ;
  position: relative;
`;

export const Input = styled.input`
  height: 40px;
  width: 80%;
  background: #E5E5E5;
  text-align: left;
  line-height: ${ p => p.size };
  border-radius: 12px;
  margin: 8px auto 0;
`;

export const InputImg = styled.img`
  height: 14px;
  width: 14px;
  line-height: 12px;
  position: absolute;
  top: 18px;
  right: 18px;
`;

