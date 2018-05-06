import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Image, Menu, Grid } from "semantic-ui-react";
import { BookSearchContainer } from "../book-search/BookSearch";
import logo from "../../assets/logo_white.svg";

export class DashboardWrapper extends Component {
  render() {
    return (
      <div className="App">
        <Menu fixed="top" inverted size="large">
          <Container style={{ padding: "5px 0" }}>
            <Grid style={{width: "100%"}}>
              <Grid.Row className="doubling four column">
                <Grid.Column computer={3}>
                  <Menu.Item header>
                    <Image
                      as={Link} to='/'
                      size="tiny"
                      src={logo}
                      style={{ marginRight: "1.5em" }}
                    />
                  </Menu.Item>
                </Grid.Column>
                <Grid.Column computer={7}><BookSearchContainer /></Grid.Column>
                <Grid.Column computer={3}><Menu.Item name="About"  as={Link} to='/about'/></Grid.Column>
                <Grid.Column computer={3}><Menu.Item name="logout" onClick={this.props.logOut} /></Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Menu>

        <Container text style={{ marginTop: "7em" }}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
