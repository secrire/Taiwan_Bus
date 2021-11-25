import styled from "styled-components";

export const Container = styled.div`
  height: 100px;
  width: 90%;
`;

export const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

export const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  :checked + .slider {
    background-color: green;
  }

  :checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

export const Span = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  :before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    top: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

// input:checked + .slider {
//   background-color: green;
// }

// input:checked + .slider:before {
//   -webkit-transform: translateX(26px);
//   -ms-transform: translateX(26px);
//   transform: translateX(26px);
// }
