import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import { inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import "./BookSearch.css";
import {omit} from "lodash";

const ResultRenderer = (arg) => {
 const { image, title, description, type, id } = arg;
  if (type === "footer") {
    return <div className='content'>
      <div className='title'>SHOW MORE</div>
    </div>
  }
  return <div key={id}>
    <div className="image">
      <img alt="book" src={image}/>
    </div>
    <div key='content' className='content'>
      {title && <div className='title'>{title}</div>}
      {description && <div className='description'>{description}</div>}
    </div>
  </div>
}

export class BookSearch extends Component {
  state = {};
  onResultSelect = (_, value) => {
    if (value.result.type === "footer") {
      return this.props.history.push(`/search?q=${this.props.searchPhrase}`)
    }
    this.props.history.push(`/books/${value.result.isbn10}`)
  }
  render() {
    return (
      <Search
        className="centered-search"
        value={this.props.searchPhrase}
        onSearchChange={this.props.onSearchChange}
        loading={this.props.loading}
        results={this.props.results}
        resultRenderer={ResultRenderer}
        size="small"
        fluid
        onResultSelect={this.onResultSelect}
        aligned="left"
      />
    );
  }
}

export const BookSearchContainer = inject(stores => ({
  searchPhrase: stores.booksStore.searchPhrase,
  onSearchChange: ({ target: { value } }) =>
    stores.booksStore.setSearchPhrase(value),
  loading: stores.booksStore.isSearching,
  results: stores.booksStore.searchResults.map(result => omit(result, "otherIdentifier")).filter(result => result.isbn10)
}))(withRouter(BookSearch));
