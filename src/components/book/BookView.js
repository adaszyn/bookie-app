import React, { Component } from "react";
import { Grid, Breadcrumb, Header } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { BookCard } from "../book-card/BookCard";
import { NoteCard } from "../note-card/NoteCard";
import { Link } from "react-router-dom";

@observer
export class BookView extends Component {
  componentWillReceiveProps(newProps) {
    const bookId = this.props.match.params.id;
    const newBookId = newProps.match.params.id;
    if (bookId !== newBookId) {
      newProps.fetchBookById(newBookId);
    }
  }
  componentDidMount() {
    this.props.getAllNotes();
    this.props.fetchBookById(this.props.match.params.id);
  }
  render() {
    const book = this.props.books.get(this.props.match.params.id);
    if (this.props.bookFetchError) {
      return <p>{this.props.bookFetchError}</p>;        
    }
    if (!book) {
      return <p>Book loading</p>;
    }
    return (
      <Grid>
        <Grid.Row>
          <Breadcrumb>
            <Breadcrumb.Section>Home</Breadcrumb.Section>
            <Breadcrumb.Divider> > </Breadcrumb.Divider>
            <div className="active section">Book {book.id} </div>
          </Breadcrumb>
        </Grid.Row>

        <Grid.Column computer={5}>
          <BookCard key={this.props.match.params.id} thumbnail={book.image} />
        </Grid.Column>
        <Grid.Column computer={9}>
          <Header as="h1">The Book </Header>
          <p>{book.fullDescription}</p>
        </Grid.Column>

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
    );
  }
}
export const BookViewContainer = inject(stores => {
  return {
    notes: stores.notesStore.notes,
    getAllNotes: stores.notesStore.getAllNotes,
    fetchBookById: stores.booksStore.fetchBookById,
    books: stores.booksStore.books,
    bookFetchError: stores.booksStore.bookFetchError,
  };
})(BookView);
