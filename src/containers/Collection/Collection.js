import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { useLikedRouteStore } from "stores/likedRouteStore";
import { useLikedStopStore } from "stores/likedStopStore";
import StopDetail from "containers/StopDetail";
import MainTitle from "components/MainTitle";
import SearchInput from "components/SearchInput";
import BusCard from "components/BusCard";
import PageDescription from "components/PageDescription";

import * as Style from "./style";

const Collection = (props) => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState("");
  const [selectedTab, setSelectedTab] = useState("route");
  const [displayRoute, setDisplayRoute] = useState([]);
  const [displayStop, setDisplayStop] = useState([]);

  const { likedRouteData, setLikedRouteData } = useLikedRouteStore();
  const { likedStopData, setLikedStopData } = useLikedStopStore();

  const cancelLike = (busData) => {
    const tempLikedRoute = likedRouteData.filter(
      (data) => data.RouteUID !== busData.RouteUID
    );

    setLikedRouteData(tempLikedRoute);
  };

  const clickCard = (busData) => {
    props.history.push(`/app/liveInfo?route=${busData.RouteUID}`);
  };

  const renderTabPane = () => {
    let displayData;
    switch (selectedTab) {
      case "route":
        if (keyword) {
          displayData = displayRoute;
        } else {
          displayData = likedRouteData;
        }
        return displayData.length === 0 ? (
          <PageDescription text={t("COMMON.NO_INFO_AT_THIS_MOMENT")} />
        ) : (
          displayData.map((data) => (
            <BusCard
              key={data.RouteUID}
              busData={data}
              clickCard={() => clickCard(data)}
              clickLike={() => cancelLike(data)}
            />
          ))
        );
      case "stop":
        if (keyword) {
          displayData = displayStop;
        } else {
          displayData = likedStopData;
        }
        return displayData.length === 0 ? (
          <PageDescription text={t("COMMON.NO_INFO_AT_THIS_MOMENT")} />
        ) : (
          displayData.map((data) => (
            <StopDetail
              key={data.stopUid}
              stopUid={data.stopUid}
              city={data.city}
            />
          ))
        );
      default:
        break;
    }
  };

  const getDisplayData = (value) => {
    const tempDisplayRoute = likedRouteData.filter((data) =>
      Object.values(data.RouteName).some((v) =>
        v.toLowerCase().includes(value.toLowerCase())
      )
    );
    setDisplayRoute(tempDisplayRoute);

    const tempDisplayStop = likedStopData.filter((data) =>
      Object.values(data.stopName).some((v) =>
        v.toLowerCase().includes(value.toLowerCase())
      )
    );
    setDisplayStop(tempDisplayStop);
  };

  const changeSearchInput = (value) => {
    setKeyword(value);
    getDisplayData(value);
  };

  const clickSearch = (event) => {
    event.preventDefault();
    getDisplayData(keyword);
  };

  const clickTab = (type) => {
    setSelectedTab(type);
    getDisplayData(keyword);
  };

  return (
    <>
      <Style.Top>
        <MainTitle title={t("COMMON.COLLECTION")} />
        <SearchInput
          placeholder={
            selectedTab === "route" ? t("COMMON.ROUTE") : t("COMMON.STOP")
          }
          changeKeyword={changeSearchInput}
          keyword={keyword}
          clickSearch={clickSearch}
        />
      </Style.Top>
      <Style.TabContainer selected={`collection-${selectedTab}`}>
        <div className="collection-route" onClick={() => clickTab("route")}>
          {t("COMMON.ROUTE")}
        </div>
        <div className="collection-stop" onClick={() => clickTab("stop")}>
          {t("COMMON.STOP")}
        </div>
      </Style.TabContainer>
      <Style.CardContainer isStop={selectedTab === "stop"}>
        {renderTabPane()}
      </Style.CardContainer>
    </>
  );
};

export default Collection;

Collection.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }),
  }).isRequired,
};
