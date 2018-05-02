import React, { Component } from "react";
import { Breadcrumb, Header, Button } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import RichTextEditor from "react-rte";
import {LoadingPlaceholder} from "../loading/LoadingPlaceholder";

@observer
export class NotesView extends Component {
  state = {
    note: RichTextEditor.createEmptyValue()
  };
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
  }
  componentWillReceiveProps({ note }) {
    if (note) {
      this.props.fetchBookById(note.bookId);
    }
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

  ifNoteReallyChanged = () => {
   if(this.props.note.content && this.props.note.content.trim() !== this.state.note.toString("markdown").trim()){
      return true;
    }
    return false;
  }


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
    const book = this.props.books.get(this.props.note.bookId);
    if (!book) {
      return <LoadingPlaceholder/>
    }
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section><Link to="/">Home</Link></Breadcrumb.Section>
          <Breadcrumb.Divider> > </Breadcrumb.Divider>
          <Breadcrumb.Section>
            <Link to={"/books/" + this.props.note.bookId}>
              {book.title}
            </Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider> > </Breadcrumb.Divider>
          <div className="active section">Note {this.props.note.id}</div>
        </Breadcrumb>
        <Header as="h1">Note {this.props.note.id}</Header>
        {this.renderNote(this.props.note)}
        <Button color="teal" disabled={!this.ifNoteReallyChanged()} onClick={this.onSubmit}>Save</Button>
        <Link to={"/books/" + this.props.note.bookId}><Button>Cancel</Button></Link>
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
    updateNote: stores.notesStore.updateNote,
    books: stores.booksStore.books,
    fetchBookById: stores.booksStore.fetchBookById
  };
})(NotesView);
