/* eslint-disable react/prop-types */
import React, { lazy, Suspense, useEffect, useState } from "react";
import {  HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { useUserStore } from '@/store/userStroe';
// import useAxios from "@/hooks/useAxios";
// import TopBar from "@/components/compos/TopBar";


import { Container } from "./style";
// import "./style.css";

const Menu = lazy(() => import("containers/Menu" /* webpackChunkName:"Menu" */));
const Live = lazy(() => import("containers/Live" /* webpackChunkName:"Live" */));
// const Menu = lazy(() => import("containers/Menu" /* webpackChunkName:"Menu" */));
const Timetable = lazy(() => import("containers/Timetable" /* webpackChunkName:"Timetable" */));
// const Menu = lazy(() => import("containers/Menu" /* webpackChunkName:"Menu" */));



const App = ({ history }) => {
  // const { setUserData } = useUserStore();

  useEffect(() => {
  }, []);

  return (
    <Container>
      <Suspense fallback={<div>Module loading....</div>}>
        <Switch>
          <Route path="/app/menu" component={Menu} />
          <Route path="/app/live" component={Live} />
          <Route path="/app/stop" component={Live} />
          <Route path="/app/timetable" component={Timetable} />
          <Route path="/app/collection" component={Live} />
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
