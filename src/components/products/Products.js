import React, { Component } from 'react';
import { ProductsService } from '../../services/productsService';
import './Products.css';
import Title from '../Title';
import Spinner from './../Spinner';
import { API } from '../../data/api';

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
                        product.isDiscounted = false;
                        products.push(product);
                    } else {
                        product.originalPrice = product.price;
                        product.price = product.price - (product.price * (product.discount / 100));
                        product.isDiscounted = true;
                        products.push(product);
                    }
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
                                            <img className="productImage image" alt="" src={API.IMAGEURL + product.productImage} />
                                            <h5>{product.name}</h5>
                                            {!product.isDiscounted &&
                                                <p><span className="actual-price">LKR {product.price}.00</span> </p>
                                            }
                                            {product.isDiscounted &&
                                                <p><span className="original-price">LKR <span className="strike-through-text">{product.originalPrice}.00</span></span> <span className="actual-price">LKR {product.price}.00</span> </p>
                                            }
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
