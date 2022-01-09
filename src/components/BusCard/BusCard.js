/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import BusStartEnd from "components/BusStartEnd";

import HeartFullRed from "images/heart-full-red.svg";
import HeartEmpty from "images/heart-empty.svg";
import Arrows from "images/arrows.svg";

import * as Style from "./style";

const BusCard = (props) => {
  const { busData, clickCard, clickLike } = props;
  const { DepartureStopNameZh, DestinationStopNameZh, liked } = busData;

  return (
    <Style.Container>
      <Style.Left onClick={() => clickCard()}>
        <Style.BusNumber>{busData.RouteName.Zh_tw}</Style.BusNumber>
        <BusStartEnd
          stopNames={{ DepartureStopNameZh, DestinationStopNameZh }}
          style={{ color: "4c546a", fontSize: "12px" }}
        />
      </Style.Left>
      <Style.Right>
        {liked ? (
          <Style.Heart
            src={HeartFullRed}
            alt="heart"
            onClick={() => clickLike()}
          />
        ) : (
          <Style.Heart
            src={HeartEmpty}
            alt="heart"
            onClick={() => clickLike()}
          />
        )}
        {/* <Style.BusCity>測試</Style.BusCity> */}
      </Style.Right>
    </Style.Container>
  );
};

export default BusCard;

BusCard.propTypes = {};
