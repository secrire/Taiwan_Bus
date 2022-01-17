/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";

import CaretDown from "images/caret-down.svg";
import Search from "images/search.svg";

import * as Style from "./style";

const cityOptions = [
  { value: "Taipei", title: "臺北市" },
  { value: "NewTaipei", title: "新北市" },
  { value: "Taoyuan", title: "桃園" },
  { value: "Taichung", title: "臺中市" },
  { value: "Tainan", title: "臺南市" },
  { value: "Kaohsiung", title: "高雄市" },
  { value: "Keelung", title: "基隆市" },
  { value: "Hsinchu", title: "新竹市" },
  { value: "HsinchuCounty", title: "新竹縣" },
  { value: "MiaoliCounty", title: "苗栗縣" },
  { value: "ChanghuaCounty", title: "彰化市" },
  { value: "NantouCounty", title: "南投" },
  { value: "YunlinCounty", title: "雲林" },
  { value: "ChiayiCounty", title: "嘉義縣" },
  { value: "Chiayi", title: "嘉義市" },
  { value: "PingtungCounty", title: "屏東" },
  { value: "YilanCounty", title: "宜蘭" },
  { value: "HualienCounty", title: "花蓮" },
  { value: "TaitungCounty", title: "臺東" },
  { value: "KinmenCounty", title: "金門" },
  { value: "PenghuCounty", title: "澎湖" },
  { value: "LienchiangCounty", title: "連江" },
];

const SearchInput = (props) => {
  const { changeCity, city, cityWarning, keyword, changeKeyword, clickSearch } =
    props;
  const [showCityOptions, setShowCityOptions] = useState(false);

  return (
    <Style.Container>
      <Style.InputContainer>
        <div>{city ? city : "請選擇縣市"}</div>
        {/* placeholder="請選擇縣市"
          // onChange={(e) => changeCity(e.target.value)}
          // value={city}
        /> */}
        <Style.InputImg
          src={CaretDown}
          alt="city"
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
                {data.title}
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

SearchInput.propTypes = {};
