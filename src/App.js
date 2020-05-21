import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// main css
import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Navbar from './components/Navbar';
import Shop from './components/shop/Shop';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/products/Cart';

// products
import Products from './components/products/Products';
import Product from './components/products/Product';

import _ProductsList from './components/products/_ProductsList';
import _AddProduct from './components/products/_AddProduct';
import _EditProduct from './components/products/_EditProduct';

// categories
import _Categories from './components/categories/_CategoriesList';
import _AddCategory from './components/categories/_AddCategory';
import _EditCategory from './components/categories/_EditCategory';

// import Login from './components/login/login';

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
          <Navbar />
          <Switch >
            <Route exact path="/store" component={Products} />
            <Route exact path="/store/shop" component={Shop} />
            <Route exact path="/store/about" component={About} />
            <Route exact path="/store/contact" component={Contact} />

            <Route exact path="/store/admin/categories" component={_Categories} />
            <Route exact path="/store/admin/categories/add" component={_AddCategory} />
            <Route exact path="/store/admin/categories/edit/:id" component={_EditCategory} />

            <Route exact path="/store/product/:id" component={Product} />
            <Route exact path="/store/cart/" component={Cart} />

            <Route exact path="/store/admin/products" component={_ProductsList} />
            <Route path="/store/admin/products/add" component={_AddProduct} />
            <Route path="/store/admin/products/edit/:id" component={_EditProduct} />

            {/* {!this.state.isAdmin && <Redirect to="/store"/>} */}

            {/* {!this.state.isAdmin && <Redirect to="/store"/>} */}

            <Route component={Default} />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
