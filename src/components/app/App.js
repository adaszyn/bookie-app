import React, { Component } from "react";
import { Link } from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bookie App</h1>
        <Link to="/about">About</Link>
      </div>
    );
  }
}
