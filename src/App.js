import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import WithNavLayoutRoute from './components/route/WithNavLayoutRoute';
import Login from './components/login/Login';
import Sales from './components/sale/Sales';
import CreateSale from './components/sale/CreateSale';
import UpdateSale from './components/sale/UpdateSale';

function App() {
  const theme = createTheme();

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
