import React from "react";
import { NavBar } from "./Components/NavBar";
import { Header } from "./Components/Header";
import { Purchases } from "./Components/Purchases";
import { Container } from "reactstrap";

function App() {
  return (
    <div>
      <Container>
        <NavBar />
        <br />
        <Header />
        <Purchases />
      </Container>
    </div>
  );
}

export default App;
