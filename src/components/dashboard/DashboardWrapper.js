import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Image, Menu } from "semantic-ui-react";
import { BookSearchContainer } from "../book-search/BookSearch";
import logo from "../../assets/logo_white.svg";
import "./DashboardWrapper.css";

export class DashboardWrapper extends Component {
  render() {
    return (
      <div className="App">
        <Menu fixed="top" inverted size="large">
          <Container className="navbar">
            <Menu.Item header>
              <Image as={Link} to="/" src={logo} className="logo" />
            </Menu.Item>
            <BookSearchContainer />
            <Menu.Item
              position="right"
              name="All Notes"
              as={Link}
              to="/notes"
            />
            <Menu.Item position="right" name="About" as={Link} to="/about" />
            <Menu.Item
              position="right"
              name="logout"
              onClick={this.props.logOut}
            />
          </Container>
        </Menu>

        <Container text style={{ marginTop: "7em" }}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
