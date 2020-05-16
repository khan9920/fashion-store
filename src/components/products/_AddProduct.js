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
        console.log(this.state.file)
        if (this.state._id) {
            pageTitle = <h2>Edit Product</h2>
            if (this.state.file) {
                image = <img className="productImage1" alt='productI' src={this.state.file}></img>
            } else {
                image = <img className="productImage1" alt='productI' src={'http://localhost:3000/' + this.state.productImage}></img>
            }
        } else {
            pageTitle = <h2>Add Product</h2>
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
                                {/* <Form.Label>Product Image</Form.Label> */}
                                <Form.Control
                                    type="file"
                                    name="productImage"
                                    // value={this.state.productImage}
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
                <div>
                    {pageTitle}
                    <Row>
                        <Col sm={6}>
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
                                <Form.Group controlId="productImage">
                                    <Form.Label>Product Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="productImage"
                                        //value={event.target.files[0]}
                                        onChange={this.handleFile}
                                        placeholder="Product Image" />
                                </Form.Group>
                                <Form.Group controlId="sku">
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

                                <Form.Group>
                                    <Form.Control type="hidden" name="id" value={this.state._id} />
                                    <Button variant="success" type="submit">Save</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </div>
            )
        }
    }

}