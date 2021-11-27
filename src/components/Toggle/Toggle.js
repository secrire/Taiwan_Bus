/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import * as Style from "./style";

const Toggle = (props) => {
  return (
    <>
      <Style.Label>
        <Style.Input type="checkbox" />
        <Style.Span className="slider"/>
      </Style.Label>
    </>
  );
};

export default Toggle;

Toggle.propTypes = {};
