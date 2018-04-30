import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Grid, Header , Divider, Icon, Message, Container} from "semantic-ui-react";
import "./HomeView.css";
import { BookCard } from "../book-card/BookCard";
import { NoteViewContainer } from "../note-card/NoteCard";
import { Carousel } from "../carousel/Carousel";

@observer
export class HomeView extends Component {
  componentDidMount() {
    this.props.getAllNotes();
  }
  
  getNumberOfNotesByBookId = bookId => {
    return this.props.notes.filter( note => note.bookId === bookId).length;
  }

  render() {
    if(this.props.notes.size === 0 || typeof this.props.notes.size === 'undefined') {
      return (
        <Grid stretched textAlign="center">
          <Grid.Column>
            <Message size="massive"> Hi there! Welcome to Bookie</Message>
            <Container size="big"> 
              Bookie helps you create notes for your favorite books. 
              To get started, search for a book in the search bar at the top of the page.
            </Container>
          </Grid.Column> 
        </Grid>
      );
    }
    return (
      <div>
        <Header block as="h2">Recent Notes</Header>
        <Carousel
          style={{minHeight: "280px", display:"block"}}
          items={this.props.notes}
          renderItem={note => (
              <Link to={"/notes/" + note.id} key={note.id}>
                <NoteViewContainer
                  key={note.id}
                  noteId={note.id}
                  title={note.title}
                  isFav={note.isFav}
                  meta={note.dateModified}
                  description={note.content}
                  tags={note.tags}
                />
              </Link>
          )}
          itemKey={"id"}
          perPage={3}
        />
        <Divider />
          {!!this.props.books.length && <Header block as="h2">All Books</Header>}
        <Grid stackable>
          {this.props.books.map(book => (
            <Grid.Column computer={5} key={book.id}>
                <BookCard
                  key={book.id}
                  bookId={book.isbn10}
                  title={book.title}
                  description={book.description}
                  thumbnail={book.image}
                  numberOfNotes={this.getNumberOfNotesByBookId(book.isbn10)}
                  showDelete
                />
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
    updateNote: stores.notesStore.updateNote,
    deleteNote: stores.notesStore.deleteNote,
    books: stores.booksStore.booksList
  };
})(HomeView);