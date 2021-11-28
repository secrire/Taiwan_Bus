import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// import Keypad from "components/Keypad";
import Cross from "images/cross.svg";
import SearchInput from "components/SearchInput";
import Menu from "images/menu.svg";

import * as Style from "./style";

const Timetable = (props) => {
  const { setVisible } = props;

  return (
    <Style.BackGround>
      <Style.Container>
        <Style.Header>
          <img src={Cross} alt="close" onClick={() => setVisible(false)} />
          <div>5033班次表</div>
        </Style.Header>
        <Style.Content>
          <div>平日</div>
          <Style.InfoContainer>
            <Style.Detail>
              <Style.Title>往 龍潭</Style.Title>
              <div>06:00</div>
              <div>07:00</div>
              <div>08:00</div>
            </Style.Detail>
            <Style.Detail>
              <Style.Title>往 龍潭</Style.Title>
              <div>06:00</div>
              <div>07:00</div>
              <div>08:00</div>
            </Style.Detail>
          </Style.InfoContainer>
        </Style.Content>
      </Style.Container>
    </Style.BackGround>
  );
};

export default Timetable;

Timetable.propTypes = {};
