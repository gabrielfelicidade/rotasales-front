import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import { AuthContext } from './hooks/Authentication';

import 'react-toastify/dist/ReactToastify.css';
import WithNavLayoutRoute from './components/route/WithNavLayoutRoute';
import { useContext } from 'react';
import { setupInterceptors } from './services/Api';
import Sales from './components/sale/Sales';
import { ThemeProvider } from '@mui/private-theming';
import { createTheme } from '@mui/material';
import CreateSale from './components/sale/CreateSale';
import UpdateSale from './components/sale/UpdateSale';

function App() {

  const auth = useContext(AuthContext);
  const theme = createTheme();

  setupInterceptors(auth.logoff);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <WithNavLayoutRoute exact path="/sales" component={Sales} />
          <WithNavLayoutRoute exact path="/sales/new" component={CreateSale} />
          <WithNavLayoutRoute exact path="/sales/edit" component={UpdateSale} />
          <Redirect to="/sales" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
