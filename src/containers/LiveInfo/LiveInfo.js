import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import useAxios from "hooks/useAxios";
import { useBusStore } from "store/busStore";
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
  const [estimatedArrivalData, setEstimatedArrivalData] = useState([]);

  const axios = useAxios();
  const { busData } = useBusStore();
  const { City, RouteName, DepartureStopNameZh, DestinationStopNameZh } =
    busData;

  const getEstimatedArrival = async (City, RouteName) => {
    const config = {
      url: `v2/Bus/EstimatedTimeOfArrival/City/${City}/${RouteName.Zh_tw}`,
      method: "GET",
    };
    const result = await axios.exec(config);
    setEstimatedArrivalData(result);
  };

  useEffect(() => {
    getEstimatedArrival(City, RouteName);
  }, []);

  return (
    <Style.Container>
      <Style.IconContainer>
        <img
          src={ArrowLeft}
          alt="previous"
          onClick={() => {}}
          // style={{ margin: "24px 22px 0 0" }}
        />
        <Link to="/app/menu">
          <Icon
            src={Menu}
            alt="menu"
            style={{
              img: "20px",
              margin: "0 0 0 22px",
            }}
          />
        </Link>
      </Style.IconContainer>
      <Style.Number>{RouteName.Zh_tw}</Style.Number>
      <Style.Row>
        <img src={Guild} alt="guild" onClick={() => {}} />
        <img
          src={ClockCircle}
          alt="clock"
          onClick={() => setShowTimetable(true)}
        />
        <BusStartEnd
          stopNames={{ DepartureStopNameZh, DestinationStopNameZh }}
          style={{ color: "#FFF", fontSize: "16px" }}
        />
      </Style.Row>
      {showTimetable && <Timetable setVisible={setShowTimetable} />}
      <LiveContent estimatedArrivalData={estimatedArrivalData} />
    </Style.Container>
  );
};

export default LiveInfo;

LiveInfo.propTypes = {};
