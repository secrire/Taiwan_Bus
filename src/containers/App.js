/* eslint-disable react/prop-types */
import React, { lazy, Suspense, useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

import Menu from "containers/Menu";

import * as Style from "./style";

const SearchPage = lazy(() =>
  import("containers/SearchPage" /* webpackChunkName:"SearchPage" */)
);
const LiveInfo = lazy(() =>
  import("containers/LiveInfo" /* webpackChunkName:"LiveInfo" */)
);
const Collection = lazy(() =>
  import("containers/Collection" /* webpackChunkName:"Collection" */)
);
const StopDetail = lazy(() =>
  import("containers/StopDetail" /* webpackChunkName:"StopDetail" */)
);

const App = ({ history }) => {
  return (
    <Style.MainContainer>
      <Style.Container>
        <Suspense fallback={<div>Loading....</div>}>
          <Switch>
            <Route path="/app/live" component={SearchPage} />
            <Route path="/app/liveInfo" component={LiveInfo} />
            <Route path="/app/timetable" component={SearchPage} />
            <Route path="/app/collection" component={Collection} />
            <Route path="/app/stopDetail" component={StopDetail} />
          </Switch>
        </Suspense>
      </Style.Container>
      <Menu />
    </Style.MainContainer>
  );
};

export default App;

App.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
  }),
};

App.defaultProps = {
  history: {},
};
