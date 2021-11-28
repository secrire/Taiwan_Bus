import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// import Keypad from "components/Keypad";
import Icon from "components/Icon";
import SearchInput from "components/SearchInput";
import Toggle from "components/Toggle";
import BusCard from "components/BusCard";
import Menu from "images/menu.svg";

import * as Style from "./style";

const Live = (props) => {
  const clickCard = (num) => {
    props.history.push(`/app/liveInfo?busNumber=${num}`);
  };

  return (
    <Style.Container>
      <SearchInput />
      <Link to="/app/menu">
        <Icon
          src={Menu}
          alt="bus"
          style={{
            circle: "24px",
            circleColor: "lightgray",
            img: "20px",
            position: "fixed",
            top: "30px",
            left: "20px",
          }}
        />
      </Link>
      <Style.ToggleContainer>
        <Style.ToggleTitle>僅顯示提供無障礙車輛之路線</Style.ToggleTitle>
        <Toggle />
      </Style.ToggleContainer>
      <Style.CardContainer>
        <BusCard clickCard={()=>clickCard(1234)} />
      </Style.CardContainer>
    </Style.Container>
  );
};

export default Live;

Live.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }),
  }).isRequired,
};
