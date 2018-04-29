import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Grid, Header , Divider, Icon, Menu, List} from "semantic-ui-react";
import "./HomeView.css";
import { BookCard } from "../book-card/BookCard";
import { NoteCard, NoteList } from "../note-card/NoteCard";
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

  onTagsUpdated = (id, tags) => {
    const note = this.props.notes.find(note => note.id === id);
    if(typeof tags === 'undefined')
      tags = '';
    this.props.updateNote(note.id, note.bookId, note.content, note.isFav, tags);
  }

  onFavToggle = id => {
    const note = this.props.notes.find(note => note.id === id);
    note.isFav = !note.isFav;
    this.props.updateNote(note.id, note.bookId, note.content, note.isFav, note.tags);
  }

  onDeleteNote = id => {
    const note = this.props.notes.find(note => note.id === id);
    this.props.deleteNote(note.id, note.bookId);
  }

  getNumberOfNotesByBookId = bookId => {
    return this.props.notes.filter( note => note.bookId === bookId).length;
  }

  renderNotesCarousel = () => {
    return <Carousel
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
                    tags={note.tags}
                    onTagsUpdated = {(tags) => this.onTagsUpdated(note.id, tags)}
                    onFavToggle = {() => this.onFavToggle(note.id)}
                    onDelete = {() => this.onDeleteNote(note.id)}
                />
            </Link>
        )}
        itemKey={"id"}
        perPage={3}
    />
  }
  renderNotesList = () => {
    return  <List
        style={{maxHeight: "280px", display:"block", overflow: "auto"}}>
        {this.props.notes.map(note => (

            <Link to={"/notes/" + note.id} key={note.id}>
                <NoteList
                    key={note.id}
                    title={note.bookId}
                    isFav={note.isFav}
                    meta={note.dateModified}
                    description={note.content}
                    tags={note.tags}
                    onTagsUpdated = {(tags) => this.onTagsUpdated(note.id, tags)}
                    onFavToggle = {() => this.onFavToggle(note.id)}
                    onDelete = {() => this.onDeleteNote(note.id)}
                />
            </Link>
        ))}
    </List>
  }
  renderNotes = () => {
    if (this.props.notes.length === 0) {
      return <Header as="h3">No notes available.</Header>
    }
    if (this.state.activeItem === 'th-btn') {
      return this.renderNotesCarousel()
    }
    return this.renderNotesList()

  }

  render() {
    return (
      <div>
        <Header as="h1">Recent Notes</Header>
        <Menu>
          <Menu.Item name='th-btn' active={this.state.activeItem === 'th-btn'} onClick={this.handleItemClick}>
            <Icon name='h'/>Grid
          </Menu.Item>
          <Menu.Item name='list-btn' active={this.state.activeItem === 'list-btn'} onClick={this.handleItemClick}>
            <Icon name = 'list'/>List
          </Menu.Item>
        </Menu>
          {this.renderNotes()}
        <Divider />
          {!!this.props.books.length && <Header as="h1">All Books</Header>}
        <Grid stackable>
          {this.props.books.map(book => (
            <Grid.Column computer={5} key={book.id}>
                <BookCard
                  key={book.id}
                  bookId={book.isbn10}
                  title={book.title}
                  description={book.description}
                  thumbnail={book.image}
                  numberOfNotes={this.getNumberOfNotesByBookId(book.isbn10)}
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
    getAllNotes: stores.notesStore.getAllNotes,
    updateNote: stores.notesStore.updateNote,
    deleteNote: stores.notesStore.deleteNote,
    books: stores.booksStore.booksList
  };
})(HomeView);