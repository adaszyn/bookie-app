import React from "react";
import { Provider } from "mobx-react";
import { RoutesContainer } from "./routes";
import { BooksStore } from "./stores/books-store";
import { AuthStore } from "./stores/auth-store";
import "semantic-ui-css/semantic.min.css";

const booksStore = new BooksStore();
const authStore = new AuthStore();

export const App = () => (
  <Provider booksStore={booksStore} authStore={authStore}>
    <RoutesContainer />
  </Provider>
);
