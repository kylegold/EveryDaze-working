import React from "react"
import Nav from "../components/Nav"

const Signup = () => {
  return(
    <>
    <Nav />
    <div> 
      <form>
        <input placeholder="Email" name="emailSignup"/>
        <input placeholder="Password" name="passwordSignup"/>
        <button type="submit">Signup</button>
      </form>
    </div>
    </>
  )
  }

  export default Signup