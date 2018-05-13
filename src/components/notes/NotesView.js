import React, { Component } from "react";
import { Breadcrumb, Button, Input, Grid, Popup, Icon } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { TagsEditor } from "../tags-editor/TagsEditor";
import { RTEContainer } from "../rte/RTEContainer"
import {LoadingPlaceholder} from "../loading/LoadingPlaceholder";

@observer
export class NotesView extends Component {
  state = {
    title: "",
    isFav: false,
    tags: [],
    editedNoteContent: '',
  };
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
  }
  componentWillReceiveProps({ note }) {
    if (note) {
      this.props.fetchBookById(note.bookId);
    }
    this.setState({
      editedNoteContent: note.content,
      title: note.title,
      isFav: note.isFav,
      tags: note.tags ? note.tags.split(',') : []
    });
  }
  onNoteChange = note => {
    this.setState({
      note,
      editedNoteContent: note,
    });
  };
  onTitleChange = e => {
    this.setState({
      'title': e.target.value
    });
  };
  onTagsChanged = (updatedTagsArray) => {
    this.setState({
      tags: updatedTagsArray
    })
  };
  onFavToggle = () => {
    this.setState({
      'isFav': !this.state.isFav
    })
  }
  ifNoteIsEmpty = () => {
    return this.state.title.trim() === '' || this.state.editedNoteContent.trim() === '';
  }
  onSubmit = () => {
    const noteId = this.props.match.params.id;
    const tagsCSV = this.state.tags.join(',');
    this.props
      .updateNote(noteId, this.props.note.bookId, this.state.title, this.state.editedNoteContent, this.state.isFav, tagsCSV)
      .then(() => this.props.history.push(`/books/${this.props.note.bookId}/`));
  };
  onImageUpload = (url) => {
    this.setState({
      editedNoteContent: `${this.state.editedNoteContent} ![](${url}) `
    })
  }
  render() {
    const book = this.props.books.get(this.props.note.bookId);
    const bookId = this.props.note.bookId;

    if (!book) {
      return <LoadingPlaceholder/>
    }

    return (
      <div>
        <Breadcrumb>
            <Breadcrumb.Section><Link to="/">Home</Link></Breadcrumb.Section>
            <Breadcrumb.Divider> > </Breadcrumb.Divider>
            <Breadcrumb.Section>
                <Link to={"/books/" + bookId}>
                    {book.title}
                </Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider> > </Breadcrumb.Divider>
            <div className="active section">Edit note</div>
        </Breadcrumb>
        <br/>
        <br/>

        <Input
          fluid
          placeholder="Title .."
          value={this.state.title}
          onChange= {this.onTitleChange.bind(this)}/>
        <br/>
        <RTEContainer
          onImageUpload={this.onImageUpload}
          value={this.state.editedNoteContent}
          onChange={this.onNoteChange} />
        <br/>
        <Grid>
        <Grid.Column width="10">
          <Popup
            on="click"
            trigger={<Icon link size="large" name="tags" onClick={(e) => {e.preventDefault()}}/>}
            position="bottom left">
            <Popup.Content>
             <TagsEditor
              tags = {this.state.tags}
              onTagAdded={(updatedTagsArray)=> this.onTagsChanged(updatedTagsArray)}
              onTagRemoved={(updatedTagsArray)=> this.onTagsChanged(updatedTagsArray)}/>
            </Popup.Content>
          </Popup>
          <Icon link name="heart" size="large" color={this.state.isFav ? "red" : "grey"} onClick={(e) => {this.onFavToggle(e)}} />
        </Grid.Column>
        <Grid.Column textAlign="right" verticalAlign="middle" width="6">
          <Button color="teal" disabled={this.ifNoteIsEmpty()} onClick={this.onSubmit}>Save</Button>
          <Link to={"/books/" + bookId}><Button>Cancel</Button></Link>
        </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export const NotesViewContainer = inject(stores => {
  return {
    getNote: stores.notesStore.getNote,
    note: stores.notesStore.note,
    errorMessage: stores.notesStore.notesFetchError,
    loading: stores.notesStore.loading,
    updateNote: stores.notesStore.updateNote,
    books: stores.booksStore.books,
    fetchBookById: stores.booksStore.fetchBookById
  };
})(NotesView);
