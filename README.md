![Logo](https://raw.githubusercontent.com/adaszyn/bookie-app/master/logo.png)

## Project Description

[Bookie](https://bookie.adaszyn.site/) is a web-based editor for keeping notes for books that individuals are currently reading. The application uses [Google Books API](https://developers.google.com/books/) and [Bookie API](https://github.com/vshivam/bookie-api/) for authentication.

## Features

* Search Books
	* Search bar shows the top results for English books in a dropdown list with an option to show more results.
	* If you click on 'Show more' results, you can search for books in English, French, German and Italian.
	* When you click on a book, you can read the brief and detailed description and create notes.

* Create Notes
	* Below the book’s description, the notes section has a ‘+’ button to create a new note.
	* Notes have title and content. Content can include text as well as pictures which can be dragged into the note.
	* Notes can be marked as favourite (heart) and in order to make searching easier, tags can either be dragging in or added by clicking on the tag icon.

* Search Notes
	* Recently edited notes are found on the home page in chronological order.
	* ‘All notes’ in the top bar will allow you to sort notes based on creation or modified date. Notes can also be filtered by tags or favourites and viewed in tile or list view.
	* If you only remember the book title, notes can be found by either searching for the book in Search bar or in ‘My books’ section of home page.

* Edit Notes
	* Clicking on any existing note in the home page or inside a book allows the user to edit both the title and content.
	* To edit or delete the tags on the note or mark a note as favourite, it is possible to do it on home page, book page, all notes page and edit notes page.
	* To delete all notes for a book, you can click on the trash icon in the ‘My books’ section of home page.

* About page
	* Information about Bookie and the team members.


## Installation
After installing Yarn package manager, running the app is simple:
```bash
yarn
yarn start
```
By default Bookie will use development API (https://api.adaszyns.site/bookie).

## Building
To create production JS bundle, use:
```bash
yarn build
```
## Structure

### Components 
```
src/components/
├── about
│   └── About.js
├── book
│   ├── BookCard.js
│   ├── BookSearch.js
│   └── BookView.js
├── dashboard
│   └── DashboardWrapper.js
├── editor
│   ├── DroppableMarkdownEditor.js
│   ├── MarkdownEditor.js
│   ├── RTEContainer.js
│   └── RTE.js
├── home
│   ├── HomeView.js
│   └── sample-books.json
├── login
│   └── LoginForm.js
├── notes
│   ├── AllNotesView.js
│   ├── NoteCard.js
│   ├── NoteCreateView.js
│   ├── NoteListItem.js
│   ├── NotesView.js
│   └── NoteTileItem.js
├── not-found
│   └── NotFound.js
├── search
│   ├── SearchResult.js
│   └── SearchView.js
├── signup
│   └── SignUpForm.js
├── tags
│   ├── DraggableTag.js
│   ├── DraggableTags.js
│   ├── FilterByTags.js
│   ├── TagBubble.js
│   ├── TagsDropZone.js
│   ├── TagsEditor.js
│   └── TagStrip.js
└── util
    ├── Carousel.js
    ├── ConfirmPopup.js
    ├── LoadingPlaceholder.js
    └── PrivateRoute.js


```
Each module exports one dumb react component. Additionally, some modules export container components. Using `mobx-react` library and React Context API we inject properties of preconfigured mobx stores.  

### Services

#### api-service 
Defines the interface for calling the authentication API. 

#### books-search-services.js
Defines the interface for calling the Google Books API. 

### Stores
There are three store classes for managing the state of the displayed books, authenticated user and the notes taken.

Each file in the folder defines the class and its methods for setting the state for the given entity.

### routes.js

This file contains the route definitions and which components should be rendered. 

### app.js

Root component for the application. Initialising the state management stores and the rest of the application (routes.js).  

