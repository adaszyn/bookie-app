import React from "react";
import { Route, Redirect } from "react-router-dom";
import {DashboardWrapper} from '../dashboard/DashboardWrapper';

export const PrivateRoute = ({
  component: Component,
  authed,
  logOut,
  ...rest
}) => (
  <DashboardWrapper logOut={logOut}>
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  </DashboardWrapper>
);
