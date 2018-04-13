import { action, observable } from "mobx";
import { authenticate, register } from "../services/api-service";

export class AuthStore {
  @observable email = "";
  @observable token = "";
  @observable isLoggedIn = false;
  @observable loginErrorMessage = null;
  @observable signUpErrorMessage = null;

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
    this.loginErrorMessage = "There was a problem with your request.";
  };
  @action
  logOut = () => {
    this.isLoggedIn = false;
  };
  @action
  signUp = (email, password) => {
    register(email, password)
      .then(this.signUpSuccess)
      .catch(this.signUpFail);
  };
  @action
  signUpFail = response => {
    this.signUpErrorMessage = "There was a problem with your request.";
  };
  @action
  signUpSuccess = response => {
    if (response.status === 200) {
      if (response.data.errorMessage) {
        this.token = response.data.sessionToken;
        this.isLoggedIn = false;
        this.signUpErrorMessage = response.data.errorMessage;
      } else {
        this.token = response.data.sessionToken;
        this.isLoggedIn = true;
      }
    } else {
      this.token = "";
      this.isLoggedIn = false;
    }
  };
}
