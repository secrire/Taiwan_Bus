import styled from "styled-components";

export const Container = styled.div`
  height: 100px;
  width: 100%;
  padding: 20px 0;
`;

export const InputContainer = styled.div`
  height: 40px;
  width: 90%;
  /* background: #E5E5E5; */
  text-align: center;
  margin: 12px auto;
  position: relative;
`;

export const Input = styled.input`
  height: 40px;
  width: 76%;
  background: #e5e5e5;
  text-align: left;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 16px;
  border: transparent;
`;

export const InputImg = styled.img`
  height: 14px;
  width: 14px;
  line-height: 12px;
  position: absolute;
  top: 13px;
  right: 58px;
`;

export const CityWarning = styled.div`
  font-size: 12px;
  color: #c33218;
  margin: 16px 15% -3px;
`;
