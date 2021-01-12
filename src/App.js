import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Item from './components/item/Item';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Sales from './components/sale/Sales';

function App() {
  return (
    <Router>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand>RotaSales</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/sales">Vendas</Nav.Link>
            <NavDropdown title="Items" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/items">Listagem</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ width: '90vw', margin: 'auto', marginTop: '15px' }}>
        <Switch>
          <Route path="/sales">
            <Sales />
          </Route>
          <Route path="/items">
            <Item />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
