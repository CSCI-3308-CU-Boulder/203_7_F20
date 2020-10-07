import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import EnvNavbar from './components/EnvNavbar'
import Home from './views/Home'
import User from './views/User'

function App() {
  return (
    <Router>
      
      <EnvNavbar />

      <Switch>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
