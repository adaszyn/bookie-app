import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import { HomeViewContainer } from "./components/home/HomeView";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import { LoginFormContainer } from "./components/login/LoginForm";
import DevTools from "mobx-react-devtools";

@observer
export class Routes extends Component {
  render() {
    return (
      <div>
        <DevTools />
        <BrowserRouter>
          <Fragment>
            <Route
              exact
              path="/login"
              render={() =>
                this.props.isLoggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <LoginFormContainer />
                )
              }
            />
            <PrivateRoute
              authed={this.props.isLoggedIn}
              exact
              path="/"
              component={HomeViewContainer}
            />
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}
export const RoutesContainer = inject(stores => {
  return {
    isLoggedIn: stores.authStore.isLoggedIn
  };
})(Routes);
