/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";

import { useLanguageStore } from "store/languageStore";

import Arrows from "images/arrows.svg";

import * as Style from "./style";

const BusStartEnd = (props) => {
  const {
    stopNames: { DepartureStopNameZh, DestinationStopNameZh },
    style: { color, fontSize },
  } = props;

  const { isZhTw } = useLanguageStore();

  return (
    <Style.StartEndContainer color={color}>
      <Style.BusStartEndName fontSize={fontSize}>
        {DepartureStopNameZh}
      </Style.BusStartEndName>
      <Style.Arrows src={Arrows} alt="arrow" />
      <Style.BusStartEndName fontSize={fontSize}>
        {DestinationStopNameZh}
      </Style.BusStartEndName>
    </Style.StartEndContainer>
  );
};

export default BusStartEnd;


BusStartEnd.propTypes = {
  stopNames: PropTypes.object,
  style: PropTypes.object,
};

BusStartEnd.defaultProps = {
  stopNames: {},
  style: {},
};
