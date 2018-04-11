import React from "react";
import { Provider } from "mobx-react";
import { Routes } from "./routes";
import { BooksStore } from './stores/books-store';

const booksStore = new BooksStore();
export const App = () => (
  <Provider booksStore={booksStore}>
    <Routes />
  </Provider>
);
