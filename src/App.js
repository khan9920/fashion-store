import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// main css
import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Navbar from './components/Navbar';
import Details from './components/Details';
import Cart from './components/Cart';

// products
import Products from './components/products/Products';
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
            <Route path="/store/details" component={Details} />
            <Route path="/store/cart" component={Cart} />

            <Route exact path="/store/admin/categories" component={_Categories} />
            <Route exact path="/store/admin/categories/add" component={_AddCategory} />
            <Route exact path="/store/admin/categories/edit/:id" component={_EditCategory} />

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
