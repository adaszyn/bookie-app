import { action, observable, computed } from "mobx";
import {
  getNotes,
  getNote,
  getNotesByBookId,
  createNote,
  updateNote,
  deleteNote
} from "../services/api-service";
import { uniq, flatten } from "lodash";
import {isNonEmpty} from "../util/string.util";

export class NotesStore {
  @observable note = {};
  @computed
  get notes() {
    return [...Object.values(this.notesById).sort(this.compareNotesByCreationDate)];
  }
  @observable notesById = {};
  @observable loading = false;
  @observable notesFetchError = null;
  @observable notesCreating = false;
  @observable notesUpdating = false;


  constructor(authStore) {
    this.authStore = authStore;
  }

  compareNotesByCreationDate (note1, note2) {
    return new Date(note2.dateCreated).getTime() - new Date(note1.dateCreated).getTime();
  }
  @computed
  get notesByBookId() {
    return this.notes.reduce((byId, note) => {
      if (byId[note.bookId]) {
        byId[note.bookId].push(note);
      } else {
        byId[note.bookId] = [note];
      }
      return byId;
    }, {});
  }
  @computed
  get allTags () {
    return uniq(flatten(this.notes.map(note => note.tags.split(",").filter(isNonEmpty)))).sort();
  }
  @computed
  get bookIds () {
      return new Set(this.notes.map(note => note.bookId))
  }

  @action
  getAllNotes = () => {
    getNotes(this.authStore.token)
      .then(this.getNotesSuccess)
      .catch(this.getNotesFail);
  };
  @action
  getNote = id => {
    getNote(this.authStore.token, id)
      .then(this.getNoteSuccess)
      .catch(this.getNotesFail);
  };
  @action
  getNotesSuccess = response => {
    this.notesById = response.data.notes.reduce((byId, note) => {
      byId[note.id] = note;
      return byId;
    }, {});
    this.notesFetchError = null;
  };
  @action
  getNoteSuccess = response => {
    this.note = response.data;
    this.notesFetchError = null;
  };
  @action
  getNotesFail = error => {
    this.notesById = {};
    this.notesFetchError = "Could not fetch your notes";
  };
  @action
  fetchNotesByBookISBN = isbn => {
    getNotesByBookId(isbn)
      .then(this.fetchNotesByBookISBNSuccess)
      .catch(this.fetchNotesByBookISBNFail);
  };
  @action fetchNotesByBookISBNSuccess = () => {};
  @action
  fetchNotesByBookISBNFail = error => {
    console.error(error);
  };
  @action
  saveNote = (bookId, title, content, isFav, tags) => {
    this.notesCreating = true;
    return createNote(bookId, title, content, isFav, tags)
      .then(this.saveNoteSuccess)
      .then(this.getAllNotes)
      .catch(this.saveNoteFail);
  };
  @action
  saveNoteSuccess = () => {
    this.notesCreating = false;
  };
  @action
  saveNoteFail = () => {
    this.notesCreating = false;
  };
  @action
  updateNote = (noteId, bookId, title, content, isFav, tags) => {
    this.notesCreating = true;
    return updateNote(noteId, bookId, title, content, isFav, tags)
      .then(this.updateNoteSuccess)
      .then(this.getAllNotes)
      .catch(this.updateNoteFail);
  };
  @action
  updateNoteSuccess = () => {
    this.notesUpdating = false;
  };
  @action
  updateNoteFail = () => {
    this.notesUpdating = false;
  };
  @action
  deleteNoteSuccess = () => {
    this.noteDeleting = false;
  };
  @action
  deleteNoteFail = () => {
    this.noteDeleting = false;
  };
  @action
  deleteNote = (noteId, bookId) => {
    this.noteDeleting = true;
    return deleteNote(noteId, bookId)
      .then(this.deleteNoteSuccess)
      .then(this.getAllNotes)
      .catch(this.deleteNoteFail)
  };
}
