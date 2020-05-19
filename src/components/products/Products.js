import React, { Component } from 'react';
import { ProductsService } from '../../services/productsService';

export default class Products extends Component {

    productsService;

    constructor(props) {
        super(props);
        this.productsService = new ProductsService();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.productsService.getProducts()
            .then(result => {
                let products = [];
                result.data.products.map(product => {
                    if (product.discount === 0) {
                        products.push(product);
                    }

                    product.originalPrice = product.price;
                    product.price = product.price - (product.price * (product.discount / 100));

                    products.push(product);
                })
                this.setState({
                    products
                });
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    {
                        this.state.products.map(product => (
                            <div className="col-md-4" key={product._id}>
                                <p>{product.name}</p>
                                <img className="productImage" width={50} alt="" src={'http://localhost:4000/' + product.productImage} />
                                <p>{product.price}</p>
                            </div>
                        ))
                    }
                </div>
            </React.Fragment>
        )
    }
}
