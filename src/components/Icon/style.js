import styled from 'styled-components';

export const Container = styled.div`
  height: ${ p => p.size };
  width:${  p => p.size };
  background: #5CBCDB;
  text-align: center;
  line-height: ${ p => p.size };
  border-radius: 50%;
`;

export const IconContainer = styled.div`
  height: ${ p => p.size };
  width:${  p => p.size };
  background: #5CBCDB;
  text-align: center;
  line-height: ${ p => p.size };
  border-radius: 50%;
`;

export const IconImg = styled.img`
  height: ${ p => p.size };
  width: ${ p => p.size };
`;

