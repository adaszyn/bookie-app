import React, { Component } from "react";
import {Breadcrumb, Header, Icon, Table} from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

const CHAR_LIMIT = 14;

@observer
export class AllNotesView extends Component {
  state = {
    sortedBy: 'updated',
    order: 'ascending'
  }
  componentDidMount() {
    this.props.getAllNotes();
  }
  sortNotes(notes) {
    const reversed = this.state.order === 'ascending' ? 1 : -1
    if (this.state.sortedBy === 'updated') {
      return notes.sort((note1, note2) => {
        return (new Date(note1.dateModified) - new Date(note2.dateModified)) * reversed;
      })
    } else {
      return notes.sort((note1, note2) => {
        return (new Date(note1.dateCreated) - new Date(note2.dateCreated)) * reversed;
      })
    }
  }
  handleSort (column) {
    const currentOrder = this.state.order;
    const reversedOrder = currentOrder === "ascending" ? "descending" : "ascending"
    this.setState({
      sortedBy: column,
      order: column === this.state.sortedBy ? reversedOrder : currentOrder,
    })
  }
  renderRow(note) {
    const { title, content, dateCreated, isFav, dateModified } = note;
    return (
      <Table.Row key={note.id}>
        <Table.Cell>
          <Icon name="heart" color={isFav ? "red" : "grey"} style={{marginRight: "10px"}}/>
          <Link to={`/notes/${note.id}`}>
            {title.substr(0, CHAR_LIMIT)} {title.length > CHAR_LIMIT && "..."}
          </Link>
        </Table.Cell>
        <Table.Cell>{content.substr(0, CHAR_LIMIT)}{content.length > CHAR_LIMIT && "..."}</Table.Cell>
        <Table.Cell>{dateFormat(dateCreated, "dddd, mmmm dS")}</Table.Cell>
        <Table.Cell>{dateFormat(dateModified, "dddd, mmmm dS")}</Table.Cell>
      </Table.Row>
    )
  }
  render() {
    const { sortedBy, order } = this.state;
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section><Link to="/">Home</Link></Breadcrumb.Section>
          <Breadcrumb.Divider> > </Breadcrumb.Divider>
          <Breadcrumb.Section>All notes</Breadcrumb.Section>

        </Breadcrumb>
        <Header as="h1">Your notes</Header>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>

              <Table.HeaderCell
              >
                Title
              </Table.HeaderCell>
              <Table.HeaderCell>
                Content
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortedBy === 'created' ? order : null}
                onClick={() => this.handleSort('created')}
              >
                Created
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortedBy === 'updated' ? order : null}
                onClick={() => this.handleSort('updated')}
              >
                Updated
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.sortNotes(this.props.notes).map(this.renderRow)}
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
  };
})(AllNotesView);
