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
import Map from "components/Map";

import ArrowLeft from "images/arrow-left.svg";
import Menu from "images/menu.svg";
import Guild from "images/guild.svg";
import Clock from "images/clock.svg";

import * as Style from "./style";

const LiveInfo = (props) => {
  const [showTimetable, setShowTimetable] = useState(false);
  const [estimatedArrivalState, setEstimatedArrivalState] = useState([]);

  const axios = useAxios();
  const { busData } = useBusStore();
  const { City, RouteName, DepartureStopNameZh, DestinationStopNameZh } =
    busData;

  const getEstimatedArrivalData = async (city, routeName) => {
    const config = {
      url: `v2/Bus/EstimatedTimeOfArrival/City/${city}/${routeName.Zh_tw}`,
      method: "GET",
    };
    const estimatedArrivalData = await axios.exec(config);
    return { estimatedArrivalData };
  };

  const getVehicleData = async (city) => {
    const config = {
      url: `v2/Bus/Vehicle/City/${city}`,
      method: "GET",
    };
    const vehicleData = await axios.exec(config);
    return { vehicleData };
  };

  const init = async () => {
    const callArr = [
      getEstimatedArrivalData(City, RouteName),
      getVehicleData(City),
    ];
    const [{ estimatedArrivalData }, { vehicleData }] = await Promise.all(
      callArr
    );
    let accessibleNumb = [];
    vehicleData.forEach((data) => {
      if (data.VehicleType === 1) {
        accessibleNumb.push(data.PlateNumb);
      }
    });
    const tempEstimatedArrivalState = estimatedArrivalData
      .filter((data) => data.StopStatus === 0)
      .map((data) => {
        if (accessibleNumb.includes(data.PlateNumb)) {
          return { ...data, isAccessible: true };
        } else {
          return { ...data, isAccessible: false };
        }
      });
    setEstimatedArrivalState(tempEstimatedArrivalState);
  };

  useEffect(() => {
    init();
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
        <Icon
          src={Guild}
          alt="guild"
          style={{
            img: "16px",
            circle: "36px",
            circleColor: "#5cbcdb",
            margin: "0 16px 0 0",
          }}
          onClick={() => {}}
        />
        <Icon
          src={Clock}
          alt="clock"
          style={{
            img: "22px",
            circle: "36px",
            circleColor: "#5cbcdb",
            margin: "0 auto 0 0",
          }}
          onClick={() => setShowTimetable(true)}
        />
        <BusStartEnd
          stopNames={{ DepartureStopNameZh, DestinationStopNameZh }}
          style={{ color: "#FFF", fontSize: "16px" }}
        />
      </Style.Row>
      {showTimetable && <Timetable setVisible={setShowTimetable} />}
      <Map/>
      <LiveContent estimatedArrival={estimatedArrivalState} />
    </Style.Container>
  );
};

export default LiveInfo;


LiveInfo.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }),
  }).isRequired,
};