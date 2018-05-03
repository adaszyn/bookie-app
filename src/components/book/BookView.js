import React, { Component } from "react";
import { Grid, Breadcrumb, Header, Button, List, Menu, Icon, Rating, Divider, Popup, Dropdown, Label } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { BookCard } from "../book-card/BookCard";
import { NoteViewContainer } from "../note-card/NoteCard";
import { Link } from "react-router-dom";
import { Carousel } from "../carousel/Carousel";
import {LoadingPlaceholder} from "../loading/LoadingPlaceholder";
import {DraggableTagsContainer} from "../tags/DraggableTags";

import {generateHash} from "../../util/string.util";
import {COLORS} from "../../const/colors-const";


@observer
export class BookView extends Component {
  state = {
    descriptionExpanded: false,
    activeItem: "th-btn", 
    showOnlyFav: false, 
    filterByTags: []
  };

  componentWillReceiveProps(newProps) {
    const bookId = this.props.match.params.id;
    const newBookId = newProps.match.params.id;
    if (bookId !== newBookId) {
      newProps.fetchBookById(newBookId);
    }
  }
  componentDidMount() {
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
      return <Button size ="tiny" onClick={this.toggleDescription}> Show less </Button>;
    } else {
      return <Button size ="tiny" onClick={this.toggleDescription}>Show more </Button>;
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  toggleFav = () => {
    this.setState({
      showOnlyFav: !this.state.showOnlyFav
    })
  }

  renderNotesCarousel = (notes) => {
    return <Carousel
        style={{minHeight: "280px", display:"block"}}
        items={notes}
        renderItem={note => (
            <Link to={"/notes/" + note.id} key={note.id}>
                <NoteViewContainer
                  key={note.id}
                  noteId={note.id}
                  title={note.title}
                  isFav={note.isFav}
                  meta={note.dateModified}
                  description={note.content}
                  tags={note.tags}
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
                <NoteViewContainer
                  key={note.id}
                  noteId={note.id}
                  listitem                   
                  title={note.title}
                  isFav={note.isFav}
                  meta={note.dateModified}
                  description={note.content}
                  tags={note.tags}
                />
            </Link>
        ))}
    </List>
  }
  onTagsFilterChanged = (e, data) => {
    console.log(data.value);
    this.setState({
      filterByTags: data.value
    })
    console.log(this.state);
  }
  renderNotes = (notes) => {
    if((this.state.showOnlyFav || this.state.filterByTags.length > 0) && notes.length === 0){
      return (
        <div>
          <Header as="h3"> No notes match your filter criteria</Header>
        </div>
      )
    }
    if (notes.length === 0) {
      return <Header as="h3">Click on the Plus (+) icon to start creating a new note</Header>
    }
    if (this.state.activeItem === 'th-btn') {
      return this.renderNotesCarousel(notes)
    }
    return this.renderNotesList(notes)

  }

  render() {
    const book = this.props.books.get(this.props.match.params.id);
    const tags = this.props.allTags;
    const filterByTags = this.state.filterByTags;

    if (this.props.bookFetchError) {
      return <p>{this.props.bookFetchError}</p>;
    }
    if (!book) {
      return ( 
        <LoadingPlaceholder/>
      );
    }
    let notes = this.props.notesByBookId[book.isbn10] || [];
    if(this.state.showOnlyFav){
      notes = notes.filter(note => note.isFav)
    }
    if(filterByTags.length > 0){
      notes = notes.filter(note => filterByTags.every(filter => note.tags.indexOf(filter) > -1));
    }
    const dropdownOptions = this.props.allTags.map(tag => {
      let colorFn = () => {return COLORS[generateHash(tag) % COLORS.length]};
      let color = colorFn(tag);
      return ({
        'key': tag, 
        'value': tag, 
        'text': tag, 
        'content': <Label color={color}> {tag} </Label>
      });
    });
    const renderLabel = (label) => {
      let color = () => {return COLORS[generateHash(label.text) % COLORS.length]};
      return {
        color: color(),
        content: `${label.text}`,
      }
    }
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
            <Header as="h2">{book.title} 
              <Header.Subheader>
                by {book.authors.join(', ')} 
                <Divider/>
                <Rating disabled maxRating="5" rating={book.rating} /> {book.rating}
              </Header.Subheader>
            </Header>
            {this.renderDescription(book)}
            {this.renderToggleDescriptionButton()}
          </Grid.Column>
        </Grid>
        <Header block as="h2">
          Notes
          <Menu size="tiny" floated="right">
            <Menu.Item name='th-btn' active={this.state.activeItem === 'th-btn'} onClick={this.handleItemClick}>
              <Icon className='th'/>
            </Menu.Item>
            <Menu.Item name='list-btn' active={this.state.activeItem === 'list-btn'} onClick={this.handleItemClick}>
              <Icon name = 'list'/>
            </Menu.Item>
          </Menu>

          <Menu size="tiny" floated="right">
            <Dropdown 
              renderLabel = {renderLabel}
              onChange={this.onTagsFilterChanged}
              floated="right" 
              size="tiny" 
              placeholder='Filter by tags' 
              multiple 
              search 
              selection 
              options={dropdownOptions} 
              noResultsMessage="No more tags found"/>
              <Popup
              trigger={
                <Menu.Item 
                  active={this.state.showOnlyFav}
                  onClick={this.toggleFav}>
                  <Icon name="heart" />
                </Menu.Item>}
              content='Show only Favorite notes'
            />
          </Menu>
          <Menu size="tiny" floated="right">
            <Link to={`/books/${book.isbn10}/create`}>
              <Menu.Item>
                <Icon name = 'plus'/>
              </Menu.Item>
            </Link>
          </Menu>
        </Header>
        {notes.length > 0 ? (<DraggableTagsContainer />): null}
        <br/>
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
    bookFetchError: stores.booksStore.bookFetchError,
    allTags: stores.notesStore.allTags,
  };
})(BookView);
