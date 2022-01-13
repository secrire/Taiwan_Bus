import React, { useState } from "react";
import PropTypes from "prop-types";

import { useLikedRouteStore } from "store/likedRouteStore";
import Header from "components/Header";
import BusCard from "components/BusCard";
import Search from "images/search.svg";

import * as Style from "./style";

const Collection = (props) => {
  const [keyword, setKeyword] = useState("");
  const [selectedTab, setSelectedTab] = useState(null);

  const { likedRouteData, setLikedRouteData} = useLikedRouteStore();

  const clickLike = (busData) => {
    let tempLikedRoute;
    if (!busData.liked) {
      tempLikedRoute = [...likedRouteData, busData];
    } else {
      tempLikedRoute = likedRouteData.filter((item) => item !== busData);
    }
    setLikedRouteData(tempLikedRoute);
  };

  console.log('Collection===', likedRouteData)

  return (
    <Style.Container>
      <Style.Top>
        <Header title="我的收藏" />
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
        <div onClick={()=>setSelectedTab('route')}>路線</div>
        <div onClick={()=>setSelectedTab('stop')}>站點</div>
      </Style.TabContainer>
      <Style.CardContainer>
        {/* {likedRouteData.length && likedRouteData.map((data) => (
          <BusCard
            key={data.RouteUID}
            busData={data}
            // clickCard={() => clickCard(data)}
            clickLike={() => clickLike(data)}
          />
        ))} */}
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
