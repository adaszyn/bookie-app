import React from "react";
import { Card } from "semantic-ui-react";

export const NoteCard = ({ title, description, meta }) => (
  <Card>
    <Card.Content>
      <Card.Header>Note {title}</Card.Header>
      <Card.Meta>{meta}</Card.Meta>
      <Card.Description>{description.split(' ').slice(0,10).join(' ')}..</Card.Description>
    </Card.Content>
    <Card.Content extra />
  </Card> 

);
