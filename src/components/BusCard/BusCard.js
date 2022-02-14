/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useLanguageStore } from "stores/languageStore";
import BusStartEnd from "components/BusStartEnd";

import HeartFullRed from "images/heart-full-red.svg";
import HeartEmpty from "images/heart-empty.svg";

import * as Style from "./style";

const BusCard = (props) => {
  const { busData, clickCard, clickLike } = props;
  const { DepartureStopNameZh, DestinationStopNameZh, liked } = busData;

  const { isZhTw } = useLanguageStore();
  // console.log("busCard", busData);

  return (
    <Style.Container>
      <Style.Left onClick={() => clickCard()}>
        <Style.BusNumber>{busData.RouteName.Zh_tw}</Style.BusNumber>
        <BusStartEnd
          stopNames={{ DepartureStopNameZh, DestinationStopNameZh }}
          style={{ color: "4c546a", fontSize: "12px" }}
        />
      </Style.Left>
      <Style.HeartContainer>
        <Style.Heart
          src={liked ? HeartFullRed : HeartEmpty}
          alt="heart"
          onClick={() => clickLike()}
        />
        {/* <Style.BusCity>測試</Style.BusCity> */}
      </Style.HeartContainer>
    </Style.Container>
  );
};

export default BusCard;

BusCard.propTypes = {
  busData: PropTypes.object,
  clickCard: PropTypes.func,
  clickLike: PropTypes.func,
};

BusCard.defaultProps = {
  busData: {},
  clickCard: () => {},
  clickLike: () => {},
};
