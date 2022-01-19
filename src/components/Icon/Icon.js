/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import * as Style from "./style";
import { prototype } from "core-js/fn/promise";

const Icon = (props) => {
  const {
    src,
    alt,
    title,
    style: {
      container,
      circle,
      circleColor,
      img,
      titleMargin,
      position,
      top,
      left,
      margin,
    },
    onClick,
  } = props;

  return (
    <Style.Container
      size={container}
      position={position}
      top={top}
      left={left}
      onClick={() => onClick()}
      margin={margin}
    >
      <Style.IconCircle size={circle} color={circleColor}>
        <Style.IconImg src={src} alt={alt} size={img} />
      </Style.IconCircle>
      <Style.IconTitle margin={titleMargin}>{title}</Style.IconTitle>
    </Style.Container>
  );
};

export default Icon;


Icon.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  style:PropTypes.object,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  src: '',
  alt: '',
  title: '',
  style:{},
  onClick:()=>{},
};