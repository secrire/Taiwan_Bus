import styled from "styled-components";

export const InputContainer = styled.div`
  height: 40px;
  width: 84%;
  text-align: center;
  margin: 0 auto 12px;
  position: relative;
`;

interface CityDivProps {
  withValue: string;
}

export const CityDiv = styled.div<CityDivProps>`
  height: 40px;
  width: 100%;
  background: rgb(32, 58, 103);
  color: ${(p) => (p.withValue ? "rgb(254, 255, 254)" : "rgb(119, 131, 153)")};
  text-align: left;
  border-radius: 7px;
  padding: 8px 16px;
  font-size: 16px;
  margin: 0 auto;
`;

export const InputImg = styled.img`
  height: 14px;
  width: 14px;
  line-height: 12px;
  position: absolute;
  top: 13px;
  right: 20px;
`;

export const CityWarning = styled.div`
  font-size: 12px;
  color: #c33218;
  margin: -6px 0 6px calc(8% + 16px);
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
