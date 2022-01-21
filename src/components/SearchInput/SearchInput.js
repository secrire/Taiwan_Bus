/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { useLanguageStore } from "store/languageStore";
import CaretDown from "images/caret-down.svg";
import Search from "images/search.svg";

import * as Style from "./style";

const cityOptions = [
  { value: "Taipei", title: "臺北市", enTitle: "Taipei" },
  { value: "NewTaipei", title: "新北市", enTitle: "New Taipei" },
  { value: "Taoyuan", title: "桃園", enTitle: "Taoyuan" },
  { value: "Hsinchu", title: "新竹市", enTitle: "Hsinchu" },
  { value: "HsinchuCounty", title: "新竹縣", enTitle: "Hsinchu County" },
  { value: "Taichung", title: "臺中市", enTitle: "Taichung" },
  { value: "Tainan", title: "臺南市", enTitle: "Tainan" },
  { value: "Kaohsiung", title: "高雄市", enTitle: "Kaohsiung" },
  { value: "Keelung", title: "基隆市", enTitle: "Keelung" },
  { value: "ChanghuaCounty", title: "彰化市", enTitle: "Changhua County" },
  { value: "MiaoliCounty", title: "苗栗縣", enTitle: "Miaoli County" },
  { value: "NantouCounty", title: "南投", enTitle: "Nantou County" },
  { value: "YunlinCounty", title: "雲林", enTitle: "Yunlin County" },
  { value: "Chiayi", title: "嘉義市", enTitle: "Chiayi" },
  { value: "ChiayiCounty", title: "嘉義縣", enTitle: "Chiayi County" },
  { value: "PingtungCounty", title: "屏東", enTitle: "Pingtung County" },
  { value: "YilanCounty", title: "宜蘭", enTitle: "Yilan County" },
  { value: "HualienCounty", title: "花蓮", enTitle: "Hualien County" },
  { value: "TaitungCounty", title: "臺東", enTitle: "Taitung County" },
  { value: "KinmenCounty", title: "金門", enTitle: "Kinmen County" },
  { value: "PenghuCounty", title: "澎湖", enTitle: "Penghu County" },
  { value: "LienchiangCounty", title: "連江", enTitle: "Lienchiang County" },
];

const SearchInput = (props) => {
  const { t } = useTranslation();
  const { changeCity, city, cityWarning, keyword, changeKeyword, clickSearch } =
    props;
  const [showCityOptions, setShowCityOptions] = useState(false);

  const { isZhTw } = useLanguageStore();

  const getCityDisplayName = (city) => {
    const foundCity = cityOptions.find((option) => option.value === city);
    return isZhTw ? foundCity.title : foundCity.enTitle;
  };

  return (
    <Style.Container>
      <Style.InputContainer>
        <Style.CityDiv>
          {city ? getCityDisplayName(city) : t("COMMON.PLEASE_SELECT_CITY")}
        </Style.CityDiv>
        <Style.InputImg
          src={CaretDown}
          alt="select city"
          onClick={() => setShowCityOptions(true)}
        />
      </Style.InputContainer>
      {showCityOptions && (
        <Style.BackGround onClick={() => setShowCityOptions(false)}>
          <Style.CityContainer>
            {cityOptions.map((data) => (
              <Style.CityOption
                key={data.value}
                value={data.value}
                onClick={(e) => changeCity(e.target.value)}
              >
                {isZhTw? data.title: data.enTitle}
              </Style.CityOption>
            ))}
          </Style.CityContainer>
        </Style.BackGround>
      )}
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

SearchInput.propTypes = {
  changeCity: PropTypes.func,
  city: PropTypes.string,
  cityWarning: PropTypes.bool,
  keyword: PropTypes.string,
  changeKeyword: PropTypes.func,
  clickSearch: PropTypes.func,
};

SearchInput.defaultProps = {
  changeCity: () => {},
  city: "",
  cityWarning: false,
  keyword: "",
  changeKeyword: () => {},
  clickSearch: () => {},
};
