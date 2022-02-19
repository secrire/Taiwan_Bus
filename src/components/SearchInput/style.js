import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 4px 0;
`;

export const InputContainer = styled.div`
  height: 40px;
  width: 90%;
  text-align: center;
  margin: 12px auto;
  position: relative;
`;

export const CityDiv = styled.div`
  height: 40px;
  width: 90%;
  background: rgb(32, 58, 103);
  color: ${(p) => (p.withValue ? "rgb(254, 255, 254)" : "rgb(119, 131, 153)")};
  text-align: left;
  border-radius: 7px;
  padding: 8px 16px;
  font-size: 16px;
  margin: 0 auto;
`;

export const Input = styled.input`
  height: 40px;
  width: 90%;
  background: rgb(32, 58, 103);
  color: ${(p) => (p.value ? "rgb(254, 255, 254)" : "rgb(119, 131, 153)")};
  text-align: left;
  border-radius: 7px;
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
  right: 36px;
`;

export const CityWarning = styled.div`
  font-size: 12px;
  color: #c33218;
  margin: 16px 15% -3px;
`;

export const BackGround = styled.div`
  width: 100%;
  height: 100%;
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
  /* background: rgba(245, 245, 245, 0.7); */
  border-radius: 20px;
  overflow-y: scroll;
`;

export const CityOption = styled.div`
  font-size: 16px;
  height: 40px;
  border-bottom: 1px rgb(229 228 228) solid;
  background-color: rgba(245, 245, 245, 0.7);
  margin: 0 12px;
`;

export const CityOptionBtn = styled.button`
  width: 100%;
  height: 39px;
  color: rgb(82, 82, 82);
  border: none;
  :hover {
    font-weight: bold;
  }
`;
