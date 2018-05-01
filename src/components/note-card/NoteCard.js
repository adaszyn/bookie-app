import React from "react";
import { Grid, Card, Icon, List, Popup, Header, Divider } from "semantic-ui-react";
import { TagsEditor} from "../tags-editor/TagsEditor";
import { ConfirmPopup } from "../confirm-popup/ConfirmPopup";
import { observer, inject } from "mobx-react";

@observer
export class NoteCard extends React.Component {
  
  getFormattedDescription = description => {
    const words = description.split(" ");
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + " ...";
    }
    return description;
  };

  getFormattedTitle = title => {
    title =  title.substring(0,15);
    if(title.length >= 15) title = title + " ..";
    return title;
  }

  getTagsArray = tags => {
    if(!tags) return [];
    return tags.split(',');
  }

  onTagsUpdated = (tags) => {
    const note = this.props.notes.find(note => note.id === this.props.noteId);
    if(typeof tags === 'undefined')
      tags = '';
    tags = tags.join(',');
    this.props.updateNote(note.id, note.bookId, note.title, note.content, note.isFav, tags);
  }

  onFavToggle = (e) => {
    e.preventDefault();
    const note = this.props.notes.find(note => note.id === this.props.noteId);
    this.props.updateNote(note.id, note.bookId, note.title, note.content, !note.isFav, note.tags);
  }

  onDeleteNote = () => {
    const note = this.props.notes.find(note => note.id === this.props.noteId);
    this.props.deleteNote(note.id, note.bookId);
  }

  render() {
    const formattedTitle = this.getFormattedTitle(this.props.title);
    return (
      <div>
        { this.props.listitem ? (
           <List.Item>
            <Card link style={{ width: "100%" }}>
              <Card.Content extra>
              <Grid>
                <Grid.Column computer={12}>
                  <Header as="h4" content={this.props.title} subheader={this.props.meta} />
                </Grid.Column>
                <Grid.Column computer={4} textAlign ="right">
                  <Popup
                  on="click"
                  trigger={<Icon name="tags" onClick={(e) => {e.preventDefault()}}/>}
                  position="bottom left">
                    <Popup.Content>
                      <TagsEditor 
                      onTagRemoved={this.onTagsUpdated}
                      onTagAdded={this.onTagsUpdated}
                      tags={this.getTagsArray(this.props.tags)}/>
                    </Popup.Content>
                  </Popup>
                  <Icon name="heart" color={this.props.isFav ? "red" : "grey"} onClick={(e) => {this.onFavToggle(e)}}/>
                  <ConfirmPopup onConfirm={() => this.onDeleteNote() } title="Delete note ?" />
                  </Grid.Column>
              </Grid>
              </Card.Content>
             </Card> 
          </List.Item> ) :(
             <Card link style={{ height: "230px" }}>
              <Card.Content>
                <Header as="h4">{formattedTitle}</Header>
                <Divider />
                <Card.Meta>{this.props.meta}</Card.Meta>
                <Card.Description>
                  {this.getFormattedDescription(this.props.description)}
                </Card.Description>
              </Card.Content>
              <Card.Content extra textAlign="right">
                <Popup
                  on="click"
                  trigger={<Icon name="tags" onClick={(e) => {e.preventDefault()}}/>}
                  position="bottom left">
                  <Popup.Content>
                    <TagsEditor 
                    onTagRemoved={this.onTagsUpdated}
                    onTagAdded={this.onTagsUpdated}
                    tags={this.getTagsArray(this.props.tags)}/>
                  </Popup.Content>
                </Popup>
                <Icon name="heart" color={this.props.isFav ? "red" : "grey"} onClick={(e) => {this.onFavToggle(e)}} />
                <ConfirmPopup onConfirm={() => this.onDeleteNote() } title="Delete note ?" />
              </Card.Content>
            </Card>
          )}
      </div>
    );
  }
}

export const NoteViewContainer = inject(stores => {
  return {
    notes: stores.notesStore.notes,
    updateNote: stores.notesStore.updateNote,
    deleteNote: stores.notesStore.deleteNote,
  };
})(NoteCard);
