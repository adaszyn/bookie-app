import React from "react";
import { observer, inject } from "mobx-react";
import { Grid, Card, Image } from "semantic-ui-react";
import { ConfirmPopup } from "../util/ConfirmPopup";

@observer
export class Book extends React.Component {
  getFormattedDescription = description => {
    if (description == null) return;
    const words = description.split(" ");
    if (words.length > 4) {
      return words.slice(0, 10).join(" ") + " ...";
    }
    return description;
  };

  onBookDeleted = id => {
    this.props.deleteBook(id);
  };

  render() {
    const bookId = this.props.bookId;
    const title = this.props.title;
    const thumbnail = this.props.thumbnail;
    const numberOfNotes = this.props.numberOfNotes;

    return (
      <Card link href={"/books/" + bookId} className="bounce-in">
        <Card.Content>
          <Card.Header
            style={{ height: "60px", textAlign: "center", overflow: "hidden" }}
          >
            <h4>{title}</h4>
          </Card.Header>
        </Card.Content>
        <Image style={{ height: "150px" }} src={thumbnail} />
        <Card.Content extra textAlign="right">
          <Grid>
            <Grid.Column width="12" textAlign="left">
              {" "}
              <Card.Meta> {numberOfNotes} notes </Card.Meta>{" "}
            </Grid.Column>
            {this.props.showDelete ? (
              <Grid.Column width="4" textAlign="right">
                <ConfirmPopup
                  onConfirm={() => this.onBookDeleted(bookId)}
                  message="This will delete the book from your collection and all its related notes"
                />
              </Grid.Column>
            ) : null}
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

export const BookCard = inject(stores => {
  return {
    deleteBook: stores.notesStore.deleteBook
  };
})(Book);
