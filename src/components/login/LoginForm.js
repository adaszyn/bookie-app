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
import logo from "../../assets/logo_black.svg";

@observer
export class LoginForm extends Component {
  state = {
    email: "",
    password: ""
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
  navigateToDashboardIfLoggedIn = () => {
    if (this.props.isLoggedIn) {
      this.props.history.push("/");
    }
  };
  componentDidMount = this.navigateToDashboardIfLoggedIn;
  componentWillReact = this.navigateToDashboardIfLoggedIn;

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
            <Header as="h2" color="teal" textAlign="center">
              <Image src={logo} /> Log-in to your account
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
              New to us? <a>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export const LoginFormContainer = inject(stores => ({
  onSubmit: stores.authStore.logIn,
  isLoggedIn: stores.authStore.isLoggedIn
}))(LoginForm);
