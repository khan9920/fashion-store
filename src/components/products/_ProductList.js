import React, { Component } from 'react';
import './_ProductList.css';

export default class _ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            products: [],
            response: {}
        }
    }

    componentDidMount() {
        fetch('http://localhost:4000/api/v1/products/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    products: json.products
                });
            });
    }

    deleteProduct(productId) {
        const { products } = this.state;

        const apiUrl = 'http://localhost:4000/api/v1/products/' + productId;

        const options = {
            method: 'DELETE',
            // body: fd
        };

        if (window.confirm('Are you sure..?')) {
            fetch(apiUrl, options)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            response: result,
                            products: products.filter(product => product._id !== productId)
                        });
                    },
                    (error) => {
                        this.setState({ error });
                    }
                )
        }
    }
    render() {
        return (
            <React.Fragment>
                {
                    this.state.products.map(product => (
                        <div className="product-card" key={product._id}>
                            <div className="row">
                                <div className="col-md-2">
                                    <img className="productImage" alt="" src={'http://localhost:4000/' + product.productImage}></img>
                                </div>
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <label>Product Name</label>
                                            <p>{product.name}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <label>Price (LKR)</label>
                                            <p>{product.price}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <label>Discount (%)</label>
                                            <p>{product.discount}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <label>Qty.</label>
                                            <p>{product.quantity}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <label>Category</label>
                                            <p>{product.category}</p>
                                        </div>
                                        <div className="col-md-2 actions">
                                            <label>Actions</label>
                                            <p>
                                                <button onClick={() => this.props.editProduct(product._id)} ><ion-icon name="create-outline"></ion-icon></button>
                                                <button onClick={() => this.deleteProduct(product._id)} ><ion-icon name="trash-outline"></ion-icon></button>
                                            </p>
                                        </div>
                                        <div className="col-md-9">
                                            <label>Description</label>
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </React.Fragment>
        )
    }
}
