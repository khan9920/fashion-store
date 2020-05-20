import React, { Component } from 'react'
import { CartService } from '../../services/cartService';

export default class Cart extends Component {

    cartService;

    constructor(props) {
        super(props);
        this.cartService = new CartService();
        this.userID = '5e92596655db39060cdde135';
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.cartService.getCart(this.userID)
                .then(result => {

                    let updatedResult = result.data.cart.products;
                    let totalCalculatedProducts = [];

                    updatedResult.map(productResult => {
                        productResult.total = productResult.product.price * productResult.qty;
                        totalCalculatedProducts.push(productResult);
                    })

                    this.setState({
                        products: totalCalculatedProducts
                    });
                });
        }, 1000)

    }

    onDelete(productID) {
        if (window.confirm('Are you sure..?')) {
            this.cartService.updateCart(productID, this.userID)
                .then(result => {
                    if (result.data.status === 'success') {
                        console.log(this.state.products);
                        this.setState({
                            products: this.state.products.filter(product => product.product._id !== productID)
                        });
                    };
                })
        }
    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Unit Price (LKR)</th>
                            <th scope="col">Total (LKR)</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(result => (
                            <tr key={result.product._id}>
                                <td>{result.product.name}</td>
                                <td>{result.qty}</td>
                                <td>{result.product.price}</td>
                                <td>{result.total}</td>
                                <td><button onClick={() => this.onDelete(result.product._id)}><ion-icon name="trash-outline"></ion-icon></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
