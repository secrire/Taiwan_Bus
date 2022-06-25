import styled from "styled-components";

export const InputContainer = styled.div`
  height: 40px;
  width: 84%;
  text-align: center;
  margin: 0 auto;
  position: relative;
`;

export const Input = styled.input`
  height: 40px;
  width: 100%;
  background: rgb(32, 58, 103);
  color: ${(p) => (p.value ? "rgb(254, 255, 254)" : "rgb(119, 131, 153)")};
  text-align: left;
  border-radius: 7px;
  padding: 8px 16px;
  font-size: 16px;
  border: transparent;
  :focus {
    outline: none;
  }
`;

export const InputImg = styled.img`
  height: 14px;
  width: 14px;
  line-height: 12px;
  position: absolute;
  top: 13px;
  right: 20px;
`;
