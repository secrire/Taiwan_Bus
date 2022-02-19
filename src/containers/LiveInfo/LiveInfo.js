import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import useAxios from "hooks/useAxios";
import { useLanguageStore } from "stores/languageStore";
import { useBusStore } from "stores/busStore";
// import Keypad from "components/Keypad";
import Icon from "components/Icon";
import BusStartEnd from "components/BusStartEnd";
import LiveContent from "components/LiveContent";
import Timetable from "components/Timetable";
import Map from "components/Map";

import ArrowLeft from "images/arrow-left.svg";
// import Menu from "images/menu.svg";
import Guild from "images/guild.svg";
import Clock from "images/clock.svg";

import * as Style from "./style";

const LiveInfo = (props) => {
  const [showTimetable, setShowTimetable] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showAllContent, setShowAllContent] = useState(true);
  const [stopAllData, setStopAllData] = useState([]);
  const [isStartInterval, setIsStartInterval] = useState(false);

  const axios = useAxios();
  const { isZhTw } = useLanguageStore();
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

  const getStopData = async (city) => {
    const config = {
      url: `v2/Bus/Stop/City/${city}`,
      method: "GET",
    };
    const stopData = await axios.exec(config);
    return { stopData };
  };

  // const getStopOfRouteData = async (city) => {
  //   const config = {
  //     url: `v2/Bus/StopOfRoute/City/${city}`,
  //     method: "GET",
  //   };
  //   const stopOfRouteData = await axios.exec(config);
  //   return stopOfRouteData;
  // };

  const init = async () => {
    const callArr = [
      getEstimatedArrivalData(City, RouteName),
      getVehicleData(City),
      getStopData(City),
    ];
    const [
      { estimatedArrivalData },
      { vehicleData },
      { stopData },
      // { realTimeNearStopData },
    ] = await Promise.all(callArr);

    let accessibleNumb = [];
    vehicleData.forEach((data) => {
      if (data.VehicleType === 1) {
        accessibleNumb.push(data.PlateNumb);
      }
    });

    let tempStopAllData;
    tempStopAllData = estimatedArrivalData
      .filter((data) => data.StopStatus === 0) //StopStatus : 0 = 'work well'
      .map((data) => {
        if (accessibleNumb.includes(data.PlateNumb)) {
          return { ...data, isAccessible: true };
        } else {
          return { ...data, isAccessible: false };
        }
      });

    // if (stopData) {
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
    // }

    // console.log("tempStopAllData>>>1", tempStopAllData);

    // tempStopAllData = [...tempStopAllData].map((s) => {
    //   const foundStop = realTimeNearStopData.filter(
    //     (data) => data.StopUID === s.StopUID && data.BusStatus === 0
    //   );
    //   const tempOfRoute = [];
    //   console.log("foundStop", foundStop);
    //   if (foundStop.length !== 0) {
    //     foundStop.forEach((found) =>
    //       tempOfRoute.push({
    //         routeName: found.RouteName,
    //         routeUID: found.RouteUID,
    //       })
    //     );
    //     return {
    //       ...s,
    //       ofRoute: tempOfRoute,
    //     };
    //   } else {
    //     return { ...s };
    //   }
    // });
    // console.log("tempStopAllData>>>    2", tempStopAllData);
    setStopAllData(tempStopAllData);
    setIsStartInterval(true);
    // const tempStopOfRouteData = await getStopOfRouteData(City)
    // setStopOfRouteData(tempStopOfRouteData)
    // console.log("realTimeNearStopData----", realTimeNearStopData);
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

  console.log("stopAllData", stopAllData);
  return (
    <Style.Container>
      <Style.Top>
        <img src={ArrowLeft} alt="previous" onClick={() => clickArrowLeft()} />
        <Style.Number>{RouteName.Zh_tw}</Style.Number>
        {/* <Link to="/app/menu">
          <Icon
            src={Menu}
            alt="menu"
            style={{
              img: "20px",
              margin: "0 0 0 22px",
            }}
          />
        </Link> */}
      </Style.Top>
      {!showMap && (
        <>
          {/* <Style.Number>{RouteName.Zh_tw}</Style.Number> */}
          <Style.Row>
            <Icon
              src={Guild}
              alt="guild"
              style={{
                img: "16px",
                circle: "36px",
                circleColor: "rgb(50,115,246)",
                margin: "0 16px 0 0",
              }}
              onClick={() => setShowMap(true)}
            />
            <Icon
              src={Clock}
              alt="clock"
              style={{
                img: "22px",
                circle: "36px",
                circleColor: "rgb(50,115,246)",
                margin: "0 auto 0 0",
              }}
              onClick={() => setShowTimetable(true)}
            />
            <BusStartEnd
              stopNames={{ DepartureStopNameZh, DestinationStopNameZh }}
              style={{ color: "#FFF", fontSize: "16px" }}
            />
          </Style.Row>
        </>
      )}
      {showTimetable && <Timetable setVisible={setShowTimetable} />}
      {showMap && stopAllData.length !== 0 && (
        <Map stopData={stopAllData} showAllLiveContent={showAllContent} />
      )}
      <LiveContent
        clickStop={clickStop}
        stopAllData={stopAllData}
        showMap={showMap}
        showAllContent={showAllContent}
        setShowAllContent={setShowAllContent}
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
