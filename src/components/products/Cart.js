import React, { Component } from 'react'
import { CartService } from '../../services/cartService';
import './Cart.css';
import Title from './../Title';
import Spinner from './../Spinner';
import { JwtService } from "./../../services/jwtService";
import {API} from "../../data/api";

export default class Cart extends Component {

    cartService;

    constructor(props) {
        super(props);
        this.cartService = new CartService();
        this.jwtService = new JwtService();
        this.state = {
            products: [],
            grandTotal: '',
            userID: '',
            isLoading: true,
            isEmpty: true
        }
    }

    componentDidMount() {
        this.setState({
            userID: this.jwtService.validateToken().id,
        })
        setTimeout(() => {
            this.cartService.getCart(this.state.userID)
                .then(result => {

                    let updatedResult = result.data.cart.products;
                    let totalCalculatedProducts = [];
                    let grandTotal = 0;

                    updatedResult.map(productResult => {
                        productResult.total = productResult.product.price * productResult.qty;
                        totalCalculatedProducts.push(productResult);
                    });

                    totalCalculatedProducts.map(product => {
                        grandTotal += product.total;
                    })

                    this.setState({
                        products: totalCalculatedProducts,
                        grandTotal,
                        isLoading: false
                    });
                });
        }, 1000)
    }

    onDelete(productID) {
        if (window.confirm('Are you sure..?')) {
            this.cartService.updateCart(productID, this.state.userID)
                .then(result => {
                    if (result.data.status === 'success') {

                        let products = this.state.products.filter(product => product.product._id !== productID);
                        let totalCalculatedProducts = [];
                        let grandTotal = 0;

                        products.map(productResult => {
                            productResult.total = productResult.product.price * productResult.qty;
                            totalCalculatedProducts.push(productResult);
                        });

                        totalCalculatedProducts.map(product => {
                            grandTotal += product.total;
                        });

                        this.setState({
                            products,
                            grandTotal
                        });
                    };
                })
        }
    }

    onPurchase() {
        this.props.history.push(`/store/purchase`);
    }

    render() {
        return (
            <div>
                <Title title="YOUR CART" />
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col" className="text-center">Qty</th>
                                <th scope="col" className="text-center">Unit Price</th>
                                <th scope="col" className="text-center">Remove</th>
                                <th scope="col" className="text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(result => (
                                <tr key={result.product._id}>
                                    <td>
                                        <div className="product-wrapper">
                                            <img className="productImage" alt='productI' src={API.IMAGEURL + result.product.productImage} />
                                            <div className="product-text-wrapper">
                                                <p className="text-1">{result.product.name}</p>
                                                <p className="text-2"><span>Category :</span> {result.product.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center text-top-center">{result.qty}</td>
                                    <td className="text-center text-top-center">LKR {result.product.price}.00</td>
                                    <td className="text-center text-top-center"><button onClick={() => this.onDelete(result.product._id)} className="btn-remove"><ion-icon name="close-outline"></ion-icon></button></td>
                                    <td className="text-center text-top-center text-bold">LKR {result.total}.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="row total-row">
                    <div className="col-md-12">
                        <div className="total-wrapper">
                            <p className="text-total"><span>TOTAL : </span>LKR {this.state.grandTotal}.00</p>
                            <p>SELECT PAYMENT METHOD</p>
                            <select name="paymentMethod">
                                <option value="cash">CASH ON DELIVERY</option>
                                <option value="card">VISA CARD</option>
                            </select>
                            <br />
                            <button type="button" onClick={() => this.onPurchase()}>PURCHASE</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
