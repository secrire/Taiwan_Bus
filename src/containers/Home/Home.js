import React, { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "components/Icon";
import Bus from "images/bus.svg";
import Clock from "images/clock.svg";
import MapMarker from "images/map-marker.svg";
import HeartFullWhite from "images/heart-full-white.svg";

import * as Style from "./style";

const Home = (props) => {
  const defaultStyle = {
    container: "84px",
    circle: "60px",
    img: "36px",
    titleMargin: "4px",
    circleColor: "#5CBCDB",
  };

  const clickIcon = (page) => {
    props.history.push(`/app/${page}`);
  };

  return (
    <Style.Container>
      <Style.IconContainer>
        <Icon
          src={Bus}
          alt="bus"
          style={defaultStyle}
          title="公車專用"
          onClick={() => clickIcon("live")}
        />
        <Icon
          src={MapMarker}
          alt="marker"
          style={defaultStyle}
          title="附近站點"
          onClick={() => clickIcon("stop")}
        />
        <Icon
          src={Clock}
          alt="clock"
          style={defaultStyle}
          title="班表查詢"
          onClick={() => clickIcon("timetable")}
        />
        <Icon
          src={HeartFullWhite}
          alt="heart"
          style={defaultStyle}
          title="我的收藏"
          onClick={() => clickIcon("collection")}
        />
      </Style.IconContainer>
      <Style.Footer>
        <div>2022</div>
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
