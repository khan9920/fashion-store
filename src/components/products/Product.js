import React, { Component } from 'react'
import { ProductsService } from '../../services/productsService';
import { CartService } from '../../services/cartService';

export default class Product extends Component {

    productsService;
    // cartService;

    constructor(props) {
        super(props);
        this.productsService = new ProductsService();
        this.cartService = new CartService();
        this.state = {
            _id: '',
            name: '',
            productImage: '',
            price: '',
            category: '',
            quantity: '',
            description: '',
            discount: '',
            file: null,
        }
    }

    componentDidMount() {
        const ID = this.props.match.params.id;
        this.productsService.getProduct(ID)
            .then(result => {
                this.setState({
                    _id: result.data.product._id,
                    name: result.data.product.name,
                    productImage: result.data.product.productImage,
                    price: result.data.product.price,
                    category: result.data.product.category,
                    quantity: result.data.product.quantity,
                    description: result.data.product.description,
                    discount: result.data.product.discount,
                });
            });
    }

    onAddToCart() {

        const user_id = '5e92596655db39060cdde135';
        const qty = 50;

        let order = { product: this.state, qty };

        this.cartService.addToCart(order, user_id)
            .then(result => {
                if (result.data.message === 'success') {
                    console.log('Success');
                }
            });

        this.props.history.push(`/store/cart`);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p>Name: {this.state.name}</p>
                    <p>Category: {this.state.category}</p>
                    <p>Descriptoin: {this.state.description}</p>
                    <p>Price: {this.state.price}</p>
                    <img className="productImage1" alt='productI' src={'http://localhost:4000/' + this.state.productImage} />
                    <button type="button" onClick={() => this.onAddToCart()}>ADD TO CART</button>
                </div>
            </React.Fragment >
        )
    }
}
