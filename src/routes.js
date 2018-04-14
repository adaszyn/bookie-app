import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { HomeViewContainer } from "./components/home/HomeView";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import { LoginFormContainer } from "./components/login/LoginForm";
import DevTools from "mobx-react-devtools";
import { SignUpFormContainer } from "./components/signup/SignUpForm";
import { NotFound } from "./components/not-found/NotFound";
import { DashboardWrapper } from "./components/dashboard/DashboardWrapper";
import { NotesViewContainer } from "./components/notes/NotesViewContainer";

@observer
export class Routes extends Component {
  render() {
    return (
      <div>
        {process.env.NODE_ENV === "development" ? <DevTools /> : null}
        <BrowserRouter>
          <Fragment>
            <Switch>
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
              <Route
                exact
                path="/signup"
                render={() =>
                  this.props.isLoggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <SignUpFormContainer />
                  )
                }
              />
              <DashboardWrapper>
                <PrivateRoute
                  authed={this.props.isLoggedIn}
                  exact
                  path="/"
                  component={HomeViewContainer}
                />
                <PrivateRoute
                  authed={this.props.isLoggedIn}
                  exact
                  path="/notes"
                  component={NotesViewContainer}
                />
              </DashboardWrapper>

              <Route path="*" component={NotFound} />
            </Switch>
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
