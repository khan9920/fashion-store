import React, { Component } from 'react'
import { ProductsService } from '../../services/productsService';
import { CartService } from '../../services/cartService';
import './Product.css';

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
                <div className="row common-single-product-page">
                    <div className="col-md-6">
                        <img className="productImage" alt='productI' src={'http://localhost:4000/' + this.state.productImage} />
                    </div>
                    <div className="col-md-6">
                        <h2>{this.state.name}</h2>
                        <p className="category">{this.state.category}</p>

                        <div className="text-wrapper">
                            <p className="price"><span>LKR</span> {this.state.price}.00</p>
                        </div>

                        <div className="text-wrapper qty-wrapper">
                            <p className="qty">Quantity</p>
                            <input type="number" placeholder="5" />
                        </div>

                        <div className="text-wrapper">
                            <p className="product-desc">Product Description</p>
                            <p>{this.state.description}</p>
                        </div>
                        <button type="button" onClick={() => this.onAddToCart()}>ADD TO CART</button>
                        <button className="btn-wishlist"><ion-icon name="heart-outline"></ion-icon></button>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}
