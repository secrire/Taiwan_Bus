/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";

import ArrowsCircle from "images/arrows-circle.svg";

import * as Style from "./style";

const LiveContent = (props) => {
  const [liked, setLiked] = useState(false);

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
        <img src={ArrowsCircle} style={{ width: 30, marginLeft: 'auto' }} />
      </Style.Header>
      <Style.Content>
        <Style.StopContainer>
          <Style.StopPoint />
          <Style.StopTime>12:01</Style.StopTime>
          <Style.StopName>桃園站</Style.StopName>
          <Style.WheelchairContainer>
            <img src={ArrowsCircle} style={{ width: 30 }} />
            <div>eaa-511</div>
          </Style.WheelchairContainer>
        </Style.StopContainer>
        <Style.StopBelow />
      </Style.Content>
    </Style.Container>
  );
};

export default LiveContent;

LiveContent.propTypes = {};
