import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "components/Icon";
import Bus from "images/bus.svg";
import Clock from "images/clock.svg";
import MapMarker from "images/map-marker.svg";
import HeartFullWhite from "images/heart-full-white.svg";

import * as Style from "./style";

const Menu = (props) => {
  const defaultStyle = {
    circle: "40px",
    img: "18px",
    titleMargin: "4px",
    circleColor: "#5a637b",
    margin: "0 6px 0 0",
  };

  return (
    <Style.Container>
      <Link to="/app/live">
        <Style.IconContainer>
          <Icon src={Bus} alt="bus" style={defaultStyle} />
          <p>公車動態</p>
        </Style.IconContainer>
      </Link>
      <Link to="/app/stop">
        <Style.IconContainer>
          <Icon src={MapMarker} alt="marker" style={defaultStyle} />
          <p>附近站點</p>
        </Style.IconContainer>
      </Link>
      <Link to="/app/timetable">
        <Style.IconContainer>
          <Icon src={Clock} alt="clock" style={defaultStyle} />
          <p>班表查詢</p>
        </Style.IconContainer>
      </Link>
      <Link to="/app/collection">
        <Style.IconContainer>
          <Icon src={HeartFullWhite} alt="heart" style={defaultStyle} />
          <p>我的收藏</p>
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
