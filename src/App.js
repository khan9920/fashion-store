import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// main css
import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Navbar from './components/Navbar';
import Shop from './components/shop/Shop';
import About from './components/About';
import Contact from './components/Contact';
import Wishlist from './components/products/WishList';
import Cart from './components/products/Cart';

// products
import Products from './components/products/Products';
import Product from './components/products/Product';

import Default from './components/Default';
import {JwtService} from "./services/jwtService";
import Admin from "./Admin";

class App extends Component {
  // services
  userService;

  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      shouldComponentLoad: false
    }
    this.userService = new JwtService();
  }

  validateUser = () => {
    const jwtService = new JwtService();
    const token = jwtService.validateToken();
    if (!token) {
      return <Redirect to="/store"/>
    } else if (token.role === 'User') {
      return <Redirect to="/store"/>
    } else {
      return <Admin/>
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Navbar />
          <Switch >
            <Route exact path="/store" component={Products} />
            <Route exact path="/store/shop" component={Shop} />
            <Route exact path="/store/about" component={About} />
            <Route exact path="/store/contact" component={Contact} />
            <Route exact path="/store/product/:id" component={Product} />
            <Route exact path="/store/wishlist" component={Wishlist} />
            <Route exact path="/store/cart/" component={Cart} />

            <Route path = "/store/admin">
              {this.validateUser}
            </Route>

            <Route component={Default} />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
