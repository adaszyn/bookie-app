import React from "react";
import {
  Grid,
  Card,
  Icon,
  List,
  Popup,
  Header,
  Divider,
  Label
} from "semantic-ui-react";
import { TagsEditor } from "../tags/TagsEditor";
import { ConfirmPopup } from "../util/ConfirmPopup";
import { observer, inject } from "mobx-react";
import { getTagColor } from "../../util/tags.util";
import { TagsDropZone } from "../tags/TagsDropZone";
import { uniq } from "lodash";
import {limitLength} from "../../util/string.util";

@observer
export class NoteCard extends React.Component {
  getFormattedTitle = title => {
    title = title.substring(0, 15);
    if (title.length >= 15) title = title + " ..";
    return title;
  };

  getTagsArray = tags => {
    if (!tags) return [];
    return tags.split(",");
  };

  onTagsUpdated = tags => {
    const note = this.props.notes.find(note => note.id === this.props.noteId);
    if (typeof tags === "undefined") {
      tags = "";
    }
    tags = tags.join(",");
    this.props.updateNote(
      note.id,
      note.bookId,
      note.title,
      note.content,
      note.isFav,
      tags
    );
  };
  onTagDropped = tag => {
    const updatedTags = uniq([tag.name, ...this.getTagsArray(this.props.tags)]);
    this.onTagsUpdated(updatedTags);
  };

  onFavToggle = e => {
    e.preventDefault();
    const note = this.props.notes.find(note => note.id === this.props.noteId);
    this.props.updateNote(
      note.id,
      note.bookId,
      note.title,
      note.content,
      !note.isFav,
      note.tags
    );
  };

  onDeleteNote = () => {
    const note = this.props.notes.find(note => note.id === this.props.noteId);
    this.props.deleteNote(note.id, note.bookId);
  };
  renderTagsToolbar = () => {
    const tags = this.props.tags;
    const tagsArray = this.getTagsArray(tags).slice(0, 6);
    if (!tags || tags.length === 0) {
      return null;
    }
    return (
      <Card.Content style={{ paddingTop: 0, paddingBottom: 0 }}>
        {tagsArray.map(tag => (
          <Popup
            key={tag}
            position="top center"
            trigger={
              <Label size="tiny" name="" key={tag} color={getTagColor(tag)} />
            }
            content={tag}
          />
        ))}
      </Card.Content>
    );
  };

  trimUpdateDateString = date => {
    var date_format = new Date(date);
    var minutes = date_format.getMinutes();
    minutes = minutes <= 9 ? "0" + minutes.toString() : minutes;
    return (
      date_format.toDateString() +
      " at " +
      date_format.getHours() +
      ":" +
      minutes
    );
  };

  renderNoteToolbar = () => {
    return (
      <div>
        <Popup
          on="click"
          trigger={
            <Icon
              color={
                this.getTagsArray(this.props.tags).length > 0
                  ? "yellow"
                  : "grey"
              }
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
              onTagRemoved={this.onTagsUpdated}
              onTagAdded={this.onTagsUpdated}
              tags={this.getTagsArray(this.props.tags)}
            />
          </Popup.Content>
        </Popup>
        <Icon
          name="heart"
          color={this.props.isFav ? "red" : "grey"}
          onClick={e => {
            this.onFavToggle(e);
          }}
        />
        <ConfirmPopup onConfirm={this.onDeleteNote} title="Delete note ?" />
      </div>
    );
  };

  render() {
    const formattedTitle = this.getFormattedTitle(this.props.title);
    return (
      <TagsDropZone note={this.props.note} onTagDropped={this.onTagDropped}>
        {this.props.listitem ? (
          <List.Item className="bounce-in">
            <Card link style={{ width: "100%" }}>
              <Card.Content extra>
                <Grid>
                  <Grid.Column computer={12}>
                    <Header
                      as="h4"
                      content={this.props.title}
                      subheader={this.props.meta}
                    />
                  </Grid.Column>
                  <Grid.Column computer={4} textAlign="right">
                    {this.renderNoteToolbar()}
                  </Grid.Column>
                </Grid>
              </Card.Content>
              <Card.Content style={{ paddingTop: 0, paddingBottom: 0 }}>
                {this.getTagsArray(this.props.tags).map(tag => (
                  <Label name="" key={tag} color={getTagColor(tag)} />
                ))}
              </Card.Content>
            </Card>
          </List.Item>
        ) : (
          <Card link style={{ height: "230px" }} className="bounce-in">
            <Card.Content>
              <Header as="h4">{formattedTitle}</Header>
              <Divider />
              <Card.Content
                meta={this.trimUpdateDateString(this.props.meta)}
                style={{ fontSize: "12px" }}
              />
              <Card.Description>
                {limitLength(this.props.description, 20)}
              </Card.Description>
            </Card.Content>
            {this.renderTagsToolbar()}
            <Card.Content extra textAlign="right">
              {this.renderNoteToolbar()}
            </Card.Content>
          </Card>
        )}
      </TagsDropZone>
    );
  }
}

export const NoteViewContainer = inject(stores => {
  return {
    notes: stores.notesStore.notes,
    updateNote: stores.notesStore.updateNote,
    deleteNote: stores.notesStore.deleteNote
  };
})(NoteCard);
