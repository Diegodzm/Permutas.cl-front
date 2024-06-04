import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from "../store/context"
import { useContext, useEffect } from "react"
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./navbar.css";
import logo from "./logo.jpg";

function NavbarReact() {
  const { actions } = useContext(Context)

  useEffect(() => {
    actions.accessTokenExpired()
   
}, []);
  return (
    <Navbar expand="lg" className="navbar navbar-light d-flex animate__animated animate__fadeInDown">
      <Container>
        <Navbar.Brand className='logo col-5'>
          <Link to="/">
            <img className="logo" src={logo} alt='logo' />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown className='mx-1' title="Categorías" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/categorias/electro" className="dropdown-item">Electrodomésticos</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/categorias/tecnologia" className="dropdown-item">Tecnología</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/categorias/vestimenta" className="dropdown-item">Vestimenta</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/categorias/abarrotes" className="dropdown-item">Abarrotes</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/categorias/deportes" className="dropdown-item">Deportes</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/categorias/otros" className="dropdown-item">Otros</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='mx-1'>
              <Link to='/products' className="nav-link">Productos</Link>
            </Nav.Link>
            <Nav.Link className='mx-2'>
              <Link to="/product_upload" className="nav-link">Subir Producto</Link>
            </Nav.Link>
            <Nav.Link className='mx-1'>
              <Link to="/register" className="nav-link">Registro</Link>
            </Nav.Link>
            <Nav.Link className='mx-1'>
              <Link to="/login" className="nav-link">Ingreso</Link>
            </Nav.Link>
            <Nav.Link as={Link} to="/oferta_permuta" className="offer-link">
              Oferta Permuta
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarReact;
