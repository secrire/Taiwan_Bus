import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import useAxios from "hooks/useAxios";
import { useBusStore } from "stores/busStore";
import { useLikedRouteStore } from "stores/likedRouteStore";
import MainTitle from "components/MainTitle";
import SelectorCity from "components/SelectorCity";
import SearchInput from "components/SearchInput";
import Toggle from "components/Toggle";
import BusCard from "components/BusCard";
import Timetable from "components/Timetable";
import PageDescription from "components/PageDescription";

import * as Style from "./style";

const SearchPage = (props) => {
  const { t } = useTranslation();

  const [city, setCity] = useState("");
  const [cityWarning, setCityWarning] = useState("");
  const [keyword, setKeyword] = useState("");
  const [busCardData, setBusCardData] = useState(null);
  const [displayBusCardData, setDisplayBusCardData] = useState(null);
  const [showTimetable, setShowTimetable] = useState(false);
  const [accessibleOnly, setAccessibleOnly] = useState(false);

  const axios = useAxios();
  const { setBusData } = useBusStore();
  const { likedRouteData, setLikedRouteData } = useLikedRouteStore();

  const clickCard = (busData) => {
    setBusData(busData);
    if (props.location.pathname === "/app/timetable") {
      setShowTimetable(true);
    } else {
      props.history.push(`/app/liveInfo?route=${busData.RouteUID}`);
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

  const clickSearch = async (event) => {
    event.preventDefault();
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
      setCityWarning(t("COMMON.PLEASE_SELECT_CITY"));
    }
  };

  const renderCardContainerContent = () => {
    if (!displayBusCardData) {
      return <PageDescription text={t("COMMON.FIND_BUS_ROUTE_INFO")} />;
    } else if (displayBusCardData.length === 0) {
      return <PageDescription text={t("COMMON.NO_INFO_AT_THIS_MOMENT")} />;
    } else {
      return displayBusCardData.map((data) => (
        <BusCard
          key={data.RouteUID}
          busData={data}
          clickCard={() => clickCard(data)}
          clickLike={() => clickLike(data)}
        />
      ));
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
    if (busCardData) {
      if (accessibleOnly) {
        const tempDisplayBusCardData = [...busCardData].filter(
          (data) => data.isAccessible
        );
        setDisplayBusCardData(tempDisplayBusCardData);
      } else {
        setDisplayBusCardData(busCardData);
      }
    }
  }, [busCardData, accessibleOnly]);

  return (
    <>
      <Style.Top>
        <MainTitle
          title={
            props.location.pathname === "/app/timetable"
              ? t("COMMON.CHECK_TIMETABLE")
              : t("COMMON.BUS_LIVE")
          }
        />
        <SelectorCity
          changeCity={setCity}
          city={city}
          cityWarning={cityWarning}
        />
        <SearchInput
          placeholder={t("COMMON.ROUTE")}
          changeKeyword={setKeyword}
          keyword={keyword}
          clickSearch={clickSearch}
        />
      </Style.Top>
      <Style.ToggleContainer>
        <Style.ToggleTitle>
          {t("COMMON.ONLY_SHOW_ROUTE_WITH_ACCESSIBLE")}
        </Style.ToggleTitle>
        <Toggle
          onChange={() => setAccessibleOnly(!accessibleOnly)}
          checked={accessibleOnly}
        />
      </Style.ToggleContainer>
      <Style.CardContainer>{renderCardContainerContent()}</Style.CardContainer>
      {showTimetable && <Timetable setVisible={setShowTimetable} />}
    </>
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
