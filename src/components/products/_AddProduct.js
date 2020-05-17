import React, { Component } from 'react'
import { Row, Form, Col, Button } from 'react-bootstrap';

export default class _AddProduct extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            file: null,
            _id: '',
            name: '',
            productImage: '',
            price: '',
            category: '',
            quantity: '',
            description: '',
            discount: '',
        }

        if (props.product) {
            this.state = props.product;
        } else {
            this.state = this.initialState;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleFile(event) {
        this.setState({
            productImage: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0])
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);

    }
    render() {
        let pageTitle, image;
        if (this.state._id) {
            pageTitle = 'EDIT PRODUCT';
            if (this.state.file) {
                image = <img className="productImage1" alt='productI' src={this.state.file}></img>
            } else {
                image = <img className="productImage1" alt='productI' src={'http://localhost:4000/' + this.state.productImage}></img>
            }
        } else {
            pageTitle = 'ADD PRODUCT';
        }

        if (this.state._id) {
            return (
                <div>
                    {pageTitle}
                    <Row>
                        <Col sm={12}>
                            <div className="image">
                                {image}
                            </div>
                            <Form.Group controlId="productImage">
                                <Form.Control
                                    type="file"
                                    name="productImage"
                                    onChange={this.handleFile}
                                    placeholder="Product Image" />
                            </Form.Group>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        placeholder="Product Name" />
                                </Form.Group>

                                <Form.Group controlId="Category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.handleChange}
                                        placeholder="category" />
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                        placeholder="Price" />
                                </Form.Group>
                                <Form.Group controlId="quantity">
                                    <Form.Label>quantity</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="quantity"
                                        value={this.state.quantity}
                                        onChange={this.handleChange}
                                        placeholder="quantity" />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        placeholder="description" />
                                </Form.Group>

                                <Form.Group controlId="Add discount">
                                    <Form.Label>Add discount</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="discount"
                                        value={this.state.discount}
                                        onChange={this.handleChange}
                                        placeholder="discount" />
                                </Form.Group>


                                <Form.Group>
                                    <Form.Control type="hidden" name="id" value={this.state._id} />
                                    <Button variant="success" type="submit">Save</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return (
                <div className="product-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="form-title">{pageTitle}</p>
                            </div>
                            <div className="col-md-6">
                                <div className="col-md-12">
                                    <label>Name</label>
                                    <input type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        placeholder="Product Name" />
                                </div>
                                <div className="col-md-12">
                                    <label>Price</label>
                                    <input type="text"
                                        name="price"
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                        placeholder="Price" />
                                </div>
                                <div className="col-md-12">
                                    <label>Qauntity</label>
                                    <input type="text"
                                        name="quantity"
                                        value={this.state.quantity}
                                        onChange={this.handleChange}
                                        placeholder="quantity" />
                                </div>
                                <div className="col-md-12">
                                    <label>Descriptoin</label>
                                    <input type="text"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        placeholder="description" />
                                </div>
                                <div className="col-md-12">
                                    <label>Category</label>
                                    <input type="text"
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.handleChange}
                                        placeholder="category" />
                                </div>
                                <div className="col-md-12">
                                    <p>{this.state.file}</p>
                                </div>
                            </div>

                            <div className="col-md-6 image-section">
                                <div className="image">{
                                    <img className="productImage1" alt='productI' src={this.state.file}></img>
                                }
                                </div>
                                <div className="col-md-3">
                                    <label>Image</label>
                                    <input type="file"
                                        name="productImage"
                                        onChange={this.handleFile}
                                        placeholder="Product Image" />
                                </div>
                            </div>

                            <div class="col-md-12 button-col">
                                <input type="hidden" name="id" value={this.state._id} />
                                <button type="submit">SAVE</button>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }

}