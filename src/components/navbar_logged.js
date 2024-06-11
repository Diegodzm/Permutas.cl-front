import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./logo.jpg";
import { Context } from "../store/context";
import { Link } from 'react-router-dom';
import './navbar_logged.css';

function NavbarLogged() {
    const { store, actions } = useContext(Context);

    return (
        <Navbar expand="lg" className="navbar navbar-light">
            <Container>
                <Navbar.Brand className='logo col-6' ><Link to="/"><img className="logo" src={logo} alt='logo'></img></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Categorías" id="basic-nav-dropdown" className="mx-1">
                            <NavDropdown.Item><Link to="/categorias/electro">Electrodomésticos</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/categorias/tecnologia">Tecnología</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/categorias/vestimenta">Vestimenta</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/categorias/abarrotes">Abarrotes</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/categorias/deportes">Deportes</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/categorias/otros">Otros</Link></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className='mx-1 '><Link to='/products'>Productos</Link></Nav.Link>
                       
                        {store.validation ? (
                            <>
                                 <Nav.Link className='mx-2 col-3'><Link to="/product_upload">Subir Producto</Link></Nav.Link>
                                <NavDropdown title={store.username}>
                                    <Nav.Link className='mx-2'><Link to='/products/user'>Mis Productos</Link></Nav.Link>
                                    <Nav.Link className='mx-2'><Link to='/wishlist'>Favoritos</Link></Nav.Link>
                                    <Nav.Link className='mx-2' href="/" onClick={actions.logout}>Salir</Nav.Link>
                                </NavDropdown>
                                <Nav.Link className='mx-2'><Link to='/EmailForm'>Contacto</Link></Nav.Link>
                                <Link to="/notifications" className="notification-icon"><div className='notificacion d-flex'><i className="fas fa-envelope notificaciones mb-1"></i><div className="numeronotificacion ">{store.usernotifications.length}</div></div></Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link className='mx-1'><Link to="/register">Registro</Link></Nav.Link>
                                <Nav.Link className='mx-1'><Link to="/login">Ingreso</Link></Nav.Link>
                                
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarLogged;
