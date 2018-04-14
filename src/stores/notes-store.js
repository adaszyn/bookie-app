import { action, observable } from "mobx";
import { getNotes } from "../services/api-service";

export class NotesStore {
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
  getNotesSuccess = response => {
    this.notes = response.data.notes;
    this.notesFetchError = null;
  };
  @action
  getNotesFail = error => {
    console.log(error);
    this.notes = [];
    this.notesFetchError = "Could not fetch your notes";
  };
}
