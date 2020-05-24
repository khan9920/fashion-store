import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductProvider } from './context';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {JwtService} from "./services/jwtService";
import Login from "./components/login/login";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Register from "./components/register/register";
import UserManagement from "./components/user/user-management";
import EditUser from "./components/user/edit-user";

function getLogin() {
  const jwtService = new JwtService();
  if (jwtService.validateToken()) {
    return <Redirect to = '/store'/>
  } else {
    return <Login/>
  }
}


// function validateUser (){
//   const jwtService = new JwtService();
//   const token = jwtService.validateToken();
//   if (!token) {
//     return <Redirect to="/store"/>
//   } else if (token.role === 'User') {
//     return <Redirect to="/store"/>
//   } else {
//     return <App/>
//   }
// }

ReactDOM.render(
  <ProductProvider>
    <Router>
      <Route exact path="/">
        <Redirect to='/store' />
      </Route>
      <Route exact path="/login">
        {getLogin()}
      </Route>
      <Route exact path="/register" component={Register}/>
      <Route path="/store" component={App}/>
    </Router>
  </ProductProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
