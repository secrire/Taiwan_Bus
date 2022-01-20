import React, { useEffect, useState, lazy, Suspense } from "react";
import { render } from "react-dom";
import "antd/dist/antd.css";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import { LanguageContextProvider } from "./store/languageStore";
import { BusContextProvider } from "./store/busStore";
import { LikedRouteContextProvider } from "./store/likedRouteStore";

const App = lazy(() => import("./containers/App" /* webpackChunkName:"App" */));
const Home = lazy(() =>
  import("./containers/Home" /* webpackChunkName:"Home" */)
);

const Main = (props) => {
  useEffect(() => {}, []);

  return (
    <Router>
      <LanguageContextProvider>
        <BusContextProvider>
          <LikedRouteContextProvider>
            <Suspense fallback={<div>Loading....</div>}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/app" component={App} />
              </Switch>
            </Suspense>
          </LikedRouteContextProvider>
        </BusContextProvider>
      </LanguageContextProvider>
    </Router>
  );
};

render(<Main />, document.getElementById("app"));
