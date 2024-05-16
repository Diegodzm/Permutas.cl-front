import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; 
import { Context } from '../store/context';

function NavbarLogged() {
  const { actions } = useContext(Context);

  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex">
      <Container fluid>
        <Navbar.Brand className='fw-bold'>Permutas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white">Inicio</Nav.Link>
            <NavDropdown title="Categorías" id="basic-nav-dropdown" className="text-white">
              <NavDropdown.Item href="/categories">Electrodomésticos</NavDropdown.Item>
              <NavDropdown.Item href="/categories">Ropa</NavDropdown.Item>
              <NavDropdown.Item href="/categories">Muebles</NavDropdown.Item>
              <NavDropdown.Item href="/categories">Zapatillas</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/register" className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>Registro</Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>Iniciar Sesión</Nav.Link>
            <Nav.Link as={Link} to="/contacto" className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>Contacto</Nav.Link>
            <Nav.Link onClick={actions.logout} className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>Cerrar Sesión</Nav.Link>
            <Nav.Link as={Link} to="/product_upload" className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>Subir Producto</Nav.Link>
            <Nav.Link as={Link} to="/oferta_permuta" className="text-white" style={{ backgroundColor: 'rgb(66, 107, 31)', color: 'white' }}>Oferta Permuta</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLogged;
