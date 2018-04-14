import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Header } from "semantic-ui-react";
import "./HomeView.css";

@observer
export class HomeView extends Component {
  render() {
    return (
      <div>
        <Header as="h1">Welcome to Bookie App!</Header>
        <Link to="/notes">Notes</Link>
      </div>
    );
  }
}
export const HomeViewContainer = inject(stores => {
  return {
    store: stores.booksStore,
    logOut: stores.authStore.logOut
  };
})(HomeView);
