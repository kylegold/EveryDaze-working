import React from "react"
import Nav from "../components/Nav"

const Login = () => {
  return(
    <>
    <Nav />
    <div> 
      <form>
        <input placeholder="Email" name="emailLogin"/>
        <input placeholder="Password" name="passwordLogin"/>
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  )
  }

  export default Login