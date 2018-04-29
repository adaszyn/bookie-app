import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {Breadcrumb, Button} from "semantic-ui-react";
import RichTextEditor from "react-rte";
import {Link} from "react-router-dom";

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
      const bookId = this.props.match.params.id;
      const book = this.props.books.get(bookId);
      return (
      <div>
          <Breadcrumb>
              <Breadcrumb.Section><Link to="/">Home</Link></Breadcrumb.Section>
              <Breadcrumb.Divider> > </Breadcrumb.Divider>
              <Breadcrumb.Section>
                  <Link to={"/books/" + bookId}>
                      {book.title}
                  </Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider> > </Breadcrumb.Divider>
              <div className="active section">Create new note</div>
          </Breadcrumb>
        <RichTextEditor value={this.state.note} onChange={this.onNoteChange} />
        <Button onClick={this.onSubmit}>Save</Button>
      </div>
    );
  }
}
export const NoteCreateViewContainer = inject(stores => {
  return {
    saveNote: stores.notesStore.saveNote,
    books: stores.booksStore.books,
  };
})(NoteCreateView);
