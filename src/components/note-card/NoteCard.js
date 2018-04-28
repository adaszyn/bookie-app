import React from "react";
import { Card, Icon, Popup } from "semantic-ui-react";
import {TagsEditor} from "../tags-editor/TagsEditor";
import { ConfirmPopup } from "../confirm-popup/ConfirmPopup";

export class NoteCard extends React.Component{
  
  getFormattedDescription = description => {
    const words = description.split(" ");
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return description;
  };

  getTagsArray = tags => {
    if(tags === '') return [];
    return tags.split(',');
  }

  onTagAdded = tags => {
    this.props.onTagsUpdated(tags.join(","));
  }

  onTagRemoved = tags => {
    this.props.onTagsUpdated(tags.join(","));
  }

  onFavToggle = (e) => {
    e.preventDefault();
    this.props.onFavToggle();
  }

  onConfirmDelete = () => {
    this.props.onDelete();
  }

  render() {
    return (
      <Card style={{ height: "100%" }}>
        <Card.Content>
          <Card.Header>{this.props.title}</Card.Header>
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
              onTagRemoved={(tag, tags) => this.onTagAdded(tags)} 
              onTagAdded={(tag, tags) => this.onTagRemoved(tags)} 
              tags={this.getTagsArray(this.props.tags)}/>
            </Popup.Content>
          </Popup>
          <Icon name="heart" color={this.props.isFav ? "red" : "grey"} onClick={(e) => {this.onFavToggle(e)}} />
          <ConfirmPopup onConfirm={() => this.onConfirmDelete() } title="Delete note ?" />
        </Card.Content>
      </Card>
    );
  }
}