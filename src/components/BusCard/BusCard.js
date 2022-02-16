/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { useLanguageStore } from "stores/languageStore";
import BusStartEnd from "components/BusStartEnd";

import HeartFullRed from "images/heart-full-red.svg";
import HeartEmpty from "images/heart-empty.svg";

import * as Style from "./style";

const BusCard = (props) => {
  const { t } = useTranslation();
  const { busData, clickCard, clickLike } = props;
  const { DepartureStopNameZh, DestinationStopNameZh, liked, EstimateTime } =
    busData;

  const { isZhTw } = useLanguageStore();

  const formatSecond = (secs) => {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - hr * 3600) / 60);
    if ((hr === 0 && min < 3) || secs === 0) {
      return "soon";
    }
    return `${hr === 0 ? "" : `${hr} ${t("COMMON.HOUR")}`} ${min} ${t(
      "COMMON.MINUTE"
    )}`;
  };

  const formatEstimateTime = formatSecond(EstimateTime);
  console.log("busCard", busData);

  return (
    <Style.Container>
      <Style.Left onClick={() => clickCard()}>
        <Style.BusNumber>{busData.RouteName.Zh_tw}</Style.BusNumber>
        <BusStartEnd
          stopNames={{ DepartureStopNameZh, DestinationStopNameZh }}
          style={{ color: "4c546a", fontSize: "12px" }}
        />
      </Style.Left>
      {busData.hasOwnProperty("liked") ? (
        <Style.HeartContainer>
          <Style.Heart
            src={liked ? HeartFullRed : HeartEmpty}
            alt="heart"
            onClick={() => clickLike()}
          />
          {/* <Style.BusCity>測試</Style.BusCity> */}
        </Style.HeartContainer>
      ) : (
        <Style.EstimateTime>
          {EstimateTime && formatEstimateTime}
        </Style.EstimateTime>
      )}
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
