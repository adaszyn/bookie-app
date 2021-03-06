import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {
  Breadcrumb,
  Button,
  Input,
  Grid,
  Popup,
  Icon
} from "semantic-ui-react";
import { TagsEditor } from "../tags/TagsEditor";
import { Link } from "react-router-dom";
import { LoadingPlaceholder } from "../util/LoadingPlaceholder";
import { RTEContainer } from "../editor/RTEContainer";

@observer
export class NoteCreateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Untitled",
      isFav: false,
      tags: [],
      editedNoteContent: ""
    };
  }
  componentDidMount() {
    const bookId = this.props.match.params.id;
    this.props.fetchBookById(bookId);
  }
  onNoteChange = note => {
    this.setState({
      editedNoteContent: note
    });
  };
  onTitleChange = ({ target: { value } }) => {
    this.setState({
      title: value
    });
  };
  onTagsChanged = updatedTagsArray => {
    this.setState({
      tags: updatedTagsArray
    });
  };
  onFavToggle = () => {
    this.setState({
      isFav: !this.state.isFav
    });
  };

  ifNoteIsEmpty = () => {
    return (
      this.state.title.trim() === "" ||
      this.state.editedNoteContent.trim() === ""
    );
  };
  onImageUpload = url => {
    this.setState({
      editedNoteContent: `${this.state.editedNoteContent} ![](${url}) `
    });
  };
  onSubmit = () => {
    const bookId = this.props.match.params.id;
    const tagsCSV = this.state.tags.join(",");
    this.props
      .saveNote(
        bookId,
        this.state.title,
        this.state.editedNoteContent,
        this.state.isFav,
        tagsCSV
      )
      .then(() => this.props.history.push(`/books/${bookId}/`));
  };
  render() {
    const bookId = this.props.match.params.id;
    const book = this.props.books.get(bookId);
    if (!book) {
      return <LoadingPlaceholder />;
    }
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section>
            <Link to="/">Home</Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider> > </Breadcrumb.Divider>
          <Breadcrumb.Section>
            <Link to={"/books/" + bookId}>{book.title}</Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider> > </Breadcrumb.Divider>
          <div className="active section">Create new note</div>
        </Breadcrumb>
        <br />
        <br />

        <Input
          fluid
          value={this.state.title}
          placeholder="Title .."
          onChange={this.onTitleChange.bind(this)}
        />
        <br />
        <RTEContainer
          onImageUpload={this.onImageUpload}
          onChange={this.onNoteChange}
          value={this.state.editedNoteContent}
        />
        <br />
        <Grid>
          <Grid.Column width="10">
            <Popup
              on="click"
              trigger={
                <Icon
                  link
                  size="large"
                  name="tags"
                  onClick={e => {
                    e.preventDefault();
                  }}
                />
              }
              position="bottom left"
            >
              <Popup.Content>
                <TagsEditor
                  tags={this.state.tags}
                  onTagAdded={updatedTagsArray =>
                    this.onTagsChanged(updatedTagsArray)
                  }
                  onTagRemoved={updatedTagsArray =>
                    this.onTagsChanged(updatedTagsArray)
                  }
                />
              </Popup.Content>
            </Popup>
            <Icon
              link
              name="heart"
              size="large"
              color={this.state.isFav ? "red" : "grey"}
              onClick={e => {
                this.onFavToggle(e);
              }}
            />
          </Grid.Column>
          <Grid.Column textAlign="right" verticalAlign="middle" width="6">
            <Button
              color="teal"
              disabled={this.ifNoteIsEmpty()}
              onClick={this.onSubmit}
            >
              Save
            </Button>
            <Button onClick={() => window.history.back()}>Cancel</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export const NoteCreateViewContainer = inject(stores => {
  return {
    saveNote: stores.notesStore.saveNote,
    books: stores.booksStore.books,
    fetchBookById: stores.booksStore.fetchBookById
  };
})(NoteCreateView);
