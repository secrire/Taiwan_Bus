import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 4px 0;
`;

export const InputContainer = styled.div`
  height: 40px;
  width: 90%;
  /* background: #E5E5E5; */
  text-align: center;
  margin: 12px auto;
  position: relative;
`;

export const CityDiv = styled.div`
  height: 40px;
  width: 76%;
  background: #e5e5e5;
  text-align: left;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 16px;
  margin: 0 auto;
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

export const BackGround = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
`;

export const CityContainer = styled.div`
  width: 90%;
  max-width: 360px;
  height: 85%;
  max-height: 730px;
  margin: auto;
  z-index: 2;
  background: rgba(245, 245, 245, 0.7);
  border-radius: 20px;
  overflow-y: scroll;
`;

export const CityOption = styled.button`
  font-size: 20px;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #007aff;
  border: none;
`;
