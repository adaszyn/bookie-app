import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_black.svg";

@observer
export class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
    repeatedPassword: "",
    formError: ""
  };
  onEmailChange = ({ target: { value } }) => {
    this.setState({ email: value });
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(this.state.email) ){
      this.setState({ formError: "" });
    } else{
      this.setState({ formError: "Enter a valid email!" });
    }
  };
  onPasswordChange = ({ target: { value } }) => {
    if (this.state.repeatedPassword !== value) {
      this.setState({ formError: "Passwords must match!" });
    } else {
      this.setState({ formError: "" });
    }
    this.setState({ password: value });
  };
  onRepeatedPasswordChange = ({ target: { value } }) => {
    if (value !== this.state.password) {
      this.setState({ formError: "Passwords must match!" });
    } else {
      this.setState({ formError: "" });
    }
    this.setState({ repeatedPassword: value });
  };
  onSubmit = () => {
    this.props.onSubmit(this.state.email, this.state.password);
  };

  render() {
    const submitDisabled =
      this.state.formError !== "" || this.state.email === "" || this.state.repeatedPassword === "";
    return (
      <div className="login-form">
        {/* //TODO: move styles to LoginForm.css   */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image style={{ width: "140px" }} src={logo} />
              <br />
              <br />
              Create your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  value={this.state.email}
                  onChange={this.onEmailChange}
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  value={this.state.repeatedPassword}
                  onChange={this.onRepeatedPasswordChange}
                  iconPosition="left"
                  placeholder="Repeat password"
                  type="password"
                />

                <Button
                  disabled={submitDisabled}
                  onClick={this.onSubmit}
                  color="teal"
                  fluid
                  size="large"
                >
                  Sign up
                </Button>
              </Segment>
            </Form>
            {this.props.errorMessage || this.state.formError ? (
              <Message style={{ color: "red" }}>
                {this.props.errorMessage}
                {this.state.formError}
              </Message>
            ) : null}
            <Message>
              Back to <Link to="/login"> Log In</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export const SignUpFormContainer = inject(stores => ({
  onSubmit: stores.authStore.signUp,
  errorMessage: stores.authStore.signUpErrorMessage
}))(SignUpForm);
