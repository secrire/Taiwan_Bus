/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { useBusStore } from "stores/busStore";
import Icon from "components/Icon";

import CaretDown from "images/caret-down.svg";
import CaretUp from "images/caret-up.svg";
import Arrows from "images/arrows-white.svg";
import BusBlue from "images/bus-blue.svg";
import WheelChair from "images/wheel-chair.jpg";

import * as Style from "./style";

const LiveContent = (props) => {
  const { t } = useTranslation();
  const {
    displayStopData,
    showMap,
    showAllContent,
    setShowAllContent,
    clickStop,
    directionTo,
    setDirectionTo,
  } = props;

  const { busData } = useBusStore();
  const { DepartureStopNameZh, DestinationStopNameZh } = busData;

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

  // console.log(displayStopData);

  return (
    <Style.Container isMargin={showMap}>
      {showMap && (
        <Style.CaretContainer>
          <img
            src={showAllContent ? CaretDown : CaretUp}
            alt="Hide / Show Content"
            onClick={() => setShowAllContent(!showAllContent)}
          />
        </Style.CaretContainer>
      )}
      {showAllContent && (
        <>
          <Style.Header>
            <div>
              {/* <Style.HeaderTitle>{t("COMMON.DIRECTION")}</Style.HeaderTitle> */}
              <Style.HeaderWay>
                <div>{t("COMMON.TO")}</div>
                <div>
                  {directionTo ? DestinationStopNameZh : DepartureStopNameZh}
                </div>
              </Style.HeaderWay>
            </div>
            <Icon
              src={Arrows}
              alt="opposite direction"
              style={{
                img: "16px",
                circle: "30px",
                circleColor: "rgb(50, 115, 246)",
                margin: "0 0 0 auto",
              }}
              onClick={() => setDirectionTo(!directionTo)}
            />
          </Style.Header>
          <Style.Content showMap={showMap}>
            {displayStopData.map((data) => {
              const isSoon = formatSecond(data.EstimateTime) === "soon";
              return (
                <React.Fragment key={data.StopUID}>
                  <Style.StopContainer onClick={() => clickStop(data.StopUID)}>
                    <Style.StopPoint isSoon={isSoon} />
                    <Style.StopTime isSoon={isSoon}>
                      {data.EstimateTime && formatSecond(data.EstimateTime)}
                    </Style.StopTime>
                    <Style.StopName isSoon={isSoon}>
                      {data.StopName.Zh_tw}
                    </Style.StopName>
                    {isSoon && (
                      <Style.WheelchairContainer>
                        <img
                          src={data.isAccessible ? WheelChair : BusBlue}
                          style={{ width: 14, marginRight: 4 }}
                        />
                        <div>{data.PlateNumb}</div>
                      </Style.WheelchairContainer>
                    )}
                  </Style.StopContainer>
                  {data !== displayStopData[displayStopData.length - 1] && (
                    <Style.StopBelow />
                  )}
                </React.Fragment>
              );
            })}
          </Style.Content>
        </>
      )}
    </Style.Container>
  );
};

export default LiveContent;

LiveContent.propTypes = {
  displayStopData: PropTypes.array,
};

LiveContent.defaultProps = {
  displayStopData: [],
};
