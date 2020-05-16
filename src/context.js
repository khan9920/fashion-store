import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

// provider
class ProductProvider extends Component {
    state = {
        products: storeProducts,
        detailProduct: detailProduct
    }
    handleDetail = () => {
        console.log('Hello from details');
    }

    addToCart = () => {
        console.log('Hello from add to card');
    }
    render() {
        return (
            <ProductContext.Provider value={
                {
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart
                }
            }>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

// consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };