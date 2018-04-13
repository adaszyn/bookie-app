import React from "react";
import {
  Grid,
  Header,
  Image,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_black.svg";

export const NotFound = () => (
    <div>
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
          <Image src={logo} />
        </Header>
        <Message>
          Lost? <Link to="/"> Home</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)