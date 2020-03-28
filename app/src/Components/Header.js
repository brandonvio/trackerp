import React from "react";
import { Container, Jumbotron } from "reactstrap";

export const Header = () => {
  return (
    <Jumbotron fluid>
      <Container fluid>
        <h1 className="display-3">Purchase Tracker</h1>
        <p className="lead">
          Purchase tracking application. Coding challenge for LiteracyPro.
          <br />
          react + dotnetcore + efcore + sql server + docker
        </p>
      </Container>
    </Jumbotron>
  );
};
