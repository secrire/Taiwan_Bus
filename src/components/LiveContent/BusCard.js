/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";

import BusStartEnd from "components/BusStartEnd";

import HeartFull from "images/heart-full.svg";
import HeartEmpty from "images/heart-empty.svg";
import Arrows from "images/arrows.svg";

import * as Style from "./style";

const BusCard = (props) => {
  const { clickCard } = props;
  const [liked, setLiked] = useState(false);

  return (
    <Style.Container onClick={() => clickCard()} >
      <Style.Row>
        <Style.BusNumber>1234</Style.BusNumber>
        {liked ? (
          <Style.Heart src={HeartFull} alt="heart" onClick={() => setLiked(!liked)} />
        ) : (
          <Style.Heart src={HeartEmpty} alt="heart" onClick={() => setLiked(!liked)} />
        )}
      </Style.Row>
      <Style.Row>
        <BusStartEnd />
        <Style.BusCity>測試</Style.BusCity>
      </Style.Row>
    </Style.Container>
  );
};

export default BusCard;

BusCard.propTypes = {};
