import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar">
      <Container>
        <Navbar.Brand href="/" className="logo">
          FINANCE<span className="sub_logo">TACKER</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navLinks">
            <Nav.Link eventKey={2} href="/login" className="navLink loginLink">
              Login
            </Nav.Link>
            <Nav.Link href="/signup" className="navLink singupLink">
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
