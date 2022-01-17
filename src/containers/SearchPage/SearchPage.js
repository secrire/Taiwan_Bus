import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useAxios from "hooks/useAxios";
import { useBusStore } from "store/busStore";
import { useLikedRouteStore } from "store/likedRouteStore";
// import Keypad from "components/Keypad";
import Header from "components/Header";
import SearchInput from "components/SearchInput";
import Toggle from "components/Toggle";
import BusCard from "components/BusCard";
import Timetable from "components/Timetable";

import * as Style from "./style";

const SearchPage = (props) => {
  const [city, setCity] = useState("");
  const [cityWarning, setCityWarning] = useState("");
  const [keyword, setKeyword] = useState("");
  const [busCardData, setBusCardData] = useState([]);
  const [displayBusCardData, setDisplayBusCardData] = useState([]);
  const [showTimetable, setShowTimetable] = useState(false);
  const [accessibleOnly, setAccessibleOnly] = useState(false);

  const axios = useAxios();
  const { setBusData } = useBusStore();
  const { likedRouteData, setLikedRouteData } = useLikedRouteStore();

  const clickCard = (busData) => {
    // setBusData({ city: busInfo.City, routeName: busInfo.RouteID });
    setBusData(busData);
    if (props.location.pathname === "/app/timetable") {
      setShowTimetable(true);
    } else {
      props.history.push(`/app/liveInfo?routeName=${busData.RouteID}`);
    }
  };

  const getRouteData = async (city, keyword) => {
    const config = {
      url: `v2/Bus/Route/City/${city}/${keyword}`,
      method: "GET",
    };
    const routeData = await axios.exec(config);
    return { routeData };
  };

  const getVehicleData = async (city) => {
    const config = {
      url: `v2/Bus/Vehicle/City/${city}`,
      method: "GET",
    };
    const vehicleData = await axios.exec(config);
    return { vehicleData };
  };

  const getRealTimeData = async (city, keyword) => {
    const config = {
      url: `v2/Bus/RealTimeByFrequency/City/${city}/${keyword}`,
      method: "GET",
    };
    const realTimeData = await axios.exec(config);
    return { realTimeData };
  };

  const clickSearch = async () => {
    if (city) {
      const callArr = [
        getRouteData(city, keyword),
        getVehicleData(city),
        getRealTimeData(city, keyword),
      ];
      const [{ routeData }, { vehicleData }, { realTimeData }] =
        await Promise.all(callArr);
      let accessibleNumb = [];
      vehicleData.forEach((data) => {
        if (data.VehicleType === 1) {
          accessibleNumb.push(data.PlateNumb);
        }
      });
      let accessibleRoute = [];
      realTimeData.forEach((data) => {
        if (accessibleNumb.includes(data.PlateNumb)) {
          accessibleRoute.push(data.RouteUID);
        }
      });
      let tempBusCardData;
      tempBusCardData = routeData.map((data) => {
        if (likedRouteData.find((i) => i.RouteUID === data.RouteUID)) {
          return { ...data, liked: true };
        } else {
          return { ...data, liked: false };
        }
      });
      tempBusCardData = tempBusCardData.map((data) => {
        if (accessibleRoute.includes(data.RouteUID)) {
          return { ...data, isAccessible: true };
        } else {
          return { ...data, isAccessible: false };
        }
      });
      setBusCardData(tempBusCardData);
    } else {
      setCityWarning("請選擇縣市");
    }
  };

  const clickLike = (busData) => {
    const tempBusCardData = busCardData.map((cardData) => {
      if (cardData.RouteUID === busData.RouteUID) {
        return { ...cardData, liked: !busData.liked };
      } else {
        return cardData;
      }
    });
    setBusCardData(tempBusCardData);

    const tempLikedRoute = tempBusCardData.filter((cardData) => cardData.liked);
    setLikedRouteData(tempLikedRoute);
  };

  useEffect(() => {
    if (accessibleOnly) {
      const tempDisplayBusCardData = [...busCardData].filter(
        (data) => data.isAccessible
      );
      setDisplayBusCardData(tempDisplayBusCardData);
    } else {
      setDisplayBusCardData(busCardData);
    }
  }, [busCardData, accessibleOnly]);

  return (
    <Style.Container>
      <Style.Top>
        <Header title="公車動態" />
        <SearchInput
          changeCity={setCity}
          city={city}
          cityWarning={cityWarning}
          changeKeyword={setKeyword}
          keyword={keyword}
          clickSearch={clickSearch}
        />
      </Style.Top>
      <Style.ToggleContainer>
        <Style.ToggleTitle>僅顯示提供無障礙車輛之路線</Style.ToggleTitle>
        <Toggle
          onChange={() => setAccessibleOnly(!accessibleOnly)}
          checked={accessibleOnly}
        />
      </Style.ToggleContainer>
      <Style.CardContainer>
        {console.log("displayBusCardData", displayBusCardData.length)}
        {displayBusCardData.map((data) => (
          <BusCard
            key={data.RouteUID}
            busData={data}
            clickCard={() => clickCard(data)}
            clickLike={() => clickLike(data)}
          />
        ))}
      </Style.CardContainer>
      {showTimetable && <Timetable setVisible={setShowTimetable} />}
    </Style.Container>
  );
};

export default SearchPage;

SearchPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }),
  }).isRequired,
};
