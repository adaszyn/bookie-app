![Logo](https://raw.githubusercontent.com/adaszyn/bookie-app/master/logo.png)

## Project Description

[Bookie](https://bookie.adaszyn.site/) is a web-based editor for keeping notes or bookmarks for books that individuals are currently reading. The application uses [Google Books API](https://developers.google.com/books/) and [Bookie API](https://github.com/vshivam/bookie-api/) for authentication. 


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

