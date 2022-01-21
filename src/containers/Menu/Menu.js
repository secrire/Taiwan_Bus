import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Icon from "components/Icon";
import BusWhite from "images/bus-white.svg";
import Clock from "images/clock.svg";
import MapMarker from "images/map-marker.svg";
import HeartFullWhite from "images/heart-full-white.svg";

import * as Style from "./style";

const defaultStyle = {
  circle: "40px",
  img: "18px",
  titleMargin: "4px",
  circleColor: "#5a637b",
  margin: "0 6px 0 0",
};

const Menu = (props) => {
  const { t } = useTranslation();

  return (
    <Style.Container>
      <Link to="/app/live">
        <Style.IconContainer>
          <Icon src={BusWhite} alt="bus" style={defaultStyle} />
          <p>{t('COMMON.BUS_LIVE')}</p>
        </Style.IconContainer>
      </Link>
      <Link to="/app/stop">
        <Style.IconContainer>
          <Icon src={MapMarker} alt="marker" style={defaultStyle} />
          <p>{t('COMMON.NEAR_STOP')}</p>
        </Style.IconContainer>
      </Link>
      <Link to="/app/timetable">
        <Style.IconContainer>
          <Icon src={Clock} alt="clock" style={defaultStyle} />
          <p>{t('COMMON.CHECK_TIMETABLE')}</p>
        </Style.IconContainer>
      </Link>
      <Link to="/app/collection">
        <Style.IconContainer>
          <Icon src={HeartFullWhite} alt="heart" style={defaultStyle} />
          <p>{t('COMMON.COLLECTION')}</p>
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
