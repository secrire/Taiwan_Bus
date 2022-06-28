import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useAxios from "hooks/useAxios";
import { useLanguageStore } from "stores/languageStore";
import { useBusStore } from "stores/busStore";
import Icon from "components/Icon";
import BusStartEnd from "components/BusStartEnd";
import LiveContent from "components/LiveContent";
import Timetable from "components/Timetable";
import Map from "components/Map";

import ArrowLeft from "images/arrow-left.svg";
import Guild from "images/guild.svg";
import ClockWhite from "images/clock-white.svg";

import * as Style from "./style";

const LiveInfo = (props) => {
  const [showTimetable, setShowTimetable] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showAllContent, setShowAllContent] = useState(true);
  const [stopAllData, setStopAllData] = useState([]);
  const [isStartInterval, setIsStartInterval] = useState(false);
  const [directionTo, setDirectionTo] = useState(true);
  const [displayStopData, setDisplayStopData] = useState([]);

  const axios = useAxios();
  const { isZhTw } = useLanguageStore();
  const { busData } = useBusStore();

  const {
    City,
    RouteUID,
    RouteName,
    DepartureStopNameZh,
    DepartureStopNameEn,
    DestinationStopNameZh,
    DestinationStopNameEn,
  } = busData;

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

  const getStopData = async (city) => {
    const config = {
      url: `v2/Bus/Stop/City/${city}`,
      method: "GET",
    };
    const stopData = await axios.exec(config);
    return { stopData };
  };

  const init = async () => {
    const callArr = [
      getEstimatedArrivalData(City, RouteName),
      getVehicleData(City),
      getStopData(City),
    ];
    const [{ estimatedArrivalData }, { vehicleData }, { stopData }] =
      await Promise.all(callArr);

    let accessibleNumb = [];
    vehicleData.forEach((data) => {
      if (data.VehicleType === 1) {
        accessibleNumb.push(data.PlateNumb);
      }
    });

    let tempStopAllData;
    tempStopAllData = estimatedArrivalData
      // filter current routeUid
      .filter((data) => data.RouteUID === RouteUID)
      //  StopStatus : 0 = 'work well'
      .filter((data) => data.StopStatus === 0)
      .map((data) => {
        if (accessibleNumb.includes(data.PlateNumb)) {
          return { ...data, isAccessible: true };
        } else {
          return { ...data, isAccessible: false };
        }
      });

    tempStopAllData = [...tempStopAllData].map((s) => {
      const foundStop = stopData.find((data) => data.StopUID === s.StopUID);
      if (foundStop) {
        return {
          ...s,
          positionLon: foundStop.StopPosition.PositionLon,
          positionLat: foundStop.StopPosition.PositionLat,
        };
      } else {
        return { ...s };
      }
    });

    setStopAllData(tempStopAllData);
    setIsStartInterval(true);
  };

  const clickStop = (stopUid) => {
    props.history.push(`/app/stopDetail?city=${City}&stop=${stopUid}`);
  };

  const clickArrowLeft = () => {
    if (showMap) {
      setShowMap(false);
      setShowAllContent(true);
    } else {
      props.history.goBack();
    }
  };

  useEffect(() => {
    stopAllData.sort((a, b) => a.StopSequence - b.StopSequence);
    const toStopData = stopAllData.filter((data) => data.Direction === 0);
    const backStopData = stopAllData.filter((data) => data.Direction === 1);
    if (directionTo) {
      setDisplayStopData(toStopData);
    } else {
      setDisplayStopData(backStopData);
    }
  }, [stopAllData, directionTo]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (stopAllData.length !== 0) {
      const interval = setInterval(async () => {
        const { estimatedArrivalData } = await getEstimatedArrivalData(
          City,
          RouteName
        );

        const tempStopAllData = stopAllData.map((data) => {
          const found = estimatedArrivalData.find(
            (e) => e.StopUID === data.StopUID
          );
          return { ...data, EstimateTime: found ? found.EstimateTime : null };
        });

        setStopAllData(tempStopAllData);
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [isStartInterval]);

  return (
    <Style.Container>
      <Style.Top>
        <img src={ArrowLeft} alt="previous" onClick={() => clickArrowLeft()} />
        <Style.Number>{isZhTw ? RouteName.Zh_tw : RouteName.En}</Style.Number>
      </Style.Top>
      {!showMap && (
        <>
          <Style.Row>
            <Icon
              src={Guild}
              alt="guild"
              style={{
                img: "16px",
                circle: "34px",
                circleColor: "#4c546a",
                margin: "0 16px 0 0",
              }}
              onClick={
                displayStopData.length ? () => setShowMap(true) : () => {}
              }
            />
            <Icon
              src={ClockWhite}
              alt="clock"
              style={{
                img: "22px",
                circle: "34px",
                circleColor: "#4c546a",
                margin: "0 auto 0 0",
              }}
              onClick={() => setShowTimetable(true)}
            />
            <BusStartEnd
              departureStopName={
                isZhTw ? DepartureStopNameZh : DepartureStopNameEn
              }
              destinationStopName={
                isZhTw ? DestinationStopNameZh : DestinationStopNameEn
              }
              style={{ color: "#FFF", fontSize: "14px" }}
            />
          </Style.Row>
        </>
      )}
      {showTimetable && <Timetable setVisible={setShowTimetable} />}
      {showMap && displayStopData.length && (
        <Map
          displayStopData={displayStopData}
          showAllLiveContent={showAllContent}
        />
      )}
      <LiveContent
        clickStop={clickStop}
        displayStopData={displayStopData}
        showMap={showMap}
        showAllContent={showAllContent}
        setShowAllContent={setShowAllContent}
        directionTo={directionTo}
        setDirectionTo={setDirectionTo}
      />
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
