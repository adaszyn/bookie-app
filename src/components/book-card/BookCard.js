import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

export const BookCard = ({ title, description, thumbnail }) => (
  <Card>
    <Image src={thumbnail} />
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
    <Card.Content extra />
  </Card>
);
