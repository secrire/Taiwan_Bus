/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import ArrowsWhite from "images/arrows-white.svg";
import ArrowsGrey from "images/arrows-grey.svg";

import * as Style from "./style";

const BusStartEnd = (props) => {
  const {
    departureStopName,
    destinationStopName,
    style: { color, fontSize },
  } = props;

  return (
    <Style.StartEndContainer color={color}>
      <Style.BusStartEndName fontSize={fontSize}>
        {departureStopName}
      </Style.BusStartEndName>
      <Style.Arrows
        src={color === "#fff" ? ArrowsWhite : ArrowsGrey}
        alt="arrow"
      />
      <Style.BusStartEndName fontSize={fontSize}>
        {destinationStopName}
      </Style.BusStartEndName>
    </Style.StartEndContainer>
  );
};

export default BusStartEnd;

BusStartEnd.propTypes = {
  departureStopName: PropTypes.string,
  destinationStopName: PropTypes.string,
  style: PropTypes.object,
};

BusStartEnd.defaultProps = {
  departureStopName: "",
  destinationStopName: "",
  style: {},
};
