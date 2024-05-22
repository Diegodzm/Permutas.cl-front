import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./logo.jpg"
import { Context } from "../store/context"
import { useContext, } from "react"
import { Link } from 'react-router-dom';
import './navbar_logged.css'
function NavbarLogged() {
  const { store, actions } = useContext(Context)

  return (
    <Navbar expand="lg" className=" navbar navbar-light  d-flex">
      <Container>
      <Navbar.Brand className='logo col-5'  ><Link to="/"><img  className="logo" src={logo} alt='logo'></img></Link></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav >
          
            <NavDropdown className='mx-1' title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item  ><Link to="/categorias/electro">Electrodomesticos</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/categorias/tecnologia">Tecnologia</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/categorias/vestimenta">Vestimenta</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/categorias/abarrotes">Abarrotes</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/categorias/deportes">Deportes</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/categorias/otros">Otros</Link></NavDropdown.Item>


            </NavDropdown>
            <NavDropdown title={store.username}>
              <Nav.Link className='mx-2' ><Link to='/products/user'>Mis Productos</Link></Nav.Link>
              <Nav.Link className='mx-2' ><Link to='/wishlist'>Favoritos</Link></Nav.Link>


            </NavDropdown>

            <Nav.Link className='mx-1' ><Link to='/product_upload'>Subir Producto</Link></Nav.Link>
            <Nav.Link className='mx-1' ><Link to='/products'>Productos</Link></Nav.Link>
            <Nav.Link className='mx-1' href="/" onClick={actions.logout} >Salir</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLogged;