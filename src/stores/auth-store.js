import { action, observable } from "mobx";
import { authenticate } from "../services/api-service";

export class AuthStore {
  @observable email = "";
  @observable token = "";
  @observable isLoggedIn = false;
  @observable errorMessage = null;

  @action
  logIn = (email, password) => {
    authenticate(email, password)
      .then(this.logInSuccess)
      .catch(this.logInFail);
  };
  @action
  logInSuccess = response => {
    if (response.status === 200) {
      this.token = response.data.sessionToken;
      this.isLoggedIn = true;
    } else {
        this.token = "";
        this.isLoggedIn = false;
    }

  };
  @action
  logInFail = response => {
    this.errorMessage = "There was a problem with your request.";
  };
  @action
  logOut = () => {
      this.isLoggedIn = false;
  }
  
}
