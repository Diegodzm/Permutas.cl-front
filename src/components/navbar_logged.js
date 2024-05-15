import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Context } from "../store/context"
import { useContext, } from "react"
import { Link } from 'react-router-dom';
import './navbar_logged.css'
function NavbarLogged() {
  const { actions } = useContext(Context)

  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex">
      <Container>
        <Navbar.Brand className='col-6'>Permutas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav >
            <Nav.Link className='mx-1' ><Link to='/'>Home</Link></Nav.Link>
            <NavDropdown className='mx-1' title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item  ><Link to="/categorias/electro">Electrodomesticos</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/categorias/tecnologia">Tecnologia</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/categorias/vestimenta">Vestimenta</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/categorias/abarrotes">Abarrotes</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/categorias/deportes">Deportes</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/categorias/otros">Otros</Link></NavDropdown.Item>

            </NavDropdown>
            <Nav.Link className='mx-2' ><Link to='/products/user'>My Products</Link></Nav.Link>
            <Nav.Link className='mx-2' ><Link to='/product_upload'>Products Upload</Link></Nav.Link>
            <Nav.Link className='mx-1' ><Link to='/products'>Products</Link></Nav.Link>
            <Nav.Link className='mx-1' href="/" onClick={actions.logout} >Logout</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLogged;