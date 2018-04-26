import React from "react";
import { observer} from 'mobx-react';
import { Grid, Card, Image, Icon, Popup, Button, Divider } from "semantic-ui-react";


@observer 
export class BookCard extends React.Component {
  state = {
    isOpen: false
  }

  setDeletePopupVisibility = visible => {
    this.setState({
      isOpen: visible
    });
  }
  
  getFormattedDescription = description => {
    if(description == null) return;
    const words = description.split(" ");
    if (words.length > 4) {
      return words.slice(0, 10).join(" ") + " ...";
    }
    return description;
  };
  
  onTrash = (bookId) => {
    this.setState({
      isOpen: false
    })
  }

  onPopupConfirm = () => {
    this.setDeletePopupVisibility(false);
  }

  onPopupCancel = () => {
    this.setDeletePopupVisibility(false);
  }

  render() {
    const bookId = this.props.bookId;
    const title = this.props.title;
    const thumbnail = this.props.thumbnail;
    const numberOfNotes = this.props.numberOfNotes;
    const description = this.props.description;

    return (
      <Card link style={{'height': '100%'}} href={"/books/" + bookId}>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
        </Card.Content>
        <Image src={thumbnail}/>
        <Card.Content extra textAlign="right">
          <Grid>
            <Grid.Column width="12" textAlign="left"> <Card.Meta> {numberOfNotes} notes  </Card.Meta> </Grid.Column>
            <Grid.Column width="4" textAlign="right"> 
              <Popup
                on="click"
                trigger={<Icon onClick={(e) => {e.preventDefault()}} name='trash'/>} 
                open={this.state.isOpen}
                position='bottom right'
                onOpen={() => {this.setDeletePopupVisibility(true)}}
                onClose={() => {this.setDeletePopupVisibility(false)}}>
                <Popup.Header>
                  Are you sure ?
                </Popup.Header>
                <Popup.Content>
                  This will remove the book and all it's notes
                  <Divider/>
                  <Button onClick={this.onPopupCancel}> Cancel </Button> 
                  <Button onClick={this.onPopupConfirm}> Delete </Button>
                </Popup.Content>
              </Popup>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
} 