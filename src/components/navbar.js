import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



function NavbarReact() {

  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex">
      <Container>
        <Navbar.Brand className='col-8'>Permutas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
     
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="/categories">Electrodomesticos</NavDropdown.Item>
              <NavDropdown.Item href="/categories">Ropa</NavDropdown.Item>
              <NavDropdown.Item href="/categories">Muebles</NavDropdown.Item>
              <NavDropdown.Item href="/categories">Zapatillas</NavDropdown.Item>

            </NavDropdown>
            <Nav.Link href="/register" >Register</Nav.Link>
            <Nav.Link href="/login" >Login</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarReact;