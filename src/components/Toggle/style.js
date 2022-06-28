import styled from "styled-components";

export const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 42px;
  height: 20px;
`;

export const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  :checked + .slider {
    background-color: rgb(50, 115, 246);
  }

  :checked + .slider:before {
    -webkit-transform: translateX(23px);
    -ms-transform: translateX(23px);
    transform: translateX(23px);
  }
`;

export const Span = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(178, 178, 178);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  :before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 1px;
    top: 1px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
