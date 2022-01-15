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
  // const [likedRoute, setLikedRoute] = useState([]);
  const [showTimetable, setShowTimetable] = useState(false);

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

  const clickSearch = async () => {
    if (city) {
      const callArr = [getRouteData(city, keyword), getVehicleData(city)];
      const [routeData, vehicleData] = await Promise.all(callArr);

      const tempBusCardData = routeData.map((i) => {
        if (likedRouteData.find((data) => data.RouteUID === i.RouteUID)) {
          return { ...i, liked: true };
        } else {
          return { ...i, liked: false };
        }
      });
      setBusCardData(tempBusCardData);
    } else {
      setCityWarning("請選擇縣市");
    }
  };

  const clickLike = (busData) => {
    // let tempLikedRoute;
    // if (!busData.liked) {
    //   tempLikedRoute = [...likedRouteData, busData];
    // } else {
    //   tempLikedRoute = likedRouteData.filter((item) => item !== busData);
    // }
    // setLikedRouteData(tempLikedRoute);
    // localStorage.setItem("likedRouteDataStore", JSON.stringify(tempLikedRoute));

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

  // useEffect(() => {
  //   const tempLikedRoute = JSON.parse(localStorage.getItem("likedRouteDataStore"));
  //   if (tempLikedRoute) {
  //     setLikedRoute(tempLikedRoute);
  //   }
  // }, []);

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
        {/* <Link to="/app/menu">
          <Icon
            src={Menu}
            alt="menu"
            style={{
              img: "20px",
              position: "fixed",
              top: "40px",
              left: "18px",
            }}
          />
        </Link> */}
      </Style.Top>
      <Style.ToggleContainer>
        <Style.ToggleTitle>僅顯示提供無障礙車輛之路線</Style.ToggleTitle>
        <Toggle />
      </Style.ToggleContainer>
      <Style.CardContainer>
        {busCardData.map((data) => (
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
