import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Grid, Header , Divider} from "semantic-ui-react";
import "./HomeView.css";
import { BookCard } from "../book-card/BookCard";
import { NoteCard } from "../note-card/NoteCard";
import sampleBooks from "./sample-books.json";
import { Carousel } from "../carousel/Carousel";

@observer
export class HomeView extends Component {
  componentDidMount() {
    this.props.getAllNotes();
  }
  render() {
    return (
      <div>
        <Header as="h1">Recent Notes</Header>
        <Divider />
        <Carousel
        style={{minHeight: "220px"}}
          items={this.props.notes}
          renderItem={note => (
            <Link to={"/notes/" + note.id} key={note.id}>
              <NoteCard
                key={note.id}
                title={note.bookId}
                isFav={note.isFav}
                meta={note.date_modified}
                description={note.content}
                tags={"tag1,tag2,tag3"}
              />
            </Link>
          )}
          itemKey={"id"}
          perPage={3}
        />
        <Divider />
        <Header as="h1">All Books</Header>
        <Grid>
          {sampleBooks.items.map(book => (
            <Grid.Column computer={5} key={book.id}>
                <BookCard
                  key={book.id}
                  bookId={book.id}
                  title={book.volumeInfo.title}
                  description={
                    book.volumeInfo.description
                      ? book.volumeInfo.description
                      : null
                  }
                  thumbnail={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : null
                  }
                  numberOfNotes={5}
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
    getAllNotes: stores.notesStore.getAllNotes
  };
})(HomeView);
