import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// import Keypad from "components/Keypad";
import Icon from "components/Icon";
import BusStartEnd from "components/BusStartEnd";
import LiveContent from "components/LiveContent";
import Timetable from "components/Timetable";

import ArrowLeft from "images/arrow-left.svg";
import Menu from "images/menu.svg";
import Guild from "images/guild.svg";
import ClockCircle from "images/clock-circle.svg";
import ArrowsCircle from "images/arrows-circle.svg";

import * as Style from "./style";

const LiveInfo = (props) => {
  const [showTimetable, setShowTimetable] = useState(false);

  return (
    <Style.Container>
      <Style.IconContainer>
        <img src={ArrowLeft} alt="previous" onClick={() => {}} />
        <Link to="/app/menu">
          <Icon
            src={Menu}
            alt="menu"
            style={{
              circle: "24px",
              circleColor: "lightgray",
              img: "20px",
            }}
          />
        </Link>
      </Style.IconContainer>
      <Style.Number>1234</Style.Number>
      <Style.Row>
        <img src={Guild} alt="guild" onClick={() => {}} />
        <img
          src={ClockCircle}
          alt="clock"
          onClick={() => setShowTimetable(true)}
        />
        <BusStartEnd />
      </Style.Row>
      <LiveContent />
      {showTimetable && <Timetable setVisible={setShowTimetable} />}
    </Style.Container>
  );
};

export default LiveInfo;

LiveInfo.propTypes = {};
