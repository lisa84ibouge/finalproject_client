import './config.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Auth from './Auth/Auth';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (document.location.toString().match("http://www.jetsetmet.net")) {
  document.location = process.env.REACT_APP_ROOT_URL;
}

const auth = new Auth();
window.auth0 = auth;
ReactDOM.render(<BrowserRouter>
    <App auth={auth} />
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

