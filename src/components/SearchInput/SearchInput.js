/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import CaretDown from "images/caret-down.svg";
import Search from "images/search.svg";

import * as Style from "./style";

const SearchInput = (props) => {
  const { changeCity, city, cityWarning, keyword, changeKeyword, clickSearch } =
    props;

  return (
    <Style.Container>
      <Style.InputContainer>
        <Style.Input
          placeholder="city"
          onChange={(e) => changeCity(e.target.value)}
          value={city}
        />
        <Style.InputImg src={CaretDown} alt="city" />
      </Style.InputContainer>
      {cityWarning && <Style.CityWarning>{cityWarning}</Style.CityWarning>}
      <Style.InputContainer>
        <Style.Input
          placeholder="search"
          onChange={(e) => changeKeyword(e.target.value)}
          value={keyword}
        />
        <Style.InputImg src={Search} alt="search" onClick={clickSearch} />
      </Style.InputContainer>
    </Style.Container>
  );
};

export default SearchInput;

SearchInput.propTypes = {};
