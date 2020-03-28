import React from "react";
import { NavBar } from "./Components/NavBar";
import { Header } from "./Components/Header";
import { Purchases } from "./Components/Purchases";
import "./App.css";
import { Container } from "reactstrap";

function App() {
  // const [collapsed, setCollapsed] = useState(true);
  // const toggleNavbar = () => setCollapsed(!collapsed);

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
