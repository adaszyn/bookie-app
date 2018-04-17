import React, { Component } from "react";
import { Grid, Breadcrumb, Header } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { BookCard } from "../book-card/BookCard";
import { NoteCard } from "../note-card/NoteCard";
import { Link } from "react-router-dom";

@observer
export class BookView extends Component {
  componentDidMount() {
    this.props.getAllNotes();
  }
  render() {
    return (
      <Grid>
        <Grid.Row><Breadcrumb>
          <Breadcrumb.Section>Home</Breadcrumb.Section>
          <Breadcrumb.Divider> > </Breadcrumb.Divider>
          <div class="active section">Book {this.props.match.params.id} </div>
        </Breadcrumb></Grid.Row>

        <Grid.Column computer={5}><BookCard key={this.props.match.params.id}
          thumbnail="http://books.google.com/books/content?id=4WwdMJKXzhEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        /></Grid.Column>
        <Grid.Column computer={9}><Header as="h1">The Book </Header>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </p></Grid.Column>

        {this.props.notes.map(note => (
           <Grid.Column computer={5} key={note.id}>
              <Link to={"/notes/"+note.id} key={note.id}><NoteCard key={note.id}
                title={note.bookId}
                meta={note.date_modified}
                description={note.content}
              /></Link>
          </Grid.Column>
        ))}
      </Grid>
    );
  }
}
export const BookViewContainer = inject(stores => {
  return {
    store: stores.booksStore,
    notes: stores.notesStore.notes,
    getAllNotes: stores.notesStore.getAllNotes,
    logOut: stores.authStore.logOut
  };
})(BookView);
