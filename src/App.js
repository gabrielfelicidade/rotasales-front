import './App.css';
import { Link, Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Sales from './components/sale/Sales';
import Login from './components/login/Login';
import { AuthProvider } from './hooks/Authentication';
import ProtectedRoute from './components/route/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Route path="/login" component={Login} />
          <Route path="/" render={({ match: { url } }) => (
            <>
              <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand>RotaSales</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/sales">Vendas</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <div style={{ width: '90vw', margin: 'auto', marginTop: '15px' }}>
                <Switch>
                  <ProtectedRoute path="/sales" component={Sales} />
                </Switch>
              </div>
            </>
          )} />
          <Redirect to="/sales" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
