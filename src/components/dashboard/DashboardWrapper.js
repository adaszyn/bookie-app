import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Image, Menu } from "semantic-ui-react";
import { BookSearchContainer } from "../book/BookSearch";
import logo from "../../assets/logo_white.svg";
import "./DashboardWrapper.css";
import Responsive from "semantic-ui-react/dist/es/addons/Responsive/Responsive";

export class DashboardWrapper extends Component {
  render() {
    return (
      <div className="App">
        <Container className="navbar">
        <Menu fixed="top" inverted size="large">
            <Menu.Item header>
              <Image as={Link} to="/" src={logo} className="logo" />
            </Menu.Item>
            <Menu.Item>
              <Responsive minWidth={1000}>
                <BookSearchContainer />
              </Responsive>
            </Menu.Item>
            <Menu.Item
              position="right"
              name="All Notes"
              as={Link}
              to="/notes"
            />
            <Responsive maxWidth={1000} as="a" className="right item" href="/search">
              Search
            </Responsive>
            <Menu.Item position="right" name="About" as={Link} to="/about" />
            <Menu.Item
              position="right"
              name="logout"
              onClick={this.props.logOut}
            />
        </Menu>
        </Container>

        <Container text style={{ marginTop: "7em" }}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
