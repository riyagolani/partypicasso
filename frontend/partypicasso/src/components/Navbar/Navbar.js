import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../../Images/Logo.jpg";
import { Link, useNavigate } from "react-router-dom";

function Navigationbar() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfo?.data?.role;
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/signout");
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
          <Nav.Link as={Link} to={"/"} className="text-light px-3">
            PARTY PICASSO
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            {role === "user" && (
              <>
                <Nav.Link
                  as={Link}
                  to={"/dashboard"}
                  className="text-light px-3"
                >
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to={"/chat"} className="text-light px-3">
                  Group Chat
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={"/bookings"}
                  className="text-light px-3"
                >
                  Bookings
                </Nav.Link>
                <Nav.Link as={Link} to={"/profile"} className="text-light px-3">
                  Profile
                </Nav.Link>
              </>
            )}
            {role === "host" && (
              <>
                <Nav.Link
                  as={Link}
                  to={"/hostdashboard"}
                  className="text-light px-3"
                >
                  Host Dashboard
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={"/hostform"}
                  className="text-light px-3"
                >
                  Host Form
                </Nav.Link>
              </>
            )}
            {role === "admin" && (
              <Nav.Link as={Link} to={"/admindashboard"} className="text-light px-3">
                Dashboard
              </Nav.Link>
            )}
            {role && (
              <Nav.Link onClick={handleSignOut} className="text-light px-3">
                Sign Out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Navigationbar;
