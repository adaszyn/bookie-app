import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Container, Dropdown, Header, Image, Menu } from "semantic-ui-react";
import { BookSearchContainer } from "../book-search/BookSearch";
import logo from "../../assets/logo_white.svg"
import "./HomeView.css";

@observer
export class HomeView extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.store.setHeader("World");
      this.props.store.addBook({ id: "1", name: "yello" });
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              <Image
                size="mini"
                src={logo}
                style={{ marginRight: "1.5em" }}
              />
              Bookie
            </Menu.Item>

            <BookSearchContainer />

            <Dropdown item simple text="Dropdown">
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className="dropdown icon" />
                  <span className="text">Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active
              onClick={this.props.logOut}
            />
          </Menu.Menu>
        </Menu>

        <Container text style={{ marginTop: "7em" }}>
          <Header as="h1">Welcome to Bookie App!</Header>
          <h1>{this.props.store.header}</h1>
          <Link to="/about">About</Link>
        </Container>
      </div>
    );
  }
}
export const HomeViewContainer = inject(stores => {
  return {
    store: stores.booksStore,
    logOut: stores.authStore.logOut
  };
})(HomeView);
