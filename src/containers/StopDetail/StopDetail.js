import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import useAxios from "hooks/useAxios";
import { useLanguageStore } from "stores/languageStore";
import { useBusStore } from "stores/busStore";
// import Keypad from "components/Keypad";
import Icon from "components/Icon";
import BusCard from "components/BusCard";
import LiveContent from "components/LiveContent";
import Timetable from "components/Timetable";
// import Map from "components/Map";

import ArrowLeft from "images/arrow-left.svg";
import Menu from "images/menu.svg";
import HeartFullRed from "images/heart-full-red.svg";
import HeartEmpty from "images/heart-empty.svg";

import * as Style from "./style";

const StopDetail = (props) => {
  const [stopName, setStopName] = useState("");
  const [stopOfRoute, setStopOfRoute] = useState([]);
  const [stopOfRouteWithTime, setStopOfRouteWithTime] = useState([]);

  const axios = useAxios();
  const { isZhTw } = useLanguageStore();

  const search = props.location.search;
  const params = new URLSearchParams(search);
  const cityByUrl = params.get("city");
  const stopByUrl = params.get("stop");

  const getStopOfRouteData = async (city) => {
    const config = {
      url: `v2/Bus/StopOfRoute/City/${city}`,
      method: "GET",
    };
    const stopOfRouteData = await axios.exec(config);
    return stopOfRouteData;
  };

  const getEstimatedArrivalData = async (city, RouteName) => {
    const config = {
      url: `v2/Bus/EstimatedTimeOfArrival/City/${city}/${RouteName.Zh_tw}`,
      method: "GET",
    };
    const estimatedArrivalData = await axios.exec(config);
    return { estimatedArrivalData };
  };

  const getStopOfRoute = async () => {
    const response = await getStopOfRouteData(cityByUrl);
    // console.log("getStopOfRouteData>>>", response);
    let stopOfRouteData = [];
    let tempStopName;
    response.forEach((res) => {
      const found = res.Stops.find((element) => element.StopUID === stopByUrl);
      if (found) {
        stopOfRouteData.push({
          RouteUID: res.RouteUID,
          RouteName: res.RouteName,
        });
        tempStopName = found.StopName;
      }
    });

    setStopName(tempStopName);

    // console.log("------ stopOfRouteData -----", stopOfRouteData);
    const tempStopOfRoute = stopOfRouteData
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.RouteUID === value.RouteUID &&
              t.RouteName.Zh_tw === value.RouteName.Zh_tw
          )
      )
      .map((data) => {
        return { RouteUID: data.RouteUID, RouteName: data.RouteName };
      });

    setStopOfRoute(tempStopOfRoute);
    console.log("------ tempStopOfRoute -----", tempStopOfRoute);
    return tempStopOfRoute;
  };

  const getStopOfRouteWithTime = (stopOfRoute, estimatedArrivalDataArr) => {
    const stopOfRouteUid = stopOfRoute.map((r) => r.RouteUID);
    const estimatedTime = estimatedArrivalDataArr.map((data) =>
      data.estimatedArrivalData
        .filter(
          (d) => d.StopUID === stopByUrl && stopOfRouteUid.includes(d.RouteUID)
        )
        .filter(
          (d) =>
            (d.StopStatus === 1 && d.EstimateTime > 0) || // not start but estimate what time to start
            d.StopStatus === 0
        )
        .map((d) => d.EstimateTime)
    );
    const tempStopOfRouteWithTime = [
      { RouteName: { Zh_tw: "5", En: "5" }, RouteUID: "TNN10164" },
      { RouteName: { Zh_tw: "1", En: "1" }, RouteUID: "TNN10019" },
    ].map((item, index) => {
      if (estimatedTime[index].length !== 0) {
        return Object.assign({}, item, {
          EstimateTime: Number(estimatedTime[index]),
        });
      }
      return item;
    });
    console.log("=====  5   ====", estimatedTime, tempStopOfRouteWithTime);
    return tempStopOfRouteWithTime;
  };

  const getInitEstimatedArrivalData = async () => {
    console.log("=====  2   ====");
    const callArr = [
      { RouteName: { Zh_tw: "5", En: "5" }, RouteUID: "TNN10164" },
      { RouteName: { Zh_tw: "1", En: "1" }, RouteUID: "TNN10019" },
    ].map((r) => getEstimatedArrivalData(cityByUrl, r.RouteName));

    const estimatedArrivalDataArr = await Promise.all(callArr);

    // const stopOfRouteUid = stopOfRoute.map((r) => r.RouteUID);
    // const estimatedTime = estimatedArrivalDataArr.map((data) =>
    //   data.estimatedArrivalData
    //     .filter(
    //       (d) => d.StopUID === stopByUrl && stopOfRouteUid.includes(d.RouteUID)
    //     )
    //     .filter(
    //       (d) =>
    //         (d.StopStatus === 1 && d.EstimateTime > 0) || // not start but estimate what time to start
    //         d.StopStatus === 0
    //     )
    //     .map((d) => d.EstimateTime)
    // );
    // const tempStopOfRouteWithTime = [
    //   { RouteName: { Zh_tw: "5", En: "5" }, RouteUID: "TNN10164" },
    //   { RouteName: { Zh_tw: "1", En: "1" }, RouteUID: "TNN10019" },
    // ].map((item, index) => {
    //   if (estimatedTime[index].length !== 0) {
    //     return Object.assign({}, item, {
    //       EstimateTime: Number(estimatedTime[index]),
    //     });
    //   }
    //   return item;
    // });
    const tempStopOfRouteWithTime = getStopOfRouteWithTime(
      stopOfRoute,
      estimatedArrivalDataArr
    );
    setStopOfRouteWithTime(tempStopOfRouteWithTime);
  };

  useEffect(() => {
    if (stopOfRoute.length !== 0) {
      getInitEstimatedArrivalData();
    }
  }, [stopOfRoute]);

  useEffect(() => {
    let tempStopOfRoute;
    getStopOfRoute().then((res) => {
      tempStopOfRoute = res;
    });

    console.log("=====  1   ====", tempStopOfRoute);

    const interval = setInterval(async () => {
      if (tempStopOfRoute) {
        console.log("=====  3   ====", tempStopOfRoute);
        // await [
        //   { RouteName: { Zh_tw: "5", En: "5" }, RouteUID: "TNN10164" },
        //   { RouteName: { Zh_tw: "1", En: "1" }, RouteUID: "TNN10164" },
        // ].forEach((r) => getEstimatedArrivalData(cityByUrl, r.RouteName));

        const callArr = [
          { RouteName: { Zh_tw: "5", En: "5" }, RouteUID: "TNN10164" },
          { RouteName: { Zh_tw: "1", En: "1" }, RouteUID: "TNN10164" },
        ].map((r) => getEstimatedArrivalData(cityByUrl, r.RouteName));

        const estimatedArrivalDataArr = await Promise.all(callArr);
        console.log("=====  4   ====", estimatedArrivalDataArr);

        const tempStopOfRouteWithTime = getStopOfRouteWithTime(
          tempStopOfRoute,
          estimatedArrivalDataArr
        );
        setStopOfRouteWithTime(tempStopOfRouteWithTime);
      }
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Style.Container>
      <Style.HeaderContainer>
        <img
          src={ArrowLeft}
          alt="previous"
          onClick={() => {}}
          // style={{ margin: "24px 22px 0 0" }}
        />
        <Style.StopTItle>
          {isZhTw ? stopName.Zh_tw : stopName.En}
        </Style.StopTItle>
        <Style.Heart
          // src={liked ? HeartFullRed : HeartEmpty}
          src={HeartFullRed}
          alt="heart"
          // onClick={() => clickLike()}
        />
      </Style.HeaderContainer>
      <Style.CardContainer>
        {stopOfRouteWithTime.map((data) => (
          <BusCard
            key={data.RouteUID}
            busData={data}
            // clickCard={() => clickCard(data)}
            // clickLike={() => clickLike(data)}
          />
        ))}
      </Style.CardContainer>
    </Style.Container>
  );
};

export default StopDetail;

StopDetail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }),
  }).isRequired,
};
