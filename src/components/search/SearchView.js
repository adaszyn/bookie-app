import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {Grid, Input, Icon, Dimmer, Loader} from "semantic-ui-react";
import qs from "query-string";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroller";
import { SearchResult } from "../search-result/SearchResult";
import ReactFlagsSelect from "react-flags-select";
import 'react-flags-select/css/react-flags-select.css';

@observer
export class SearchView extends Component {
  constructor(props) {
    super(props);
    this.searchDebounced = debounce(props.search, 1000);
  }
  getNumberOfNotesByBookId = bookId => {
    return this.props.notes.filter( note => note.bookId === bookId).length;
  }
  componentDidMount () {
    const { q } = qs.parse(this.props.location.search);
    this.props.setSearchPhrase(q);
    this.props.search();
  }
  componentWillReceiveProps (newProps) {
    const oldQuery = qs.parse(this.props.location.search).q;
    const newQuery = qs.parse(newProps.location.search).q;
    if (newQuery !== oldQuery) {
      this.props.setSearchPhrase(newQuery);
      this.searchDebounced();
    }
  }

  onSearchInputChange = ({target: {value}}) => {
    this.props.history.replace(`/search?q=${value}`)
    this.props.setSearchPhrase(value);
    this.searchDebounced();
  }
  onSubmit = () => {
    this.props.search();
  }
  render() {
    const { searchPhrase, results, hasMore, onLanguageChange, loading } = this.props;
    return (
      <div>
        { this.props.loading ? "true" : "false"}
        <Input
          style={{width: "100%"}}
          value={searchPhrase}
          onChange={this.onSearchInputChange}
          icon={<Icon onClick={this.onSubmit} name='search' circular link />}
          placeholder='Search...'
        />
        <ReactFlagsSelect
          defaultCountry="GB"
          countries={["GB", "FR", "DE", "IT"]}
          onSelect={onLanguageChange}
          customLabels={{"GB": "EN","FR": "FR","DE": "DE","IT": "IT"}}
          placeholder="Select Language" />
        <Grid stackable>
          <Grid.Column>
          </Grid.Column>
        </Grid>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.loadMore}
          hasMore={hasMore}
          className="ui divided items"
          threshold={250}
          loader={this.props.loading && <div className="loader" key={0}>Loading ...</div>}
        >

          {results.map(result => <SearchResult key={result.id} {...result}/>)}

        </InfiniteScroll>
        {loading && <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>}
      </div>
    );
  }
}
export const SearchViewContainer = inject(stores => {
  const {
    searchPhrase, setSearchPhrase, search, results, loading, hasMore,loadMore, language, onLanguageChange } = stores.searchStore;
  return {
    searchPhrase,
    setSearchPhrase,
    search,
    results,
    loading,
    hasMore,
    loadMore,
    language,
    onLanguageChange,
  };
})(SearchView);