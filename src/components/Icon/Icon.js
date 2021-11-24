import React from "react";
import PropTypes from "prop-types";

import * as Style from "./style";

const Icon = (props) => {
  const { src, alt, iconContainerSize, iconSize } = props;
  return (
    <Style.Container>
      <Style.IconContainer size={iconContainerSize}>
        <Style.IconImg src={src} alt={alt} size={iconSize} />
      </Style.IconContainer>      
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
