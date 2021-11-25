/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import * as Style from "./style";

const Icon = (props) => {
  const { src, alt, title, style: { container, circle, circleColor, img, titleMargin, position, top, left } } = props;

  return (
    <Style.Container size={container} position={position} top={top} left={left}>
      <Style.IconCircle size={circle} color={circleColor}>
        <Style.IconImg src={src} alt={alt} size={img} />
      </Style.IconCircle>
      <Style.IconTitle margin={titleMargin}>
        {title}
      </Style.IconTitle>
    </Style.Container>
  );
};

export default Icon;

Icon.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }),
  }).isRequired,
};
