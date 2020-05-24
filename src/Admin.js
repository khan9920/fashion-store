import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import _Categories from "./components/categories/_CategoriesList";
import _AddCategory from "./components/categories/_AddCategory";
import _EditCategory from "./components/categories/_EditCategory";
import _ProductsList from "./components/products/_ProductsList";
import _AddProduct from "./components/products/_AddProduct";
import _EditProduct from "./components/products/_EditProduct";
import UserManagement from "./components/user/user-management";
import EditUser from "./components/user/edit-user";
import Default from "./components/Default";

class Admin extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch >
          <Route exact path="/store/admin/categories" component={_Categories} />
          <Route exact path="/store/admin/categories/add" component={_AddCategory} />
          <Route exact path="/store/admin/categories/edit/:id" component={_EditCategory} />

          <Route exact path="/store/admin/products" component={_ProductsList} />
          <Route path="/store/admin/products/add" component={_AddProduct} />
          <Route path="/store/admin/products/edit/:id" component={_EditProduct} />

          <Route exact path="/store/admin/users" component={UserManagement}/>
          <Route exact path="/store/admin/users/:id" component={EditUser} />

          <Route component={Default} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Admin;
