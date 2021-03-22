import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Sales from './components/sale/Sales';
import Login from './components/login/Login';
import { AuthContext } from './hooks/Authentication';

import 'react-toastify/dist/ReactToastify.css';
import WithNavLayoutRoute from './components/route/WithNavLayoutRoute';
import { useContext } from 'react';
import { setupInterceptors } from './services/Api';
import QRCodeReader from './components/sale/QRCodeReader';

function App() {

  const auth = useContext(AuthContext);

  setupInterceptors(auth.logoff);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <WithNavLayoutRoute exact path="/sales" component={Sales} />
        <WithNavLayoutRoute exact path="/qr-scanner" component={QRCodeReader} />
        <Redirect to="/sales" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
