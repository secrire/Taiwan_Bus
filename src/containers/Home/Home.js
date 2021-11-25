import React, { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "components/Icon";
import Bus from "images/bus.svg";
import Clock from "images/clock.svg";
import MapMarker from "images/map-marker.svg";
import Heart from "images/heart-empty.svg";

import * as Style from "./style";

const Home = (props) => {
  const defaultStyle = { container:'84px', circle:'60px', img:'36px', titleMargin:'4px', circleColor: '#5CBCDB' };
  return (
    <Style.Container>
      <Style.IconContainer>
        <Link to="/app/live">
          <Icon
            src={Bus}
            alt="bus"
            style={defaultStyle}
            title="測試專用"
          />
        </Link>
        <Link to="/app/stop">
          <Icon
            src={MapMarker}
            alt="marker"
            style={defaultStyle}
            title="測試專用"
          />
        </Link>
        <Link to="/app/timetable">
          <Icon
            src={Clock}
            alt="clock"
            style={defaultStyle}
            title="測試專用"
          />
        </Link>
        <Link to="/app/collection">
          <Icon
            src={Heart}
            alt="heart"
            style={defaultStyle}
            title="測試專用"
          />
        </Link>
      </Style.IconContainer>
      <Style.Footer>
        <div>2021</div>
      </Style.Footer>
    </Style.Container>
  );
};

export default Home;

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }),
  }).isRequired,
};
