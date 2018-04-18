import React from "react";
import { Card } from "semantic-ui-react";

const getFormattedDescription = description => {
  const words = description.split(" ");
  if (words.length > 10) {
    return words.slice(0, 10).join(" ") + "...";
  }
  return description;
};

export const NoteCard = ({ title, description, meta }) => (
  <Card>
    <Card.Content>
      <Card.Header>Note {title}</Card.Header>
      <Card.Meta>{meta}</Card.Meta>
      <Card.Description>
        {getFormattedDescription(description)}
      </Card.Description>
    </Card.Content>
  </Card>
);
