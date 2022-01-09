import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import useAxios from "hooks/useAxios";
import { useBusStore } from "store/busStore";
// import Keypad from "components/Keypad";
import Icon from "components/Icon";
import SearchInput from "components/SearchInput";
import Toggle from "components/Toggle";
import BusCard from "components/BusCard";
import Timetable from "components/Timetable";
import Menu from "images/menu.svg";

import * as Style from "./style";

const SearchPage = (props) => {
  const [city, setCity] = useState("");
  const [cityWarning, setCityWarning] = useState("");
  const [keyword, setKeyword] = useState("");
  const [busCardData, setBusCardData] = useState([]);
  const [likedRoute, setLikedRoute] = useState([]);
  const [showTimetable, setShowTimetable] = useState(false);

  const axios = useAxios();
  const { setBusData } = useBusStore();

  const clickCard = (busData) => {
    // setBusData({ city: busInfo.City, routeName: busInfo.RouteID });
    // console.log("clickCard", busData);
    setBusData(busData);
    if (props.location.pathname === "/app/timetable") {
      setShowTimetable(true);
    } else {
      props.history.push(`/app/liveInfo?routeName=${busData.RouteID}`);
    }
  };

  const clickSearch = async () => {
    if (city) {
      const config = {
        url: `v2/Bus/Route/City/${city}/${keyword}`,
        method: "GET",
      };
      const searchResult = await axios.exec(config);
      const tempBusCardData = searchResult.map((i) => {
        if (likedRoute.includes(i.RouteUID)) {
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
    let tempLikedRoute;
    if (!busData.liked) {
      tempLikedRoute = [...likedRoute, busData.RouteUID];
    } else {
      tempLikedRoute = likedRoute.filter((item) => item !== busData.RouteUID);
    }
    setLikedRoute(tempLikedRoute);
    localStorage.setItem("likedRoute", JSON.stringify(tempLikedRoute));

    const tempBusCardData = busCardData.map((item) => {
      if (item.RouteUID === busData.RouteUID) {
        return { ...item, liked: !busData.liked };
      } else {
        return item;
      }
    });
    setBusCardData(tempBusCardData);
  };

  useEffect(() => {
    const tempLikedRoute = JSON.parse(localStorage.getItem("likedRoute"));
    if (tempLikedRoute) {
      setLikedRoute(tempLikedRoute);
    }
  }, []);

  return (
    <Style.Container>
      <Style.Top>
        <SearchInput
          changeCity={setCity}
          city={city}
          cityWarning={cityWarning}
          changeKeyword={setKeyword}
          keyword={keyword}
          clickSearch={clickSearch}
        />
        <Link to="/app/menu">
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
        </Link>
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
