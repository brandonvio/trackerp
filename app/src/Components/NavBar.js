import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

export const NavBar = () => {
  return (
    <Navbar expand="md" className={"navbar-dark bg-primary"}>
      <NavbarBrand href="/" className="mr-auto">
        Purchase Tracker
      </NavbarBrand>
    </Navbar>
  );
};
