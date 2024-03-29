import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'fontsource-roboto';
import App from './App';
import Loader from './components/layout/Loader';
import { AuthProvider } from './hooks/Authentication';
import { ToastContainer } from 'react-toastify';
import { RequestsProvider } from './hooks/RequestsContext';

ReactDOM.render(
  <AuthProvider>
    <RequestsProvider>
      <App />
      <Loader></Loader>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </RequestsProvider>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
