![Logo](https://raw.githubusercontent.com/adaszyn/bookie-app/master/logo.png)

## Project Description

Bookie is a web-based editor for keeping notes or bookmarks for books that individuals are currently reading. The application uses [Google Books API](https://developers.google.com/books/) and [Bookie API](https://github.com/vshivam/bookie-api/) for authentication. 

## Done  

We have completed the following things thus far: 

- Project setup
    - React.js 
    - MobX for state management
- Views
    - Login
    - Sign Up 
    - Not found page 
    - Search Bar
    - Book details
    - Notes
    - Recent notes
- API integration
    - Google Books API search call 
    - Bookie API calls (login, sign up, notes)
- Logo Created

## To do
- Notes management (creating, editing, adding)
- Using in-browser persistent storage to keep notes (offline mode)
- Notes export (PDF, epub)

## Your project file structure:

### Components 
```
src/components/
├── about
│   └── About.js (about page)
├── book
│   └── BookView.js (detailed book view)
├── book-card
│   └── BookCard.js
├── book-search
│   └── BookSearch.js
├── dashboard
│   └── DashboardWrapper.js
├── home
│   └──  HomeView.js
├── login
│   └── LoginForm.js
├── note-card
│   └── NoteCard.js
├── note-create
│   └── NoteCreateView.js
├── notes
│   └── NotesView.js
├── not-found
│   └── NotFound.js
├── private-route (restricting access to confidential data)
│   └── PrivateRoute.js
└── signup
    └── SignUpForm.js

```
Each module exports one dumb react component. Additionally, some modules export container components. Using `mobx-react` library and React Context API we inject properties of preconfigured mobx stores.  

### Services :

#### api-service 
Defines the interface for calling the authentication API. 

#### books-search-services.js
Defines the interface for calling the Google Books API. 

### Stores
There are three store classes for managing the state of the displayed books, authenticated user and the notes taken.

Each file in the folder defines the class and its methods for setting the state for the given entity.

### routes.js : 

This file contains the route definitions and which components should be rendered. 

### app.js:

Root component for the application. Initialising the state management stores and the rest of the application (routes.js).  

