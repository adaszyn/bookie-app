import React, { Component } from "react";
import { Grid, Breadcrumb, Header, Button, List, Menu, Icon, Rating, Divider } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { BookCard } from "../book-card/BookCard";
import { NoteCard } from "../note-card/NoteCard";
import { Link } from "react-router-dom";
import { Carousel } from "../carousel/Carousel";

@observer
export class BookView extends Component {
  state = {
    descriptionExpanded: false,
    activeItem: "th-btn"
  };

  componentWillReceiveProps(newProps) {
    const bookId = this.props.match.params.id;
    const newBookId = newProps.match.params.id;
    if (bookId !== newBookId) {
      newProps.fetchBookById(newBookId);
    }
  }
  componentDidMount() {
    console.log('fetching')
    this.props.getAllNotes();
    this.props.fetchBookById(this.props.match.params.id);
  }
  toggleDescription = () => {
    this.setState({
      descriptionExpanded: !this.state.descriptionExpanded
    });
  };
  renderDescription(book) {
    if (this.state.descriptionExpanded) {
      return <p>{book.fullDescription}</p>;
    } else {
      return <p>{book.description}</p>;
    }
  }
  renderToggleDescriptionButton() {
    if (this.state.descriptionExpanded) {
      return <a href="#" size ="tiny" onClick={this.toggleDescription}>Show less</a>;
    } else {
      return <a href="#" size ="tiny" onClick={this.toggleDescription}>Show more</a>;
    }
  }

  onTagsUpdated = (id, tags) => {
    const note = this.props.notes.find(note => note.id === id);
    if(typeof tags === 'undefined')
      tags = '';
    this.props.updateNote(note.id, note.bookId, note.title, note.content, note.isFav, tags);
  }

  onFavToggle = id => {
    const note = this.props.notes.find(note => note.id === id);
    note.isFav = !note.isFav;
    this.props.updateNote(note.id, note.bookId, note.title, note.content, note.isFav, note.tags);
  }

  onDeleteNote = id => {
    const note = this.props.notes.find(note => note.id === id);
    this.props.deleteNote(note.id, note.bookId);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderNotesCarousel = (notes) => {
    return <Carousel
        style={{minHeight: "280px", display:"block"}}
        items={notes}
        renderItem={note => (
            <Link to={"/notes/" + note.id} key={note.id}>
                <NoteCard
                    key={note.id}
                    title={note.title}
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
  renderNotesList = (notes) => {
    return  <List
        style={{display:"block", width: "100%" }}>
        {notes.map(note => (

            <Link to={"/notes/" + note.id} key={note.id}>
                <NoteCard
                    key={note.id}
                    listitem                   
                    title={note.title}
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
  renderNotes = (notes) => {
    if (notes.length === 0) {
      return <Header as="h3">No notes available.</Header>
    }
    if (this.state.activeItem === 'th-btn') {
      return this.renderNotesCarousel(notes)
    }
    return this.renderNotesList(notes)

  }

  render() {
    const book = this.props.books.get(this.props.match.params.id);
    if (this.props.bookFetchError) {
      return <p>{this.props.bookFetchError}</p>;
    }
    if (!book) {
      return <p>Book loading</p>;
    }
    const notes = this.props.notesByBookId[book.isbn10] || [];
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Breadcrumb>
              <Breadcrumb.Section><Link to="/">Home</Link></Breadcrumb.Section>
              <Breadcrumb.Divider> > </Breadcrumb.Divider>
              <div className="active section">{book.title} </div>
            </Breadcrumb>
          </Grid.Row>

          <Grid.Column computer={5}>
            <BookCard 
              bookId={this.props.match.params.id} 
              key={this.props.match.params.id} 
              thumbnail={book.image} 
              numberOfNotes={notes.length}
            />
          </Grid.Column>
          <Grid.Column computer={9}>
            <Header as="h3">{book.title} 
              <Header.Subheader>
                by {book.authors.join(',')} 
                <Divider/>
                <Rating disabled maxRating="5" rating={book.rating} /> {book.rating}
              </Header.Subheader>
            </Header>
            {this.renderDescription(book)}
            {this.renderToggleDescriptionButton()}
          </Grid.Column>
        </Grid>
        <Header block>
          Notes
          <Menu size="tiny" floated="right">
            <Link to={`/books/${book.isbn10}/create`}>
              <Menu.Item>
                <Icon name = 'plus'/>
              </Menu.Item>
            </Link>
            <Menu.Item name='th-btn' active={this.state.activeItem === 'th-btn'} onClick={this.handleItemClick}>
              <Icon className='th'/>
            </Menu.Item>
            <Menu.Item name='list-btn' active={this.state.activeItem === 'list-btn'} onClick={this.handleItemClick}>
              <Icon name = 'list'/>
            </Menu.Item>
          </Menu>
        </Header>

        {this.renderNotes(notes)}
      </div>
    );
  }
}
export const BookViewContainer = inject(stores => {
  return {
    notes: stores.notesStore.notes,
    notesByBookId: stores.notesStore.notesByBookId,
    getAllNotes: stores.notesStore.getAllNotes,
    updateNote: stores.notesStore.updateNote,
    deleteNote: stores.notesStore.deleteNote,
    fetchBookById: stores.booksStore.fetchBookById,
    books: stores.booksStore.books,
    bookFetchError: stores.booksStore.bookFetchError
  };
})(BookView);
