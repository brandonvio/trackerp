import React from "react";
import { NavBar } from "./Components/NavBar";
import { Header } from "./Components/Header";
import { Purchases } from "./Components/Purchases";
import { Container } from "reactstrap";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./App.css";

function App() {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <div>
      {promiseInProgress && <LoadingIndicator />}
      <Container>
        <NavBar />
        <br />
        <Header />
        <Purchases />
      </Container>
    </div>
  );
}

const LoadingIndicator = () => {
  return (
    <div className="exactCenter">
      <Loader type="ThreeDots" color="#3498DB" height={100} width={100} />
    </div>
  );
};

export default App;
