import { action, observable } from "mobx";
import { debounce } from "underscore";
import { searchGoogleBooks } from "../services/books-search-service";

export class BooksStore {
  @observable header = "Hello";
  @observable searchPhrase = "";
  @observable books = new Map([]);
  @observable searchResults = [];
  @observable isSearching = false;

  @action
  setSearchPhrase(phrase) {
    this.searchPhrase = phrase;
    this.isSearching = true;
    this.searchBooksDebounced(phrase);
  }
  searchBooksDebounced = debounce(this.searchBooks, 500)
  @action
  searchBooks (phrase) {
    searchGoogleBooks(phrase).then(results => {
        this.isSearching = false;
        this.searchResults = results;
      });
  }
  @action
  addBook(book) {
    this.books.set(book.id, book);
  }
  @action
  setHeader(header) {
    this.header = header;
  }
}
