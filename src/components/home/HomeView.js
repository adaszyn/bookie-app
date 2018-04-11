import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import "./HomeView.css";

@observer
export class HomeView extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.store.setHeader("World");
      this.props.store.addBook({id: "1", name: "yello"});

    }, 1000);
  }
  render() {
    return (
      <div className="App">
        <h1>{this.props.store.header}</h1>
        {Array.from(this.props.store.books.values()).map(l => l.name)}
        <Link to="/about">About</Link>
      </div>
    );
  }
}
export const HomeViewContainer = inject(
    stores => {
        return {
            store: stores.booksStore
        }
    }
)(HomeView)
