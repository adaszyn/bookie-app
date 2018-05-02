import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Image, Menu } from "semantic-ui-react";
import { BookSearchContainer } from "../book-search/BookSearch";
import logo from "../../assets/logo_white.svg";

export class DashboardWrapper extends Component {
  render() {
    return (
      <div className="App">
        <Menu fixed="top" inverted size="large">
          <Container style={{ padding: "5px 0" }}>
            <Menu.Item header>
                <Image
                  as={Link} to='/'
                  size="tiny"
                  src={logo}
                  style={{ marginRight: "1.5em" }}
                />
            </Menu.Item>

            <BookSearchContainer />

          </Container>
          <Menu.Menu position="right">
            <Menu.Item name="About"  as={Link} to='/about'/>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={this.props.logOut} />
          </Menu.Menu>
        </Menu>

        <Container text style={{ marginTop: "7em" }}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
