import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Header } from "semantic-ui-react";
import "./HomeView.css";
import { BookCard } from "../book-card/BookCard";
import { NoteCard } from "../note-card/NoteCard";
import sampleBooks from "./sample-books.json";

@observer
export class HomeView extends Component {
  componentDidMount() {
      console.log('getting notes')
    this.props.getAllNotes();
  }
  render() {
    return (
      <div className="ui three column relaxed grid">
        <Header as="h1">Welcome to Bookie App!</Header>
        <div className="ui equal width row">
           {this.props.notes.map(note => (
            <Link to="/notes"><NoteCard key={note.id} className="padded column"
              title={note.bookId}
              meta={note.date_modified}
              description={note.content}
            /></Link>
        ))}</div>
        <div className="ui equal width row">
        {sampleBooks.items.map(book => (
          <BookCard key={book.id} className="padded column"
            title={book.volumeInfo.title}
            description={book.volumeInfo.title}
            thumbnail={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null}
          />
        ))}</div>
      </div>
    );
  }
}
export const HomeViewContainer = inject(stores => {
  return {
    store: stores.booksStore,
    notes: stores.notesStore.notes,
    getAllNotes: stores.notesStore.getAllNotes,
    logOut: stores.authStore.logOut
  };
})(HomeView);
