/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";

import ArrowsCircle from "images/arrows-circle.svg";

import * as Style from "./style";

const LiveContent = (props) => {
  const { estimatedArrivalData } = props;

  const formatSecond = (secs) => {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - hr * 3600) / 60);
    if ((hr === 0 && min < 2) || secs === 0) {
      return "即將到站";
    }
    return `${hr === 0 ? "" : `${hr} 時`} ${min} 分`;
  };

  return (
    <Style.Container>
      <Style.Header>
        <div>
          <Style.HeaderTitle>行駛方向</Style.HeaderTitle>
          <Style.HeaderWay>
            <div>往</div>
            <div>龍潭站</div>
          </Style.HeaderWay>
        </div>
        <img src={ArrowsCircle} style={{ width: 30, marginLeft: "auto" }} />
      </Style.Header>
      <Style.Content>
        {estimatedArrivalData.map((data) => {
          const isSoon = formatSecond(data.EstimateTime) === "即將到站";
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
                <Style.WheelchairContainer>
                  <img src={ArrowsCircle} style={{ width: 30 }} />
                  <div>eaa-511</div>
                </Style.WheelchairContainer>
              </Style.StopContainer>
              {data !==
                estimatedArrivalData[estimatedArrivalData.length - 1] && (
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

LiveContent.propTypes = {};
