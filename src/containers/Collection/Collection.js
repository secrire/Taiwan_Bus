import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { useLikedRouteStore } from "stores/likedRouteStore";
import { useLikedStopStore } from "stores/likedStopStore";
import StopDetail from "containers/StopDetail";
import Header from "components/Header";
import BusCard from "components/BusCard";
import Search from "images/search.svg";

import * as Style from "./style";

const Collection = (props) => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState("");
  const [selectedTab, setSelectedTab] = useState("route");

  const { likedRouteData, setLikedRouteData } = useLikedRouteStore();
  const { likedStopData, setLikedStopData } = useLikedStopStore();

  const cancelLike = (busData) => {
    const tempLikedRoute = likedRouteData.filter(
      (data) => data.RouteUID !== busData.RouteUID
    );

    setLikedRouteData(tempLikedRoute);
  };

  // console.log('Collection===', likedRouteData)

  return (
    <Style.Container>
      <Style.Top>
        <Header title={t("COMMON.COLLECTION")} />
        <Style.InputContainer>
          <Style.Input
            placeholder="search"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <Style.InputImg src={Search} alt="search" onClick={() => {}} />
        </Style.InputContainer>
      </Style.Top>
      <Style.TabContainer>
        <div onClick={() => setSelectedTab("route")}>{t("COMMON.ROUTE")}</div>
        <div onClick={() => setSelectedTab("stop")}>{t("COMMON.STOP")}</div>
      </Style.TabContainer>
      <Style.CardContainer isStop={selectedTab === "stop"}>
        {selectedTab === "route" &&
          likedRouteData.length &&
          likedRouteData.map((data) => (
            <BusCard
              key={data.RouteUID}
              busData={data}
              // clickCard={() => clickCard(data)}
              clickLike={() => cancelLike(data)}
            />
          ))}
        {selectedTab === "stop" &&
          likedStopData.length &&
          likedStopData.map((data) => (
            <StopDetail
              key={data.stopUid}
              stopUid={data.stopUid}
              city={data.city}
            />
          ))}
      </Style.CardContainer>
    </Style.Container>
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
