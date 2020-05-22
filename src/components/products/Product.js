import React, { Component } from 'react'
import { ProductsService } from '../../services/productsService';
import { WishlistService } from './../../services/wishlistService';
import { CartService } from '../../services/cartService';
import './Product.css';
import Spinner from './../Spinner';
import StarRatingComponent from 'react-star-rating-component';
import { ReviewService } from '../../services/reviewService';


export default class Product extends Component {

    productsService;
    wishlistService;
    reviewService;

    constructor(props) {
        super(props);

        this.productsService = new ProductsService();
        this.wishlistService = new WishlistService();
        this.cartService = new CartService();
        this.reviewService = new ReviewService()

        this.isDiscounted = false;
        this.state = {
            _id: '',
            name: '',
            productImage: '',
            originalPrice: '',
            price: '',
            category: '',
            quantity: '',
            description: '',
            discount: '',
            file: null,
            rating: 1,
            comment: '',
            user_ID: '5e92596655db39060cdde135',
            reviews: [],
            ratingAvg: ''
        }
        this.isLoading = true;
        this.handleChange = this.handleChange.bind(this);
        this.onAddFeedback = this.onAddFeedback.bind(this);
    }

    componentDidMount() {
        const ID = this.props.match.params.id;
        this.productsService.getProduct(ID)
            .then(result => {
                this.isLoading = false;

                let product = result.data.product;

                if (product.discount === 0) {
                    this.isDiscounted = false;
                    product.originalPrice = 0;
                } else {
                    product.originalPrice = product.price;
                    product.price = product.price - (product.price * (product.discount / 100));
                    this.isDiscounted = true;
                }

                this.setState({
                    _id: product._id,
                    name: product.name,
                    productImage: product.productImage,
                    originalPrice: product.originalPrice,
                    price: product.price,
                    category: product.category,
                    quantity: product.quantity,
                    description: product.description,
                    discount: product.discount,
                });
            });


        this.reviewService.getReviews(ID)
            .then(results => {
                this.setState({
                    reviews: results.data.reviews,
                    ratingAvg: results.data.avg
                });
            })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    onAddToCart() {
        const user_id = '5e92596655db39060cdde135';
        const qty = this.state.quantity;

        let order = { product: this.state, qty };

        this.cartService.addToCart(order, user_id)
            .then(result => {
                if (result.data.message === 'success') {
                    console.log('Success');
                }
            });

        this.props.history.push(`/store/cart`);
    }

    onAddToWishList() {
        const user_id = '5e92596655db39060cdde135';
        const qty = 50;

        let order = { product: this.state, qty };

        this.wishlistService.addToWishList(order, user_id)
            .then(result => {
                if (result.data.message === 'success') {
                    console.log('Success');
                }
            });

        this.props.history.push(`/store/wishlist`);
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    onAddFeedback() {
        const review = {
            productID: this.props.match.params.id,
            userID: this.state.user_ID,
            name: 'John Watson',
            rating: this.state.rating,
            comment: this.state.comment
        };

        this.reviewService.addReview(review);
    }


    render() {
        const { rating } = this.state;
        return (
            <React.Fragment>
                {this.isLoading &&
                    <Spinner></Spinner>
                }
                {!this.isLoading &&
                    <div className="row common-single-product-page">
                        <div className="col-md-6">
                            <img className="productImage" alt='productI' src={'http://localhost:4000/' + this.state.productImage} />
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12">
                                    <h2>{this.state.name}</h2>
                                    <p className="category">{this.state.category}</p>
                                    <StarRatingComponent className="avgRating"
                                        name="rate2"
                                        starCount={5}
                                        editing={false}
                                        value={this.state.ratingAvg}
                                    /> <p className="avg-rating-text">{this.state.ratingAvg}</p>

                                    {this.isDiscounted &&
                                        <div className="text-wrapper">
                                            <p className="original-price strike-through-text"><span>LKR</span> {this.state.originalPrice}.00</p>
                                            <p className="price"><span>LKR</span> {this.state.price}.00</p>
                                        </div>
                                    }
                                    <div className="text-wrapper">
                                        {!this.isDiscounted && <p className="price"><span>LKR</span> {this.state.price}.00</p>}
                                    </div>

                                    <div className="text-wrapper qty-wrapper">
                                        <p className="qty">Quantity</p>
                                        <input type="number" placeholder="5" name="quantity" onChange={this.handleChange} />
                                    </div>

                                    <div className="text-wrapper">
                                        <p className="product-desc">Product Description</p>
                                        <p>{this.state.description}</p>
                                    </div>
                                    <button type="button" onClick={() => this.onAddToCart()}>ADD TO CART</button>
                                    <button className="btn-wishlist" onClick={() => this.onAddToWishList()}><ion-icon name="heart-outline"></ion-icon></button>
                                </div>
                            </div>
                            <hr />
                            <form action="" className="feedback-form">
                                <div className="col-md-12">
                                    <p className="product-desc">ADD REVIEW</p>
                                </div>
                                <div className="col-md-12">
                                    <StarRatingComponent
                                        name="rate1"
                                        starCount={5}
                                        value={rating}
                                        onStarClick={this.onStarClick.bind(this)}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label>Comments or Feedback</label>
                                    <textarea name="comment" id="" cols="50" rows="3" onChange={this.handleChange} value={this.state.comment}></textarea>
                                    <button type="button" onClick={() => this.onAddFeedback()}>SUBMIT</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-12">
                            <p className="product-desc">REVIEWS</p>
                        </div>

                        {this.state.reviews.map(review => (
                            <div className="col-md-3" key={review._id}>
                                <div class="riview-card">
                                    <p class="name">{review.name}</p>
                                    <StarRatingComponent class="review-bottom"
                                        name="rate3"
                                        editing={false}
                                        starCount={5}
                                        value={review.rating}
                                    />
                                    <p class="comment">{review.comment}</p>
                                </div>
                            </div>
                        ))

                        }
                    </div>
                }
            </React.Fragment >
        )
    }
}
