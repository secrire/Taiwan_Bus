import React, { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as Style from "./style";

const Home = (props) => {
  return (
    <>
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
      <div>Home test</div>
    </>
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
