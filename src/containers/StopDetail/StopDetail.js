import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useAxios from "hooks/useAxios";
import { useLanguageStore } from "stores/languageStore";
import { useLikedStopStore } from "stores/likedStopStore";
import BusCard from "components/BusCard";

import ArrowLeft from "images/arrow-left.svg";
import HeartFullRed from "images/heart-full-red.svg";
import HeartEmpty from "images/heart-empty.svg";
import BusWhite from "images/bus-white.svg";

import * as Style from "./style";

const StopDetail = (props) => {
  console.log("props", props);
  const { likedStopData, setLikedStopData } = useLikedStopStore();

  const [stopName, setStopName] = useState("");
  const [stopOfRoute, setStopOfRoute] = useState([]);
  const [stopOfRouteWithTime, setStopOfRouteWithTime] = useState([]);
  const [liked, setLiked] = useState();
  const [cityState, setCityState] = useState("");
  const [stopState, setStopState] = useState("");

  const axios = useAxios();
  const { isZhTw } = useLanguageStore();

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

  const getRouteData = async (city, RouteName) => {
    const config = {
      url: `v2/Bus/Route/City/${city}/${RouteName.Zh_tw}`,
      method: "GET",
    };
    const routeData = await axios.exec(config);
    return { routeData };
  };

  const getStopOfRoute = async (city, stopUid) => {
    const response = await getStopOfRouteData(city);
    let stopOfRouteData = [];
    let tempStopName;
    response.forEach((res) => {
      const found = res.Stops.find((element) => element.StopUID === stopUid);
      if (found) {
        stopOfRouteData.push({
          RouteUID: res.RouteUID,
          RouteName: res.RouteName,
        });
        tempStopName = found.StopName;
      }
    });

    setStopName(tempStopName);

    const tempStopOfRoute = stopOfRouteData
      // filter duplicate value
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

    const callArr = tempStopOfRoute.map((r) => getRouteData(city, r.RouteName));

    const tempRouteData = await Promise.all(callArr);

    const tempRouteDataWithStartEnd = tempRouteData
      .map((data, index) =>
        data.routeData.filter(
          (d) => d.RouteUID === tempStopOfRoute[index].RouteUID
        )
      )
      .map((d, index) => {
        return {
          ...tempStopOfRoute[index],
          DepartureStopNameEn: d[0].DepartureStopNameEn,
          DepartureStopNameZh: d[0].DepartureStopNameZh,
          DestinationStopNameEn: d[0].DestinationStopNameEn,
          DestinationStopNameZh: d[0].DestinationStopNameZh,
        };
      });

    setStopOfRoute(tempRouteDataWithStartEnd);
    return tempRouteDataWithStartEnd;
  };

  const getStopOfRouteWithTime = (stopOfRoute, estimatedArrivalDataArr) => {
    const stopOfRouteUid = stopOfRoute.map((r) => r.RouteUID);
    const estimatedTime = estimatedArrivalDataArr.map((data) =>
      data.estimatedArrivalData
        .filter(
          (d) => d.StopUID === stopState && stopOfRouteUid.includes(d.RouteUID)
        )
        .filter(
          (d) =>
            (d.StopStatus === 1 && d.EstimateTime > 0) || // not start but estimate what time to start
            d.StopStatus === 0
        )
        .map((d) => d.EstimateTime)
    );
    const tempStopOfRouteWithTime = stopOfRoute.map((item, index) => {
      if (estimatedTime[index].length !== 0) {
        return Object.assign({}, item, {
          EstimateTime: Number(estimatedTime[index]),
        });
      }
      return item;
    });
    return tempStopOfRouteWithTime;
  };

  const getInitEstimatedArrivalData = async (stopOfRoute) => {
    const callArr = stopOfRoute.map((r) =>
      getEstimatedArrivalData(cityState, r.RouteName)
    );

    const estimatedArrivalDataArr = await Promise.all(callArr);

    // const stopOfRouteUid = stopOfRoute.map((r) => r.RouteUID);
    // const estimatedTime = estimatedArrivalDataArr.map((data) =>
    //   data.estimatedArrivalData
    //     .filter(
    //       (d) => d.StopUID === stopState && stopOfRouteUid.includes(d.RouteUID)
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

  const clickLike = () => {
    let tempLikedStop;
    if (liked) {
      tempLikedStop = likedStopData.filter(
        (data) => data.stopUid !== stopState
      );
    } else {
      tempLikedStop = [
        ...likedStopData,
        { stopUid: stopState, city: cityState },
      ];
    }
    setLikedStopData(tempLikedStop);
    setLiked(!liked);
  };

  useEffect(() => {
    if (stopOfRoute.length !== 0) {
      getInitEstimatedArrivalData(stopOfRoute);
    }
  }, [stopOfRoute]);

  useEffect(() => {
    let tempCityState;
    let tempStopState;

    if (props.stopUid) {
      tempCityState = props.city;
      tempStopState = props.stopUid;
    } else {
      const search = props.location.search;
      const params = new URLSearchParams(search);
      const cityByUrl = params.get("city");
      const stopByUrl = params.get("stop");
      tempCityState = cityByUrl;
      tempStopState = stopByUrl;
    }
    setCityState(tempCityState);
    setStopState(tempStopState);

    if (likedStopData.find((data) => data.stopUid === tempStopState)) {
      setLiked(true);
    }

    let tempStopOfRoute;
    getStopOfRoute(tempCityState, tempStopState).then((res) => {
      tempStopOfRoute = res;
    });

    const interval = setInterval(async () => {
      if (tempStopOfRoute) {
        console.log("=====  3   ====", tempStopOfRoute);

        const callArr = tempStopOfRoute.map((r) =>
          getEstimatedArrivalData(tempCityState, r.RouteName)
        );

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
  // console.log("stopDeatil", stopOfRoute, stopOfRouteWithTime);
  return (
    <Style.Container isWholePage={!props.stopUid}>
      <Style.HeaderContainer isWholePage={!props.stopUid}>
        {!props.stopUid ? (
          <img
            src={ArrowLeft}
            alt="previous"
            onClick={() => props.history.goBack()}
          />
        ) : (
          <Style.BusImg src={BusWhite} alt="bus" />
        )}
        <Style.StopTItle>
          {isZhTw ? stopName.Zh_tw : stopName.En}
        </Style.StopTItle>
        <Style.Heart
          src={liked ? HeartFullRed : HeartEmpty}
          alt="heart"
          onClick={() => clickLike()}
        />
      </Style.HeaderContainer>
      <Style.CardContainer isWholePage={!props.stopUid}>
        {stopOfRouteWithTime.map((data) => (
          <BusCard
            key={data.RouteUID}
            busData={data}
            // clickCard={() => clickCard(data)}
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
