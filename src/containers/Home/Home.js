import React, { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from 'components/Icon';
import bus from 'images/bus-solid.svg';

import * as Style from "./style";

const Home = (props) => {
  return (
    <Style.Container>
      <nav>
        <ul>
          <li>
            <Link to="/app/live">Live</Link>
          </li>
          <li>
            <Link to="/app/stop">Stop</Link>
          </li>
          <li>
            <Link to="/app/timetable">Timetable</Link>
          </li>
          <Link to="/app/collection">Collection</Link>
        </ul>
      </nav>
{/* <Style.IconBox> */}
<Icon src={bus} alt="bus" iconContainerSize='60px' iconSize='36px' />
{/* </Style.IconBox> */}
      <Style.Footer>
        <div>2021</div>
      </Style.Footer>
    </Style.Container>
  );
};

export default Home;

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.object,
    }),
  }).isRequired,
};
