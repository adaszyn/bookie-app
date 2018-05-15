import React, { Component } from "react";
import {
  Breadcrumb,
  Header,
  Icon,
  Menu,
  Popup,
  Table, 
  Label
} from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { FilterByTags } from "../filter-by-tags/FilterByTags";
import { TagBubble } from "../tags/TagBubble";
import { getTagColor } from "../../util/tags.util";

const CHAR_LIMIT = 14;

@observer
export class AllNotesView extends Component {
  state = {
    sortedBy: "updated",
    order: "ascending",
    filterByTags: []
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
      order: column === this.state.sortedBy ? reversedOrder : currentOrder
    });
  }
  static renderRow(note) {
    const { title, content, dateCreated, isFav, dateModified, tags } = note;
    return (
      <Table.Row key={note.id}>
        <Table.Cell>
          <Icon
            name="heart"
            color={isFav ? "red" : "grey"}
            style={{ marginRight: "10px" }}
          />
          <Link to={`/notes/${note.id}`}>
            {title.substr(0, CHAR_LIMIT)} {title.length > CHAR_LIMIT && "..."}
          </Link>
        </Table.Cell>
        <Table.Cell>
          {content.substr(0, CHAR_LIMIT)}
          {content.length > CHAR_LIMIT && "..."}
        </Table.Cell>
        <Table.Cell width={3}>{dateFormat(dateCreated, "mmmm dS 'yy")}</Table.Cell>
        <Table.Cell width={3}>{dateFormat(dateModified, "mmmm dS 'yy")}</Table.Cell>
        <Table.Cell width={2} style={{ padding: 5 }}>
          {tags.split(",").map(tag => <Label style={{margin: 5}} size="mini" key={tag} color={getTagColor(tag)}>{tag} </Label>)}
        </Table.Cell>
      </Table.Row>
    );
  }
  onTagsFilterChanged = filter => {
    this.setState({
      filterByTags: filter
    });
  };
  toggleFav = () => {
    this.setState({
      showOnlyFav: !this.state.showOnlyFav
    });
  };
  render() {
    const { sortedBy, order, filterByTags } = this.state;
    const { allTags, notes } = this.props;
    let filteredNotes = notes;
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
          <Menu size="tiny" floated="right" stackable>
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
                  <Icon name="heart" />
                </Menu.Item>
              }
              content="Show only Favorite notes"
            />
          </Menu>
        </Header>

        <Table sortable celled fixed selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Content</Table.HeaderCell>
              <Table.HeaderCell
                width={3}
                sorted={sortedBy === "created" ? order : null}
                onClick={() => this.handleSort("created")}
              >
                Created
              </Table.HeaderCell>
              <Table.HeaderCell
                width={3}
                sorted={sortedBy === "updated" ? order : null}
                onClick={() => this.handleSort("updated")}
              >
                Updated
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>Tags</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.sortNotes(filteredNotes).map(AllNotesView.renderRow)}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
export const AllNotesViewContainer = inject(stores => {
  return {
    notes: stores.notesStore.notes,
    loading: stores.notesStore.loading,
    getAllNotes: stores.notesStore.getAllNotes,
    allTags: stores.notesStore.allTags
  };
})(AllNotesView);
