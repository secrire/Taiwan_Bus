/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import * as Style from "./style";

const PageDescription = (props) => {
  const { text } = props;

  return (
    <>
      <Style.PageDescription>{text}</Style.PageDescription>
    </>
  );
};

export default PageDescription;

PageDescription.propTypes = {
  text: PropTypes.string,
};

PageDescription.defaultProps = {
  text: "",
};
