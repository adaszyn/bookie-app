import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Breadcrumb, Button, Input, Grid, Popup, Icon } from "semantic-ui-react";
import RichTextEditor from "react-rte";
import {TagsEditor} from "../tags-editor/TagsEditor";
import {Link} from "react-router-dom";

@observer
export class NoteCreateView extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      title: "",
      note: RichTextEditor.createEmptyValue(), 
      isFav: false, 
      tags: []
    };
  }
  onNoteChange = note => {
    this.setState({
      'note': note
    });
  };
  onTitleChange = e => {
    this.setState({
      'title': e.target.value
    });
  };
  onTagsChanged = (tag, updatedTagsArray) => {
    this.setState({
      tags: updatedTagsArray
    })
  };
  onFavToggle = () => {
    this.setState({
      'isFav': !this.state.isFav
    })
  }
  onSubmit = () => {
    const bookId = this.props.match.params.id;
    const tagsCSV = this.state.tags.join(',');
    console.log(tagsCSV);
    this.props
      .saveNote(bookId, this.state.title, this.state.note.toString("markdown"), this.state.isFav, tagsCSV)
      .then(() => this.props.history.push(`/books/${bookId}/`));
  };

  render() {
      const bookId = this.props.match.params.id;
      const book = this.props.books.get(bookId);
      console.log(book);
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
            <div className="active section">Create new note</div>
        </Breadcrumb>
        <Grid>
          <Grid.Column width="13">
            <Input 
            fluid
            placeholder="Title ..." 
            onChange= {this.onTitleChange.bind(this)}/>
          </Grid.Column>
          <Grid.Column textAlign="center" verticalAlign="middle" width="3">
            <Popup
              on="click"
              trigger={<Icon size="large" name="tags" onClick={(e) => {e.preventDefault()}}/>}
              position="bottom left">
              <Popup.Content>
               <TagsEditor 
                tags = {this.state.tags}
                onTagAdded={(tag, updatedTagsArray)=> this.onTagsChanged(tag, updatedTagsArray)} 
                onTagRemoved={(tag, updatedTagsArray)=> this.onTagsChanged(tag, updatedTagsArray)}/>
              </Popup.Content>
            </Popup>
            <Icon name="heart" size="large" color={this.state.isFav ? "red" : "grey"} onClick={(e) => {this.onFavToggle(e)}} />
          </Grid.Column>
        </Grid>
        <br/>
        <RichTextEditor value={this.state.note} onChange={this.onNoteChange} />
        <br/>
        <Button onClick={this.onSubmit}>Save</Button>
      </div>
    );
  }
}
export const NoteCreateViewContainer = inject(stores => {
  return {
    saveNote: stores.notesStore.saveNote,
    books: stores.booksStore.books,
  };
})(NoteCreateView);
