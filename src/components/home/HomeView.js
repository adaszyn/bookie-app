import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Grid, Header } from "semantic-ui-react";
import "./HomeView.css";
import { BookCard } from "../book-card/BookCard";
import { NoteCard } from "../note-card/NoteCard";
import sampleBooks from "./sample-books.json";

@observer
export class HomeView extends Component {
  componentDidMount() {
    this.props.getAllNotes();
  }
  render() {
    return (
      <div>
        <Header as="h1">Recent Notes</Header>
        <Grid>
          {this.props.notes.map(note => (
            <Grid.Column computer={5} key={note.id}>
              <Link to={"/notes/" + note.id} key={note.id}>
                <NoteCard
                  key={note.id}
                  title={note.bookId}
                  meta={note.date_modified}
                  description={note.content}
                />
              </Link>
            </Grid.Column>
          ))}
        </Grid>
        <Header as="h1">All Books</Header>
        <Grid>
          {sampleBooks.items.map(book => (
            <Grid.Column computer={5} key={book.id}>
              <Link to={"/books/" + book.id} key={book.id}>
                <BookCard
                  key={book.id}
                  title={book.volumeInfo.title}
                  description={book.volumeInfo.title}
                  thumbnail={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : null
                  }
                />
              </Link>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    );
  }
}
export const HomeViewContainer = inject(stores => {
  return {
    notes: stores.notesStore.notes,
    getAllNotes: stores.notesStore.getAllNotes,
  };
})(HomeView);
