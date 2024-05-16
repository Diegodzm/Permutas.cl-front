import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from "../store/context"
import { useContext } from "react"

function NavbarReact() {
  const { actions } = useContext(Context)

  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex">
      <Container fluid>
        <Navbar.Brand className='fw-bold'>Permutas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>Inicio</Nav.Link>
            <Nav.Link href="/register" className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>Registro</Nav.Link>
            <Nav.Link href="/login" className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>Iniciar Sesión</Nav.Link>
            <Nav.Link href="/product_upload" className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>Subir Producto</Nav.Link>
            <Nav.Link href="/contacto" className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>Contacto</Nav.Link>
            <Nav.Link href="/oferta_permuta" className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>ofertas</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarReact;
