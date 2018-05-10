import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { HomeViewContainer } from "./components/home/HomeView";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import { LoginFormContainer } from "./components/login/LoginForm";
import DevTools from "mobx-react-devtools";
import { SignUpFormContainer } from "./components/signup/SignUpForm";
import { NotFound } from "./components/not-found/NotFound";
import { NotesViewContainer } from "./components/notes/NotesView";
import { BookViewContainer } from "./components/book/BookView";
import { NoteCreateViewContainer } from "./components/note-create/NoteCreateView";
import { SemanticToastContainer } from 'react-semantic-toasts';
import { AboutContainer } from "./components/about/About";
import {SearchViewContainer} from "./components/search/SearchView";
import {AllNotesViewContainer} from "./components/notes/AllNotesView";

@observer
export class Routes extends Component {
  render() {
    const logOut = this.props.logOut;
    return (
      <div>
        {process.env.NODE_ENV === "development" ? <DevTools /> : null}
        <BrowserRouter>
          <Fragment>
              <SemanticToastContainer />
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
              <PrivateRoute
                authed={this.props.isLoggedIn}
                exact
                logOut={logOut}
                path="/"
                component={HomeViewContainer}
              />
              <PrivateRoute
                authed={this.props.isLoggedIn}
                exact
                logOut={logOut}
                path="/notes"
                component={AllNotesViewContainer}
              />
              <PrivateRoute
                authed={this.props.isLoggedIn}
                exact
                logOut={logOut}
                path="/notes/:id"
                component={NotesViewContainer}
              />
              <PrivateRoute
                authed={this.props.isLoggedIn}
                exact
                logOut={logOut}
                path="/books/:id/create"
                component={NoteCreateViewContainer}
              />
              <PrivateRoute
                authed={this.props.isLoggedIn}
                exact
                logOut={logOut}
                path="/books/:id"
                component={BookViewContainer}
              />
              <PrivateRoute
                authed={this.props.isLoggedIn}
                exact
                logOut={logOut}
                path="/about"
                component={AboutContainer}
              />
              <PrivateRoute
                authed={this.props.isLoggedIn}
                exact
                logOut={logOut}
                path="/search"
                component={SearchViewContainer}
              />

              <PrivateRoute
                logOut={logOut}
                authed={this.props.isLoggedIn}
                path="*"
                component={NotFound}
              />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export const RoutesContainer = inject(stores => {
  return {
    isLoggedIn: stores.authStore.isLoggedIn,
    logOut: stores.authStore.logOut
  };
})(Routes);
