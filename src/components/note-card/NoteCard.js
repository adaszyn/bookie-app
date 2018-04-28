import React from "react";
import { Card, Icon, List } from "semantic-ui-react";

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
    <Card.Content extra>
      <Icon name="heart" color={isFav ? "red" : "grey"} />
    </Card.Content>
  </Card>
);

export const NoteList = ({ title, meta, isFav }) => (
    <List.Item>
      <List.Content>
      <Icon name="heart" color={isFav ? "red" : "grey"}  />
        {title} - {meta}
      </List.Content>
    </List.Item>
);
