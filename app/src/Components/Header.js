import React from "react";
import { Container, Jumbotron } from "reactstrap";

export const Header = () => {
  return (
    <Jumbotron fluid>
      <Container fluid>
        <h1 className="display-3">Purchase Tracker</h1>
        <p className="lead">
          Purchase tracking application.
          <br />
          react + nodejs + lambda + dynamodb + api gateway + s3 + iac with terraform
        </p>
      </Container>
    </Jumbotron>
  );
};
