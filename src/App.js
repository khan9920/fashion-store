import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// main css
import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Navbar from './components/Navbar';
import ProductList from './components/products/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Login from './components/login/login';

import _Products from './components/products/_Products';
import _AddProduct from './components/products/_AddProduct';

import Default from './components/Default';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    }
  }


  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Navbar/>
          <Switch >
            <Route exact path="/store" component={ProductList}/>
            <Route path="/store/details" component={Details}/>
            <Route path="/store/cart" component={Cart}/>

            <Route exact path="/store/admin/products" component={_Products}>
              {!this.state.isAdmin && <Redirect to="/store"/>}
            </Route>
            <Route path="/store/admin/products/add" component={_AddProduct}>
              {!this.state.isAdmin && <Redirect to="/store"/>}
            </Route>

            <Route component={Default}/>
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
