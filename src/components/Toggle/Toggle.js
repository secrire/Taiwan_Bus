/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import * as Style from "./style";

const Toggle = (props) => {
  const { onChange, checked } = props;
  return (
    <>
      <Style.Label>
        <Style.Input type="checkbox" onChange={onChange} checked={checked} />
        <Style.Span className="slider" />
      </Style.Label>
    </>
  );
};

export default Toggle;


Toggle.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

Toggle.defaultProps = {
  onChange: ()=>{},
  checked: false,
};
