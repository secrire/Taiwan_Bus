import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "components/Icon";
import Bus from "images/bus.svg";
import Clock from "images/clock.svg";
import MapMarker from "images/map-marker.svg";
import Heart from "images/heart-empty.svg";

import * as Style from "./style";

const Menu = (props) => {
  const defaultStyle = { container:'84px', circle:'60px', img:'36px', titleMargin:'4px', circleColor: '#5CBCDB' };

  return (
    <Style.Container>
      <Link to="/app/live">
        <Style.IconContainer>
          <Icon
            src={Bus}
            alt="bus"
            style={defaultStyle}
          />
          <p>測試專用</p>
        </Style.IconContainer>
      </Link>
      <Link to="/app/stop">
        <Style.IconContainer>
          <Icon
            src={MapMarker}
            alt="marker"
            style={defaultStyle}
          />
          <p>測試專用</p>
        </Style.IconContainer>
      </Link>
      <Link to="/app/timetable">
        <Style.IconContainer>
          <Icon
            src={Clock}
            alt="clock"
            style={defaultStyle}
          />
          <p>測試專用</p>
        </Style.IconContainer>
      </Link>
      <Link to="/app/collection">
        <Style.IconContainer>
          <Icon
            src={Heart}
            alt="heart"
            style={defaultStyle}
          />
          <p>測試專用</p>
        </Style.IconContainer>
      </Link>
    </Style.Container>
  );
};

export default Menu;

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }),
  }).isRequired,
};
