import React from "react";
import { Provider } from "mobx-react";
import { RoutesContainer } from "./routes";
import { BooksStore } from "./stores/books-store";
import { AuthStore } from "./stores/auth-store";
import "semantic-ui-css/semantic.min.css";
import { NotesStore } from "./stores/notes-store";
import store from "store";
import Axios from "axios";
import {API_BASE} from './services/api-service';

const authStore = new AuthStore();
const notesStore = new NotesStore(authStore);
const booksStore = new BooksStore(notesStore);
const stores = { booksStore, notesStore, authStore };

Axios.interceptors.response.use(null, function(error) {
  const isLoginRequest =  error.request.responseURL === API_BASE + "/login";
  if (!isLoginRequest && error.response.status === 401) {
    store.remove("session-token");
    authStore.isLoggedIn = false;
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

export const App = () => (
  <Provider {...stores}>
    <RoutesContainer />
  </Provider>
);
