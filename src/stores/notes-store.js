import { action, observable, computed } from "mobx";
import {
  getNotes,
  getNote,
  getNotesByBookId,
  createNote,
  updateNote,
} from "../services/api-service";

export class NotesStore {
  @observable note = {};
  @computed
  get notes() {
    return [...Object.values(this.notesById)];
  }
  @observable notesById = {};
  @observable loading = false;
  @observable notesFetchError = null;
  @observable notesCreating = false;
  @observable notesUpdating = false;
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

  constructor(authStore) {
    this.authStore = authStore;
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
  saveNote = (bookId, content, isFav) => {
    this.notesCreating = true;
    return createNote(bookId, content, isFav)
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
  updateNote = (bookId, content, isFav) => {
    this.notesCreating = true;
    return updateNote(bookId, content, isFav)
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

}
