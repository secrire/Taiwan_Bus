import React, { useState } from "react";
import PropTypes from "prop-types";


import * as Style from './style';

const Live = (props) => {
  const {} = props;

  return (
        <div>----test Live------</div>
  );
};

export default Live;



Live.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }),
  }).isRequired,
};

