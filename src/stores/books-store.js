import { action, observable } from "mobx";
import { searchBooks } from "../services/books-search-service";
import debounce from 'debounce-promise';

const searchBooksDebounced = debounce(searchBooks, 500)
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
    searchBooksDebounced(phrase).then(results => {
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
