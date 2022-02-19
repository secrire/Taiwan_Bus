import React, { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Icon from "components/Icon";
import BusWhite from "images/bus-white.svg";
import Clock from "images/clock.svg";
// import MapMarker from "images/map-marker.svg";
import HeartFullGrey from "images/heart-full-grey.svg";

import * as Style from "./style";

const defaultStyle = {
  container: "84px",
  circle: "60px",
  img: "36px",
  titleMargin: "4px",
  circleColor: "#5CBCDB",
};

const Home = (props) => {
  const { t } = useTranslation();

  const clickIcon = (page) => {
    props.history.push(`/app/${page}`);
  };

  return (
    <Style.Container>
      <Style.CoverContainer />
      <Style.IconContainer>
        <Icon
          src={BusWhite}
          alt="bus"
          style={defaultStyle}
          title={t("COMMON.BUS_LIVE")}
          onClick={() => clickIcon("live")}
        />
        {/* <Icon
          src={MapMarker}
          alt="marker"
          style={defaultStyle}
          title={t('COMMON.NEAR_STOP')}
          onClick={() => clickIcon("stop")}
        /> */}
        <Icon
          src={Clock}
          alt="clock"
          style={defaultStyle}
          title={t("COMMON.CHECK_TIMETABLE")}
          onClick={() => clickIcon("timetable")}
        />
        <Icon
          src={HeartFullGrey}
          alt="heart"
          style={defaultStyle}
          title={t("COMMON.COLLECTION")}
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
