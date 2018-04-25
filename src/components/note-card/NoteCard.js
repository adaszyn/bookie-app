import React from "react";
import { Card, Icon } from "semantic-ui-react";

const getFormattedDescription = description => {
  const words = description.split(" ");
  if (words.length > 4) {
    return words.slice(0, 4).join(" ") + "...";
  }
  return description;
};

export const NoteCard = ({ title, description, meta, isFav }) => (
  <Card style={{ height: "100%" }}>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>{meta}</Card.Meta>
      <Card.Description>
        {getFormattedDescription(description)}
      </Card.Description>
    </Card.Content>
    <Card.Content extra textAlign="right">
      <Icon name="tags" />
      <Icon name="heart" color={isFav ? "red" : "grey"} />
      <Icon name="trash"/>
    </Card.Content>
  </Card>
);
