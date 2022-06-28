/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import * as Style from "./style";

const MainTitle = (props) => {
  const { title } = props;

  return <Style.Title>{title}</Style.Title>;
};

export default MainTitle;

MainTitle.propTypes = {
  title: PropTypes.string,
};

MainTitle.defaultProps = {
  title: "",
};
