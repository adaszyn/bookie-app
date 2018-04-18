import React, { Component } from "react";
import { Breadcrumb, Header } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

@observer
export class NotesView extends Component {
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
  }
  renderNote(note) {
    return (
      <div key={note.id}>
        <p>{note.dateModified}</p>
        <p>{note.content}</p>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section>Home</Breadcrumb.Section>
          <Breadcrumb.Divider> > </Breadcrumb.Divider>
          <Breadcrumb.Section>
            Book {this.props.note.bookId}{" "}
          </Breadcrumb.Section>
          <Breadcrumb.Divider> > </Breadcrumb.Divider>
          <div class="active section">Note {this.props.note.id}</div>
        </Breadcrumb>
        <Header as="h1">Note {this.props.note.id}</Header>
        {this.renderNote(this.props.note)}
      </div>
    );
  }
}
export const NotesViewContainer = inject(stores => {
  return {
    getNote: stores.notesStore.getNote,
    note: stores.notesStore.note,
    errorMessage: stores.notesStore.notesFetchError,
    loading: stores.notesStore.loading
  };
})(NotesView);
