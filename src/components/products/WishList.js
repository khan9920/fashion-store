import React, { Component } from 'react';
import { WishlistService } from './../../services/wishlistService';
import Title from '../Title';
import './WishList.css';
import Spinner from './../Spinner';

export default class WishList extends Component {

    wishlistService;

    constructor(props) {
        super(props);
        this.wishlistService = new WishlistService();
        this.userID = '5e92596655db39060cdde135';
        this.state = {
            products: [],
            isLoading: true,
            wishListIsEmpty: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.wishlistService.getWishList(this.userID)
                .then(result => {
                    this.setState({
                        isLoading: false,
                        products: result.data.wishList.products
                    })
                })
            if (this.state.products.length === 0) {
                this.setState({
                    wishListIsEmpty: false
                })
            }
        }, 1000)
    }

    onRemoveItem(productID) {
        if (window.confirm('Are you sure..?')) {
            this.wishlistService.updateWishList(productID, this.userID)
                .then(result => {
                    if (result.data.status === 'success') {

                        let products = this.state.products.filter(product => product.product._id !== productID);

                        this.setState({
                            products
                        });
                    };
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Title title="MY WISHLIST" />
                {this.state.isLoading &&
                    <Spinner></Spinner>
                }
                <div className="row wishlist-produdcts-row">
                    {!this.state.isLoading && !this.state.wishListIsEmpty &&
                        this.state.products.map(product => (
                            <div key={product.product._id} className="col-md-4">
                                <a onClick={() => this.onRemoveItem(product.product._id)}>
                                    <div className="product-view-wrapper">
                                        <img className="productImage image" alt="" src={'http://localhost:4000/' + product.product.productImage} />
                                        <h5>{product.product.name}</h5>
                                        <p>LKR {product.product.price}.00</p>
                                        <div className="middle">
                                            <div className="text">REMOVE ITEM</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    }
                    {!this.state.isLoading && this.state.wishListIsEmpty &&
                        <div className="col-md-12 empty-wishlist">
                            <p>Your wishlist is empty</p>
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}
