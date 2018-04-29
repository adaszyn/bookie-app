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
export class LoginForm extends Component {
  state = {
    email: "admin@admin.com",
    password: "admin"
  };
  onEmailChange = ({ target: { value } }) => {
    this.setState({ email: value });
  };
  onPasswordChange = ({ target: { value } }) => {
    this.setState({ password: value });
  };
  onSubmit = () => {
    this.props.onSubmit(this.state.email, this.state.password);
  };

  render() {
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
            <Header as="h3" color="teal" textAlign="center">
              <Image src={logo} size="tiny" style={{ width: "140px" }} />
              <br />
              <br />
              Log-in to your account
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

                <Button onClick={this.onSubmit} color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/signup"> Sign Up</Link>
            </Message>
            {this.props.errorMessage && <Message style={{ color: "red" }}>
              {this.props.errorMessage}
            </Message>}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export const LoginFormContainer = inject(stores => ({
  onSubmit: stores.authStore.logIn,
  isLoggedIn: stores.authStore.isLoggedIn,
  errorMessage: stores.authStore.loginErrorMessage,
}))(LoginForm);
