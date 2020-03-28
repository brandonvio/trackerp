import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

export const NavBar = () => {
  return (
    <Navbar dark expand="md" className={"bg-dark"}>
      <NavbarBrand href="/" className="mr-auto">
        Purchase Tracker
      </NavbarBrand>
    </Navbar>
  );
};
