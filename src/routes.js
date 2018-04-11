import React, { Fragment } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { HomeViewContainer } from "./components/home/HomeView";
import { About } from "./components/about/About.js";

export const Routes = props => (
  <BrowserRouter>
    <Fragment>
      <Route exact path="/" component={HomeViewContainer} />
      <Route path="/about" component={About} />
    </Fragment>
  </BrowserRouter>
);
