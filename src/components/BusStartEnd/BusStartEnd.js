/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";

import Arrows from "images/arrows.svg";

import * as Style from "./style";

const BusStartEnd = (props) => {

  return (
        <Style.StartEndContainer>
          <Style.BusStartEndName>測試1</Style.BusStartEndName>
          <Style.Arrows src={Arrows} alt="arrow" />
          <Style.BusStartEndName>測試2</Style.BusStartEndName>
        </Style.StartEndContainer>
  );
};

export default BusStartEnd;

BusStartEnd.propTypes = {};
