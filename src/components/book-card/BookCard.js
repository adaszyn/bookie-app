import React from "react";
import { Grid, Card, Image, Icon } from "semantic-ui-react";

const getFormattedDescription = description => {
  if(description == null) return;
  const words = description.split(" ");
  if (words.length > 4) {
    return words.slice(0, 10).join(" ") + " ...";
  }
  return description;
};

export const BookCard = ({ title, description, thumbnail, numberOfNotes }) => (
  <Card>
    <Card.Content>
      <Card.Header sub="true">{title}</Card.Header>
    </Card.Content>
    <Image src={thumbnail}/>
    <Card.Content extra="true" textAlign="right">
      <Grid>
        <Grid.Column width="12" textAlign="left"> <Card.Meta> {numberOfNotes} notes  </Card.Meta> </Grid.Column>
        <Grid.Column width="4" textAlign="right"> <Icon name='trash'/> </Grid.Column>
      </Grid>
    </Card.Content>
  </Card>
);
