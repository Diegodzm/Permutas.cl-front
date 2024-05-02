import { Link } from "react-router-dom"


const Navbar=()=>{

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
    
      </ul>
    </div>
  </div>
</nav>
}

export default Navbar