/* eslint-disable react/prop-types */
import React, { lazy, Suspense, useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

// import { useUserStore } from '@/stores/userStroe';
// import useAxios from "@/hooks/useAxios";

import { Container } from "./style";
// import "./style.css";

const Menu = lazy(() =>
  import("containers/Menu" /* webpackChunkName:"Menu" */)
);
const SearchPage = lazy(() =>
  import("containers/SearchPage" /* webpackChunkName:"Live" */)
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
  // const { setUserData } = useUserStore();

  useEffect(() => {}, []);

  return (
    <Container>
      <Suspense fallback={<div>Loading....</div>}>
        <Switch>
          <Route path="/app/menu" component={Menu} />
          <Route path="/app/live" component={SearchPage} />
          <Route path="/app/liveInfo" component={LiveInfo} />
          <Route path="/app/stop" component={SearchPage} />
          <Route path="/app/timetable" component={SearchPage} />
          <Route path="/app/collection" component={Collection} />
          <Route path="/app/stopDetail" component={StopDetail} />
        </Switch>
      </Suspense>
    </Container>
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
