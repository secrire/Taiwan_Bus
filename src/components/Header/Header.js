/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Icon from "components/Icon";
import Menu from "images/menu.svg";

import * as Style from "./style";

const Header = (props) => {
  const { title } = props;

  return (
    <Style.Container>
      <Link to="/app/menu">
        <Icon
          src={Menu}
          alt="menu"
          style={{
            img: "20px",
            position: "fixed",
            top: "40px",
            left: "18px",
          }}
        />
      </Link>
      <Style.PageTitle>{title}</Style.PageTitle>
    </Style.Container>
  );
};

export default Header;

Header.propTypes = {};
