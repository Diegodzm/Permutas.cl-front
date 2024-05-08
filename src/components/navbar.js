import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



<<<<<<< HEAD
    return <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid d-flex ">
    <Link className="navbar-brand p-2 ms-4 col-9" href="#">Permutas</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register" >register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/login ' >login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/product_upload ' >product upload</Link>
        </li>
    
      </ul>
    </div>
  </div>
</nav>
=======
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
>>>>>>> d50e3b198277ed61785c08a022adb9fd2f0fa272
}

export default NavbarReact;