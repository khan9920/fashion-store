import React, { Component } from 'react';
import AddProduct from './_AddProduct';
import ProductList from './_ProductList';
import axios from 'axios';
import './Product.css';

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddProduct: false,
            error: null,
            response: {},
            product: {},
            isEditProduct: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onCreate() {
        this.setState({ isAddProduct: true });
    }

    onFormSubmit(data) {
        if (this.state.isEditProduct) {

            const fd = new FormData();
            fd.append("name", data.name);
            fd.append("price", data.price);
            fd.append("category", data.category);
            fd.append("quantity", data.quantity);
            fd.append("description", data.description);
            fd.append("discount", data.discount);

            if (data.file) {
                fd.append("productImage", data.productImage, data.productImage.name);
            } else {
                fd.append("productImage", data.productImage);
            }

            axios.patch(
                "http://localhost:4000/api/v1/products/" + data._id,
                fd,
            )
                .then(result => {

                    this.setState({
                        response: result,
                        product: null,
                        isEditProduct: false,
                        isAddProduct: false,

                    })
                },
                    (error) => {
                        this.setState({ error });
                    }
                )
        } else {
            const apiUrl = "http://localhost:4000/api/v1/products/";

            if (data.name) {
                const fd = new FormData();
                fd.append("name", data.name);
                fd.append("productImage", data.productImage, data.productImage.name);
                fd.append("price", data.price);
                fd.append("category", data.category);
                fd.append("quantity", data.quantity);
                fd.append("description", data.description);
                fd.append("discount", data.discount);

                console.log(data.description);

                const options = {
                    method: 'POST',
                    body: fd
                };

                fetch(apiUrl, options)
                    .then(res => res.json())
                    .then(result => {
                        console.log("result" + result);
                        this.setState({
                            response: result,
                            isAddProduct: false,
                            isEditProduct: false
                        })
                    },
                        (error) => {
                            this.setState({ error });
                        }
                    )
            }
        }

    }

    editProduct = productId => {
        const apiUrl = 'http://localhost:4000/api/v1/products/' + productId;

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({

                        product: result.product,
                        isEditProduct: true,
                        isAddProduct: true
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    render() {
        let productForm;
        if (this.state.isAddProduct || this.state.isEditProduct) {
            productForm = <AddProduct onFormSubmit={this.onFormSubmit} product={this.state.product} />
        }

        return (
            <div className="col-md-10 admin-body">
                <div className="row">
                    <div className="col-md-12">
                        {!this.state.isAddProduct && <button variant="primary" className="add-product-button" onClick={() => this.onCreate()}>ADD PRODUCT</button>}
                    </div>
                </div>
                {/* {this.state.response.message === 'Success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>} */}
                {!this.state.isAddProduct && <ProductList editProduct={this.editProduct} />}
                {productForm}
                {this.state.error && <div>Error: {this.state.error.message}</div>}
            </div>
        );
    }
}
