import React from "react";
import { Card, Icon, Popup } from "semantic-ui-react";
import {TagsEditor} from "../tags-editor/TagsEditor";
import { ConfirmPopup } from "../confirm-popup/ConfirmPopup";

const getFormattedDescription = description => {
  const words = description.split(" ");
  if (words.length > 4) {
    return words.slice(0, 4).join(" ") + "...";
  }
  return description;
};

const getTagsArray = (tags) => {
  return tags.split(',').map((tag, idx) => {
    return {
      key: idx,
      tag: tag
    }
  });
}

export const NoteCard = ({ title, description, meta, isFav, tags }) => (
  <Card style={{ height: "100%" }}>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>{meta}</Card.Meta>
      <Card.Description>
        {getFormattedDescription(description)}
      </Card.Description>
    </Card.Content>
    <Card.Content extra textAlign="right">
      <Popup
        on="click"
        trigger={<Icon name="tags" onClick={(e) => {e.preventDefault()}}/>}
        position="bottom left">
        <Popup.Content>
          <TagsEditor tags={getTagsArray(tags)}/>
        </Popup.Content>
      </Popup>
      <Icon name="heart" color={isFav ? "red" : "grey"} />
      <ConfirmPopup title="Delete note ?"/>
    </Card.Content>
  </Card>
);
