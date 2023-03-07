import React from 'react'
import { Link , useNavigate, useLocation} from "react-router-dom";

const Navbar = (props) => {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('./login')
  }
  const location = useLocation();
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className={`nav-link ${ location.pathname === "/home" ? "active" : "" }`} aria-current="page" to={!localStorage.getItem("token") ? `/` : "/home"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
        <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'} mx-3`}>
        <input className="form-check-input" onClick={()=>{props.toggleMode()}} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Toggle Mode</label>
      </div>
      {!localStorage.getItem('token')?<form className="d-flex">
        <Link className='btn mx-2' to="/login" role="button" style={{backgroundColor:props.mode==='light'?'#0d6efd':'#ffd700',color:props.mode==='light'?'white':'black'}}>Login</Link>
        <Link className='btn mx-2' to="/signup" role="button"style={{backgroundColor:props.mode==='light'?'#0d6efd':'#ffd700',color:props.mode==='light'?'white':'black'}}>SignUp</Link>
      </form>:<button onClick={handleLogout} className="btn" style={{backgroundColor:props.mode==='light'?'#0d6efd':'#ffd700',color:props.mode==='light'?'white':'black'}}>Logout</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar
