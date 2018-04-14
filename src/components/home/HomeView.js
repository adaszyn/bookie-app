import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Header } from "semantic-ui-react";
import "./HomeView.css";
import { BookCard } from "../book-card/BookCard";
import sampleBooks from "./sample-books.json";

@observer
export class HomeView extends Component {
  render() {
    return (
      <div>
        <Header as="h1">Welcome to Bookie App!</Header>
        <Link to="/notes">Notes</Link>
        {sampleBooks.items.map(book => (
          <BookCard
            title={book.volumeInfo.title}
            description={book.volumeInfo.title}
            thumbnail={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null}
          />
        ))}
      </div>
    );
  }
}
export const HomeViewContainer = inject(stores => {
  return {
    store: stores.booksStore,
    logOut: stores.authStore.logOut
  };
})(HomeView);
