import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

@observer
export class NotesView extends Component {
  componentDidMount() {
      console.log('getting notes')
    this.props.getAllNotes();
  }
  renderNote(note) {
    return <li key={note.id}>{note.content}</li>;
  }
  render() {
      console.log(this.props.notes)
    return (
      <div>
        <Header as="h1">Notes view!</Header>
        <ul>{this.props.notes.map(this.renderNote)}</ul>
      </div>
    );
  }
}
export const NotesViewContainer = inject(stores => {
  return {
    getAllNotes: stores.notesStore.getAllNotes,
    notes: stores.notesStore.notes,
    errorMessage: stores.notesStore.notesFetchError,
    loading: stores.notesStore.loading
  };
})(NotesView);
