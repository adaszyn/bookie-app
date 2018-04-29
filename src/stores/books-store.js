import { action, observable, observe , computed} from "mobx";
import { debounce, omit } from "underscore";
import {
  searchGoogleBooks,
  searchBookByID
} from "../services/books-search-service";

export class BooksStore {
  @observable header = "Hello";
  @observable searchPhrase = "";
  @observable books = new Map([]);
  @observable searchResults = [];
  @observable isSearching = false;

  @observable bookFetchError = null;

  constructor(notesStore) {
    this.notesStore = notesStore;
    observe(this.notesStore, "bookIds", ({ newValue }) => {
      newValue.forEach(this.fetchBookById);
    });
  }

  @computed
  get booksList () {
      return Array.from(this.books.values())
  }

  @action
  setSearchPhrase(phrase) {
    this.searchPhrase = phrase;
    this.isSearching = true;
    this.searchBooksDebounced(phrase);
  }
  searchBooksDebounced = debounce(this.searchBooks, 500);
  @action
  searchBooks(phrase) {
    searchGoogleBooks(phrase).then(results => {
      this.isSearching = false;
      this.searchResults = results.map(result =>
        ({...omit(result, "fullDescription"), key: result.isbn10})
      );
    });
  }
  @action
  addBook(book) {
    this.books.set(book.isbn10, book);
  }
  @action
  setHeader(header) {
    this.header = header;
  }
  @action
  fetchBookById = id => {
    if (this.books.has(id)) return;
    searchBookByID(id)
      .then(this.searchBookSuccess)
      .catch(this.searchBookFail);
  };
  searchBookSuccess = book => {
    if (!book) {
      this.bookFetchError = "No book found";
    }
    this.books.set(book.isbn10, book);
  };
  @action
  searchBookFail = error => {
    this.bookFetchError = "Server error";
    console.error(error);
  };
}
