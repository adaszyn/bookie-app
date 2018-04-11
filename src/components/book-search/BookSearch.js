import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import { inject } from "mobx-react";
import "./BookSearch.css";

export class BookSearch extends Component {
  state = {};
  render() {
    return (
      <Search
        className="centered-search"
        value={this.props.searchPhrase}
        onSearchChange={this.props.onSearchChange}
        loading={this.props.loading}
        results={this.props.results}
      />
    );
  }
}

export const BookSearchContainer = inject(stores => ({
  searchPhrase: stores.booksStore.searchPhrase,
  onSearchChange: ({ target: { value } }) =>
    stores.booksStore.setSearchPhrase(value),
  loading: stores.booksStore.isSearching,
  results: stores.booksStore.searchResults
}))(BookSearch);
