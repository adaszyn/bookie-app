import { action, observable } from "mobx";
import { getNotes, getNote } from "../services/api-service";

export class NotesStore {
  @observable note = {};
  @observable notes = [];
  @observable loading = false;
  @observable notesFetchError = null;

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
  getNote = (id) => {
    getNote(this.authStore.token, id)
      .then(this.getNoteSuccess)
      .catch(this.getNotesFail);
  };
  @action
  getNotesSuccess = response => {
    this.notes = response.data.notes;
    this.notesFetchError = null;
  };
  @action
  getNoteSuccess = response => {
    this.note = response.data;
    this.notesFetchError = null;
  };
  @action
  getNotesFail = error => {
    console.log(error);
    this.notes = [];
    this.notesFetchError = "Could not fetch your notes";
  };
}
