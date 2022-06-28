/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Search from "images/search.svg";

import * as Style from "./style";

const SearchInput = (props) => {
  const { t } = useTranslation();
  const { placeholder, keyword, changeKeyword, clickSearch } = props;

  return (
    <>
      <Style.InputContainer>
        <form onSubmit={clickSearch} action="">
          <Style.Input
            placeholder={placeholder}
            onChange={(e) => changeKeyword(e.target.value)}
            value={keyword}
            id="search-enter-input"
            type="string"
          />
          <Style.InputImg src={Search} alt="search" onClick={clickSearch} />
        </form>
      </Style.InputContainer>
    </>
  );
};

export default SearchInput;

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  keyword: PropTypes.string,
  changeKeyword: PropTypes.func,
  clickSearch: PropTypes.func,
};

SearchInput.defaultProps = {
  placeholder: "",
  keyword: "",
  changeKeyword: () => {},
  clickSearch: () => {},
};
