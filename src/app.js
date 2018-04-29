import React from "react";
import { Provider } from "mobx-react";
import { RoutesContainer } from "./routes";
import { BooksStore } from "./stores/books-store";
import { AuthStore } from "./stores/auth-store";
import "semantic-ui-css/semantic.min.css";
import { NotesStore } from "./stores/notes-store";
import store from "store";
import Axios from "axios";

const authStore = new AuthStore();
const notesStore = new NotesStore(authStore);
const booksStore = new BooksStore(notesStore);
const stores = { booksStore, notesStore, authStore };

Axios.interceptors.response.use(null, function(error) {
  if (error.response.status === 401) {
    store.remove("session-token");
    authStore.isLoggedIn = false;
    return Promise.resolve(error);
  }
  return Promise.reject(error);
});

export const App = () => (
  <Provider {...stores}>
    <RoutesContainer />
  </Provider>
);
