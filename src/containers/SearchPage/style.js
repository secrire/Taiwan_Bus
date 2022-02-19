import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
`;

export const Top = styled.div`
  width: 100%;
  background: rgb(5, 23, 69);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  /* border-radius: 0px 0px 20px 20px; */
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 18px;
`;

export const ToggleTitle = styled.div`
  font-size: 10px;
  height: 40px;
  line-height: 40px;
  color: #4c546a;
  margin-right: 8px;
`;

export const CardContainer = styled.div`
  width: 100%;
  height: 70%;
  overflow-y: scroll;
`;
