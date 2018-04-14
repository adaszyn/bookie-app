import React from "react";
import { Provider } from "mobx-react";
import { RoutesContainer } from "./routes";
import { BooksStore } from "./stores/books-store";
import { AuthStore } from "./stores/auth-store";
import "semantic-ui-css/semantic.min.css";
import {NotesStore} from './stores/notes-store'

const authStore = new AuthStore();
const booksStore = new BooksStore();
const notesStore = new NotesStore(authStore);
const stores = {booksStore, notesStore, authStore};

export const App = () => (
  <Provider {...stores}>
    <RoutesContainer />
  </Provider>
);
