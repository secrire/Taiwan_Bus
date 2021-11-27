/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";

import Arrows from "images/arrows.svg";

import * as Style from "./style";

const BusStartEnd = (props) => {

  return (
        <Style.StartEndContainer>
          <Style.BusStartEnd>測試1</Style.BusStartEnd>
          <Style.Arrows src={Arrows} alt="arrow" />
          <Style.BusStartEnd>測試2</Style.BusStartEnd>
        </Style.StartEndContainer>
  );
};

export default BusStartEnd;

BusStartEnd.propTypes = {};
