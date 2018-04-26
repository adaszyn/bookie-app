import React from "react";
import { Card, Icon, Popup } from "semantic-ui-react";
import {TagsEditor} from "../tags-editor/TagsEditor";

const getFormattedDescription = description => {
  const words = description.split(" ");
  if (words.length > 4) {
    return words.slice(0, 4).join(" ") + "...";
  }
  return description;
};

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
          <TagsEditor tags={tags}/>
        </Popup.Content>
      </Popup>
      <Icon name="heart" color={isFav ? "red" : "grey"} />
      <Icon name="trash"/>
    </Card.Content>
  </Card>
);
