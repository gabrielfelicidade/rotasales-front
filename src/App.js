import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Sales from './components/sale/Sales';
import Login from './components/login/Login';
import { AuthProvider } from './hooks/Authentication';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import WithNavLayoutRoute from './components/route/WithNavLayoutRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <Route path="/login" component={Login} />
        <WithNavLayoutRoute path="/sales" component={Sales} />
        <Redirect to="/sales" />
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
