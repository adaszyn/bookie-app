import {NotesStore} from "./stores/notes-store";
import {SearchStore} from "./stores/search-store";
import {BooksStore} from "./stores/books-store";
import {AuthStore} from "./stores/auth-store";

const authStore = new AuthStore();
const notesStore = new NotesStore(authStore);
const booksStore = new BooksStore(notesStore);
const searchStore = new SearchStore();

notesStore.setBooksStore(booksStore);

export default {authStore, notesStore, booksStore, searchStore};