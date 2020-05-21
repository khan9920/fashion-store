import React, { Component } from 'react';
import { ProductsService } from '../../services/productsService';
import './Products.css';
import Title from '../Title';
import Spinner from './../Spinner';

export default class Products extends Component {

    productsService;

    constructor(props) {
        super(props);
        this.productsService = new ProductsService();
        this.state = {
            products: [],
            isLoading: true
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
                });
                this.setState({
                    isLoading: false,
                    products
                });
            })
    }

    onLoad(ID) {
        this.props.history.push(`/store/product/${ID}`);
    }

    render() {
        return (
            <React.Fragment>
                <Title title="THE COLLECTION" />
                {this.state.isLoading &&
                    <Spinner></Spinner>
                }
                {!this.state.isLoading &&
                    <div className="row home-produdcts-row">
                        {
                            this.state.products.map(product => (
                                <div key={product._id} className="col-md-4">
                                    <a onClick={() => this.onLoad(product._id)}>
                                        <div className="product-view-wrapper">
                                            <img className="productImage image" alt="" src={'http://localhost:4000/' + product.productImage} />
                                            <h5>{product.name}</h5>
                                            <p>LKR {product.price}.00</p>
                                            <div className="middle">
                                                <div className="text">CLICK TO VIEW</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                }
            </React.Fragment >
        )
    }
}
