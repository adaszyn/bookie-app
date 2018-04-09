import React, { Fragment } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { App } from "./components/app/App.js";
import { About } from "./components/about/About.js";

export const Routes = props => (
  <BrowserRouter>
    <Fragment>
      <Route exact path="/" component={App} />
      <Route path="/about" component={About} />
    </Fragment>
  </BrowserRouter>
);
