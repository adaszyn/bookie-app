import React from "react";
import { observer} from 'mobx-react';
import { Grid, Card, Image} from "semantic-ui-react";
import { ConfirmPopup } from "../confirm-popup/ConfirmPopup";

@observer 
export class BookCard extends React.Component {
 
  getFormattedDescription = description => {
    if(description == null) return;
    const words = description.split(" ");
    if (words.length > 4) {
      return words.slice(0, 10).join(" ") + " ...";
    }
    return description;
  };

  render() {
    const bookId = this.props.bookId;
    const title = this.props.title;
    const thumbnail = this.props.thumbnail;
    const numberOfNotes = this.props.numberOfNotes;

    return (
      <Card link style={{'height': '100%'}} href={"/books/" + bookId}>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
        </Card.Content>
        <Image src={thumbnail}/>
        <Card.Content extra textAlign="right">
          <Grid>
            <Grid.Column width="12" textAlign="left"> <Card.Meta> {numberOfNotes} notes  </Card.Meta> </Grid.Column>
            {this.props.showDelete ? (
              <Grid.Column width="4" textAlign="right"> 
                <ConfirmPopup message="This will delete the book from your collection and all its related notes"/>
              </Grid.Column>
            ) : (
              null
            )}
          </Grid>
        </Card.Content>
      </Card>
    );
  }
} 