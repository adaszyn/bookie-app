import React, { Component, Fragment } from "react";
import { Grid, Container, Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";

export class About extends Component {
  state = {};
  render() {
    return (
      <Grid stretched textAlign="left">
       <Grid.Row>
          <Breadcrumb>
            <Breadcrumb.Section><Link to="/">Home</Link></Breadcrumb.Section>
            <Breadcrumb.Divider> > </Breadcrumb.Divider>
            <div className="active section">About</div>
          </Breadcrumb>
        </Grid.Row>

        <Grid.Row>
          <Container size="big">
            <h1>What is Bookie?</h1>
            <p>Bookie is a web-based editor for keeping notes for books that you are currently reading. </p>
            <h1>The team behind Bookie</h1>
            <p>Four KTH students - <a href="https://github.com/adaszyn"> Wojtek </a>, <a href="https://github.com/vshivam"> Shivam </a>,
              <a href="https://github.com/ksoutar15"> Keira </a> and <a href="https://github.com/ranjini1992"> Ranjini </a> took the course DH2642 - Interaction Programming and the Dynamic Web.
              They were asked to build something cool and they decided to make book notes great again.</p>
            <h1>The fun story of how Bookie was built</h1>
            <p>After spending a lifetime on Goodreads and Keep, the four founders of Bookie picked some good features from here and there. They created sketches on paper, then on Sketch (the software).</p>
            <p>Then, they proceeded to build Bookie version 0.1 using the Google Books API and their own <a href="https://api.adaszyn.site/bookie/notes/"> awesome Bookie API </a> which can validate user credentials, save notes and note tags.</p>
            <p>Currently, it is still a work in progress. If you have any constructive feedback, please create a note on Bookie and we promise that we will read it.</p>
          </Container>
        </Grid.Row>
      </Grid>
    );
  }
}
export const AboutContainer = About;