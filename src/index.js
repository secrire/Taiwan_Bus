import React, { useEffect, useState, lazy, Suspense } from "react";
import { render } from "react-dom";
import "antd/dist/antd.css";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import { BusContextProvider } from "./store/busStore";

const App = lazy(() => import("./containers/App" /* webpackChunkName:"App" */));
const Home = lazy(() =>
  import("./containers/Home" /* webpackChunkName:"Home" */)
);

const Main = (props) => {
  useEffect(() => {}, []);

  return (
    <Router>
      <BusContextProvider>
        <Suspense fallback={<div>Module loading....</div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/app" component={App} />
          </Switch>
        </Suspense>
      </BusContextProvider>
    </Router>
  );
};

render(<Main />, document.getElementById("app"));
