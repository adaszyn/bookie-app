# Bookie App


A README file (in English) in your Git repository detailing:

## Short description of your project -

Bookie is a web-based editor for keeping notes or bookmarks for books that individuals are currently reading.

## What you have done - 

We have completed the following things thus far: 

- Routing 
- Using MobX for state management 
- Login Functionality 
- Not found page 
- Implementing Google Books API
- Implementing Dashboard View for browsing your books
- Implementing Notes View for browsing the notes from the books you've read 
- Logo Created

## What you still plan to do:


## Your project file structure (short description/purpose of each file):

### Components  : 

Contains all the sub-components for the application 

### Services :

#### api-service 
Defines the interface for calling the authentication API. 

#### books-search-services.js
Defines the interface for calling the Google Books API. 

### Stores : 
There are 3 store classes for managing the state of the displayed books, authenticated user and the notes taken.

Each file in the folder defines the class and its methods for setting the state for the given entity.

### routes.js : 

This file contains the route definitions and which components should be rendered. 

### app.js:

Root component for the application. Initialising the state management stores and the rest of the application (routes.js).  

