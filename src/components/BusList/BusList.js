/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import Menu from "images/menu.svg";
import Search from "images/search.svg";

import * as Style from "./style";

const BusList = (props) => {
  return (
    <Style.Container>
      <Style.InputContainer>
      <Style.Input placeholder='city'/>
        <Style.InputImg src={Menu} alt="city" />
      </Style.InputContainer>
      <Style.InputContainer>
      <Style.Input placeholder='search'/>
        <Style.InputImg src={Search} alt="search" />
      </Style.InputContainer>
    </Style.Container>
  );
};

export default BusList;

BusList.propTypes = {};
