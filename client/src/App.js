// Dependencies;
// =============:
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { useGlobalContext } from "./context/GlobalContext";
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup.js'

function App() {
  return (
  <Router>
    <div className="App">
					<Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
    </div>
    </Router>
  );
}

export default App;
