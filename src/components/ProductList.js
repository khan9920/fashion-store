import React, { Component } from 'react'
import Product from './Product'
import Totle from './Title';
import Title from './Title';

export default class ProductList extends Component {
    state = {
        products: []
    }

    render() {
        return (
            <React.Fragment>
                <Title title="featured items" />
            </React.Fragment>
            // <div>
            //     <Product />
            // </div>
        )
    }
}
