import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Grid, Header , Divider, Icon, Menu, List} from "semantic-ui-react";
import "./HomeView.css";
import { BookCard } from "../book-card/BookCard";
import { NoteCard, NoteList } from "../note-card/NoteCard";
import sampleBooks from "./sample-books.json";
import { Carousel } from "../carousel/Carousel";

@observer
export class HomeView extends Component {
  state = {
    activeItem: "th-btn"
  }
  componentDidMount() {
    this.props.getAllNotes();
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <div>
        <Header as="h1">Recent Notes</Header>
        <Divider />
        <Menu>
          <Menu.Item name='th-btn' active={this.state.activeItem === 'th-btn'} onClick={this.handleItemClick}>
            <Icon name = 'th'/>Grid
          </Menu.Item>
          <Menu.Item name='list-btn' active={this.state.activeItem === 'list-btn'} onClick={this.handleItemClick}>
            <Icon name = 'list'/>List
          </Menu.Item>
        </Menu>
        {this.state.activeItem === 'th-btn' ? 
          <Carousel
            style={{minHeight: "280px", display:"block"}}
            items={this.props.notes}
            renderItem={note => (
              <Link to={"/notes/" + note.id} key={note.id}>
                <NoteCard
                  key={note.id}
                  title={note.bookId}
                  isFav={note.isFav}
                  meta={note.dateModified}
                  description={note.content}
                />
              </Link>
            )}
            itemKey={"id"}
            perPage={3}
          /> : 
          <List
            style={{maxHeight: "280px", display:"block", overflow: "scroll"}}>
            {this.props.notes.map(note => (
            <Link to={"/notes/" + note.id} key={note.id}>
              <NoteList
                key={note.id}
                title={note.bookId}
                isFav={note.isFav}
                meta={note.dateModified}
                description={note.content}
                tags={"tag1,tag2,tag3"}
              />
            </Link>
          ))}/>
          </List> 
        }
        <Divider />
        <Header as="h1">All Books</Header>
        <Grid>
          {sampleBooks.items.map(book => (
            <Grid.Column computer={5} key={book.id}>
                <BookCard
                  key={book.id}
                  bookId={book.id}
                  title={book.volumeInfo.title}
                  description={
                    book.volumeInfo.description
                      ? book.volumeInfo.description
                      : null
                  }
                  thumbnail={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : null
                  }
                  numberOfNotes={5}
                />
            </Grid.Column>
          ))}
        </Grid>
      </div>
    );
  }
}
export const HomeViewContainer = inject(stores => {
  return {
    notes: stores.notesStore.notes,
    getAllNotes: stores.notesStore.getAllNotes
  };
})(HomeView);
