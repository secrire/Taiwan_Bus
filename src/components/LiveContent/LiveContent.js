/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Icon from "components/Icon";

import Arrows from "images/arrows.svg";
import BusBlue from "images/bus-blue.svg";
import WheelChair from "images/wheel-chair.jpg";

import * as Style from "./style";

const LiveContent = (props) => {
  const { t } = useTranslation();
  const { estimatedArrival } = props;

  const formatSecond = (secs) => {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - hr * 3600) / 60);
    if ((hr === 0 && min < 3) || secs === 0) {
      return 'soon';
    }
    return `${hr === 0 ? "" : `${hr} ${t("COMMON.HOUR")}`} ${min} ${t("COMMON.MINUTE")}`;
  };

  // console.log(estimatedArrival);

  return (
    <Style.Container>
      <Style.Header>
        <div>
          <Style.HeaderTitle>{t("COMMON.DIRECTION")}</Style.HeaderTitle>
          <Style.HeaderWay>
            <div>{t("COMMON.TO")}</div>
            <div>龍潭站</div>
          </Style.HeaderWay>
        </div>
        <Icon
          src={Arrows}
          alt="opposite direction"
          style={{
            img: "16px",
            circle: "30px",
            circleColor: "#5cbcdb",
            margin: "0 0 0 auto",
          }}
          onClick={() => {}}
        />
      </Style.Header>
      <Style.Content>
        {estimatedArrival.map((data) => {
          const isSoon = formatSecond(data.EstimateTime) === "soon";
          return (
            <React.Fragment key={data.StopUID}>
              <Style.StopContainer>
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
                      style={{ width: 16, marginRight: 4 }}
                    />
                    <div>{data.PlateNumb}</div>
                  </Style.WheelchairContainer>
                )}
              </Style.StopContainer>
              {data !== estimatedArrival[estimatedArrival.length - 1] && (
                <Style.StopBelow />
              )}
            </React.Fragment>
          );
        })}
      </Style.Content>
    </Style.Container>
  );
};

export default LiveContent;


LiveContent.propTypes = {
  estimatedArrival: PropTypes.array,
};

LiveContent.defaultProps = {
  estimatedArrival: [],
};
