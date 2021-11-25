import React, { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as Style from "./style";

const Keypad = (props) => {
  const button = ["藍", "紅", 1, 2, 3, "棕", "綠", 4, 5, 6,'黃','橘', 7, 8, 9, 'F', "更多", 'c', 0, '<'];
  return (
    <Style.Container>
      <Style.ButtonContainer>
        {button.map((i) => (
          <Style.Button>i</Style.Button>
        ))}
      </Style.ButtonContainer>
    </Style.Container>
  );
};

export default Keypad;

Keypad.propTypes = {};
