import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

@observer
export class NotesView extends Component {
  render() {
    return (
      <div>
        <Header as="h1">Notes view!</Header>
      </div>
    );
  }
}
export const NotesViewContainer = inject(stores => {
  return {
    store: stores.booksStore,
  };
})(NotesView);
