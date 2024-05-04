import React from "react";
import "../../App.css";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../../Images/Logo.jpg";
import { Link, useNavigate } from "react-router-dom";

function Navigationbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear token from local storage
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <img
          src={Logo}
          alt="Blog Logo"
          style={{ borderRadius: "50%", marginLeft: "6px" }}
        />
        <Navbar.Brand>
          <Nav.Link as={Link} to={"/dashboard"} className="text-light px-3">
            PARTY PICASSO
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to={"/chat"} className="text-light px-3">
              Group Chat
            </Nav.Link>
            <Nav.Link as={Link} to={"/profile"} className="text-light px-3">
              Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/HostForm"}
              className="text-light px-3"
              style={{ marginRight: "10px" }}
            >
              Host Form
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/weLogin"}
              className="text-light px-3"
              style={{ marginRight: "10px" }}
            >
              LogIn
            </Nav.Link>
            <Nav.Link
              onClick={handleSignOut} // Call handleSignOut function on click
              className="text-light px-3"
              style={{ marginRight: "10px" }}
            >
              Sign Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Navigationbar;
