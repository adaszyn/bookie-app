import React, { Component } from "react";
import {
  Breadcrumb,
  Header,
  Icon,
  Menu,
  Popup,
  Card,
  Dropdown, Responsive, Accordion,
} from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { FilterByTags } from "../tags/FilterByTags";
import { NoteListItem } from "./NoteListItem";
import {NoteTileItem} from "./NoteTileItem";

@observer
export class AllNotesView extends Component {
  state = {
    sortedBy: "updated",
    order: "ascending",
    filterByTags: [],
    noteViewType: 'list',
    optionsVisible: false,
  };
  componentDidMount() {
    this.props.getAllNotes();
  }
  sortNotes(notes) {
    const reversed = this.state.order === "ascending" ? 1 : -1;
    if (this.state.sortedBy === "updated") {
      return notes.sort((note1, note2) => {
        return (
          (new Date(note1.dateModified) - new Date(note2.dateModified)) *
          reversed
        );
      });
    } else {
      return notes.sort((note1, note2) => {
        return (
          (new Date(note1.dateCreated) - new Date(note2.dateCreated)) * reversed
        );
      });
    }
  }
  handleSort(column) {
    const currentOrder = this.state.order;
    const reversedOrder =
      currentOrder === "ascending" ? "descending" : "ascending";
    this.setState({
      sortedBy: column,
      order: column === this.state.sortedBy ? reversedOrder : currentOrder,
    });
  }
  onTagsFilterChanged = filter => {
    this.setState({
      filterByTags: filter,
    });
  };
  toggleFav = () => {
    this.setState({
      showOnlyFav: !this.state.showOnlyFav,
    });
  };
  changeToListView = () => {
    this.setState({
      noteViewType: "list"
    })
  }
  changeToTileView = () => {
    this.setState({
      noteViewType: "tile"
    })
  }
  renderFilters() {
    const { allTags } = this.props;
    return (
      <React.Fragment>
        <Menu.Item>
          <Dropdown
            renderLabel={this.renderLabel}
            value={this.state.sortedBy}
            options={[
              { text: "Creation Date", value: "created" },
              { text: "Modification Date", value: "updated" },
            ]}
            onChange={(_, { value }) => {
              this.setState({ sortedBy: value });
            }}
            floated="right"
            size="tiny"
            placeholder="Filter by tags"
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            renderLabel={this.renderLabel}
            value={this.state.order}
            options={[
              { text: "Oldest", value: "ascending" },
              { text: "Newest", value: "descending" },
            ]}
            onChange={(_, { value }) => {
              this.setState({ order: value });
            }}
            floated="right"
            size="tiny"
            placeholder="Filter by tags"
          />
        </Menu.Item>
        <FilterByTags
          onChange={filter => this.onTagsFilterChanged(filter)}
          tags={allTags}
        />
        <Popup
          trigger={
            <Menu.Item
              active={this.state.showOnlyFav}
              onClick={this.toggleFav}
            >
              <Icon
                name="heart"
                color={this.state.showOnlyFav ? "red" : "grey"}
              />
            </Menu.Item>
          }
          content="Show only Favorite notes"
        />
        <Menu.Item
          name="th-btn"
          active={this.state.noteViewType === "tile"}
          onClick={this.changeToTileView}
        >
          <Icon className="th" />
        </Menu.Item>
        <Menu.Item
          name="list-btn"
          active={this.state.noteViewType === "list"}
          onClick={this.changeToListView}
        >
          <Icon name="list" />
        </Menu.Item>
      </React.Fragment>
    );
  }
  renderNoteList = () => {
    const { filterByTags } = this.state;
    const { notesWithBook } = this.props;
    let filteredNotes = notesWithBook;
    if (this.state.showOnlyFav) {
      filteredNotes = filteredNotes.filter(note => note.isFav);
    }
    if (filterByTags.length > 0) {
      filteredNotes = filteredNotes.filter(note => {
        return filterByTags.some(filter => {
          return note.tags.indexOf(filter) > -1;
        });
      });
    }
    return <Card.Group centered>
      {this.sortNotes(filteredNotes)
        .map(this.renderNote)}
    </Card.Group>

  }
  renderNote = (note) => {
    if (this.state.noteViewType === "list") {
      return NoteListItem(note);
    }
    return NoteTileItem(note);
  }
  render() {
    const { optionsVisible } = this.state;
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section>
            <Link to="/">Home</Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider> > </Breadcrumb.Divider>
          <Breadcrumb.Section>All notes</Breadcrumb.Section>
        </Breadcrumb>

        <Header block as="h2">
          Your notes
            <Responsive as={Menu} size="tiny" floated="right" stackable minWidth={720}>
              {this.renderFilters()}
            </Responsive>
        </Header>
        <Responsive as={Menu} stackable maxWidth={720}>
          <Accordion>
            <Accordion.Title active={optionsVisible} index={0} onClick={() => this.setState({optionsVisible: !optionsVisible})}>
              <Icon name='dropdown' />
              Filters and Options
            </Accordion.Title>
            <Accordion.Content active={optionsVisible}>
              {this.renderFilters()}
            </Accordion.Content>
          </Accordion>
        </Responsive>
        {this.renderNoteList()}
      </div>
    );
  }
}
export const AllNotesViewContainer = inject(stores => {
  return {
    notes: stores.notesStore.notes,
    loading: stores.notesStore.loading,
    getAllNotes: stores.notesStore.getAllNotes,
    allTags: stores.notesStore.allTags,
    notesWithBook: stores.notesStore.notesWithBook,
  };
})(AllNotesView);
