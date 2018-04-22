import React, { Component } from "react";
import { Breadcrumb, Header, Button } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import RichTextEditor from "react-rte";

@observer
export class NotesView extends Component {
  state = {
    note: RichTextEditor.createEmptyValue()
  };
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
  }
  componentWillReceiveProps({ note }) {
    if (note.content !== this.props.note.content) {
      this.setState({
        note: RichTextEditor.createValueFromString(note.content, "markdown")
      });
    }
  }
  onNoteChange = note => {
    this.setState({
      note
    });
  };
  onSubmit = () => {
    const noteId = this.props.match.params.id;
    this.props
      .updateNote(noteId, this.props.note.bookId, this.state.note.toString("markdown"), true)
  };
  renderNote(note) {
    return (
      <div key={note.id}>
        <p>{note.dateModified}</p>
        <RichTextEditor value={this.state.note} onChange={this.onNoteChange} />
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
          <div className="active section">Note {this.props.note.id}</div>
        </Breadcrumb>
        <Header as="h1">Note {this.props.note.id}</Header>
        {this.renderNote(this.props.note)}
        <Button onClick={this.onSubmit}>Save</Button>
      </div>
    );
  }
}
export const NotesViewContainer = inject(stores => {
  return {
    getNote: stores.notesStore.getNote,
    note: stores.notesStore.note,
    errorMessage: stores.notesStore.notesFetchError,
    loading: stores.notesStore.loading,
    updateNote: stores.notesStore.updateNote
  };
})(NotesView);
