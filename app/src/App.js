import React from "react";
import { NavBar } from "./Components/NavBar";
import { Header } from "./Components/Header";
import { Purchases } from "./Components/Purchases";
import { Container } from "reactstrap";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

function App() {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <div>
      <Container>
        {promiseInProgress && <LoadingIndicator />}
        <NavBar />
        <br />
        <Header />
        <Purchases />
      </Container>
    </div>
  );
}

const LoadingIndicator = () => {
  const style = {
    zIndex: 1000,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
  return (
    <div style={style}>
      <Loader type="Oval" color="#3498DB" height={200} width={200} />
    </div>
  );
};

export default App;
