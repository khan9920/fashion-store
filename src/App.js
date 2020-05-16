import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// main css
import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';




class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Navbar></Navbar>
          <Switch >
            <Route exact path="/" component={ProductList}></Route>
            <Route path="/details" component={Details}></Route>
            <Route path="/cart" component={Cart}></Route>
            <Route component={Default}></Route>
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
