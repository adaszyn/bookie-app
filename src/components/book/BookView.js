import React, { Component } from "react";
import { Breadcrumb, Header } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

@observer
export class BookView extends Component {

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section>Home</Breadcrumb.Section>
          <Breadcrumb.Divider> > </Breadcrumb.Divider>
          <div class="active section">Book {this.props.match.params.id} </div>
        </Breadcrumb>
        <Header as="h1">Book {this.props.match.params.id} </Header>
      </div>
    );
  }
}
export const BookViewContainer = inject(stores => {})(BookView);
