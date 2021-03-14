import React from "react"
import {Link} from "react-router-dom"
import "./style.css"
import logo from "../../assets/EveryDaze.png"

const Nav = () => {
  return(
    <header>
    <img src={logo} alt="EveryDaze" />
    <ul className="nav">
      <li>
        {/* <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link> */}
      </li>
    </ul>
  </header>
  )
}

export default Nav