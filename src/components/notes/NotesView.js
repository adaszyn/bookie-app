import React, { Component } from "react";
import { Breadcrumb, Button, Input, Grid, Popup, Icon } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { TagsEditor } from "../tags-editor/TagsEditor";
import RichTextEditor from "react-rte";
import {LoadingPlaceholder} from "../loading/LoadingPlaceholder";

@observer
export class NotesView extends Component {
  state = {
    title: "",
    note: RichTextEditor.createEmptyValue(),
    isFav: false,
    tags: []
  };
  componentDidMount() {
    this.props.getNote(this.props.match.params.id);
  }
  componentWillReceiveProps({ note }) {
    if (note) {
      this.props.fetchBookById(note.bookId);
    }
    this.setState({
      note: RichTextEditor.createValueFromString(note.content, "markdown"),
      title: note.title,
      isFav: note.isFav,
      tags: note.tags ? note.tags.split(',') : []
    });
  }
  onNoteChange = note => {
    this.setState({
      note
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
   if(this.state.title.trim() === '' || this.state.note.toString("markdown").trim() === ''){
      return true;
    }
    return false;
  }
  ifNoteReallyChanged = () => {
   if(this.props.note.content && this.props.note.content.trim() !== this.state.note.toString("markdown").trim()){
      return true;
    }
    return false;
  }
  onSubmit = () => {
    const noteId = this.props.match.params.id;
    const tagsCSV = this.state.tags.join(',');
    this.props
      .updateNote(noteId, this.props.note.bookId, this.state.title, this.state.note.toString("markdown"), this.state.isFav, tagsCSV)
      .then(() => this.props.history.push(`/books/${this.props.note.bookId}/`));
  };
  renderNote(note) {
    return (
      <div key={note.id}>
        <p>{note.dateModified}</p>
        <RichTextEditor value={this.state.note} onChange={this.onNoteChange} />
      </div>
    );
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
        <RichTextEditor value={this.state.note} onChange={this.onNoteChange} placeholder="Begin note here .."/>
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
          <Button color="teal" disabled={this.ifNoteIsEmpty() || !this.ifNoteReallyChanged()} onClick={this.onSubmit}>Save</Button>
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
