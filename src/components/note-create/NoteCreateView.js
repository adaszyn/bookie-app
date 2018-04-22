import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button } from "semantic-ui-react";
import RichTextEditor from "react-rte";

@observer
export class NoteCreateView extends Component {
  state = {
    note: RichTextEditor.createEmptyValue()
  };
  onNoteChange = note => {
    this.setState({
      note
    });
  };
  onSubmit = () => {
    const bookId = this.props.match.params.id;
    this.props
      .saveNote(bookId, this.state.note.toString("markdown"), true)
      .then(() => this.props.history.push(`/books/${bookId}/`));
  };
  render() {
    return (
      <div>
        <RichTextEditor value={this.state.note} onChange={this.onNoteChange} />
        <Button onClick={this.onSubmit}>Save</Button>
      </div>
    );
  }
}
export const NoteCreateViewContainer = inject(stores => {
  return {
    saveNote: stores.notesStore.saveNote
  };
})(NoteCreateView);
