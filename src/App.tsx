import React from 'react';
import './App.css';
import { Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Plant from './components/Plant/Plant';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/plant">Plant</Nav.Link>
        </Nav>
      </Navbar>
      <Router>
        <Switch>
          <Route path="/plant">
            <Plant />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
