import {observable, action} from "mobx";
import {searchGoogleBooks} from "../services/books-search-service";

const MAX_RESULTS = 15;

export class SearchStore {
  @observable searchPhrase = "";
  @observable searchError = "";
  @observable results = [];
  @observable loading = false;
  @observable hasMore = false;
  @observable language = 'EN';

  startIndex = 0;

  @action
  setSearchPhrase = (searchPhrase) => {
    this.searchPhrase = searchPhrase;
  }
  @action search = () => {
    this.loading = true;
    searchGoogleBooks(this.searchPhrase, {maxResults: MAX_RESULTS, startIndex: 0, langRestrict: this.language.toLowerCase()})
      .then(results => {
        this.startIndex = results.length;
        this.hasMore = results.length === MAX_RESULTS;
        this.results = results;
      })
      .then(() => this.loading = false)
      .catch(() => this.searchError = "Your search request failed")
  }
  @action loadMore = () => {
    if (this.loading) return;
    this.loading = true;
    searchGoogleBooks(this.searchPhrase, {maxResults: MAX_RESULTS, startIndex: this.startIndex, langRestrict: this.language.toLowerCase()})
      .then(results => {
        this.hasMore = results.length === MAX_RESULTS;
        this.startIndex += results.length;
        this.results = [...this.results, ...results];
      })
      .then(() => this.loading = false)
      .catch(() => this.searchError = "Your search request failed")
  }
  @action
  onLanguageChange = (language) => {
    this.language = language;
    this.search();
  }
}