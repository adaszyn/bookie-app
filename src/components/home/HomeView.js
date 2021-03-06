import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Grid, Header, Divider, Message, Container } from "semantic-ui-react";
import "./HomeView.css";
import { BookCard } from "../book/BookCard";
import { NoteViewContainer } from "../notes/NoteCard";
import { Carousel } from "../util/Carousel";
import { DraggableTagsContainer } from "../tags/DraggableTags";

@observer
export class HomeView extends Component {
  state = {
    isTagDragging: false
  };
  componentDidMount() {
    this.props.getAllNotes();
  }

  getNumberOfNotesByBookId = bookId => {
    return this.props.notes.filter(note => note.bookId === bookId).length;
  };

  onTagsDragStateChange = isDragging => {
    if (this.state.isTagDragging !== isDragging) {
      this.setState({
        isTagDragging: isDragging
      });
    }
  };

  getCarouselStyle = () => {
    return {
      minHeight: "280px",
      display: "block",
      padding: "4px 11px",
      boxShadow: this.state.isTagDragging ? "3px 3px 5px 6px #ccc " : "0 0 0 0"
    };
  };

  hasSomeNotes = book =>
    this.props.notes.filter(note => note.bookId === book.isbn10).length !== 0;

  render() {
    const { notes } = this.props;
    if (!notes || notes.length === 0) {
      return (
        <Grid stretched textAlign="center">
          <Grid.Column>
            <Message size="massive"> Hi there! Welcome to Bookie</Message>
            <Container size="big">
              Bookie helps you create notes for your favorite books. To get
              started, search for a book in the search bar at the top of the
              page.
            </Container>
          </Grid.Column>
        </Grid>
      );
    }
    return (
      <div>
        <Header block as="h2">
          Recent Notes
        </Header>
        <Grid stackable>
          <Grid.Column>
            {notes.length > 0 ? (
              <DraggableTagsContainer
                onDragStateChange={isDragging =>
                  this.onTagsDragStateChange(isDragging)
                }
              />
            ) : null}
          </Grid.Column>
        </Grid>
        <Carousel
          style={this.getCarouselStyle()}
          items={this.props.notes}
          renderItem={note => (
            <Link to={"/notes/" + note.id} key={note.id}>
              <NoteViewContainer
                note={note}
                key={note.id}
                noteId={note.id}
                title={note.title}
                isFav={note.isFav}
                meta={note.dateModified}
                description={note.contentRaw}
                tags={note.tags}
              />
            </Link>
          )}
          itemKey={"id"}
          perPage={3}
        />
        <Divider />
        {!!this.props.books.length && (
          <Header block as="h2">
            My Books
          </Header>
        )}
        <Carousel
          style={{ minHeight: "280px", display: "block" }}
          items={this.props.books.filter(this.hasSomeNotes)}
          renderItem={book => (
            <BookCard
              key={book.id}
              bookId={book.isbn10}
              title={book.title}
              description={book.description}
              thumbnail={book.image}
              numberOfNotes={this.getNumberOfNotesByBookId(book.isbn10)}
              showDelete
            />
          )}
          itemKey={"id"}
          perPage={3}
        />
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
    books: stores.booksStore.booksList,
    allTags: stores.notesStore.allTags
  };
})(HomeView);
