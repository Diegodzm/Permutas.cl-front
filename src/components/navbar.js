import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Context } from "../store/context"
import { useContext,  } from "react"

function NavbarReact() {
  const { actions, } = useContext(Context)
 
  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex">
      <Container>
        <Navbar.Brand className='col-8'>Permutas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/register" >Register</Nav.Link>
            <Nav.Link href="/login" >Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarReact;