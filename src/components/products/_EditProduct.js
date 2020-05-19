import React, { Component } from 'react';
import { ProductsService } from '../../services/productsService';
import LeftPanel from './../leftpanel/_leftPanel';

export default class _EditProduct extends Component {
    productsService;

    constructor(props) {
        super(props);
        this.productsService = new ProductsService()
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

        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const ID = this.props.match.params.id;
        this.productsService.getProduct(ID)
            .then(result => {
                console.log(result.data.product.productImage);
                this.setState({
                    _id: result.data.product._id,
                    name: result.data.product.name,
                    productImage: result.data.product.productImage,
                    price: result.data.product.price,
                    category: result.data.product.category,
                    quantity: result.data.product.quantity,
                    description: result.data.product.description,
                    discount: result.data.product.discount
                });
            });
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
        if (event) {
            const data = this.state;
            const fd = new FormData();

            fd.append("name", data.name);

            if (data.file) {
                fd.append("productImage", data.productImage, data.productImage.name);
            } else {
                fd.append("productImage", data.productImage);

            }
            fd.append("price", data.price);
            fd.append("category", data.category);
            fd.append("quantity", data.quantity);
            fd.append("description", data.description);
            fd.append("discount", data.discount);

            this.productsService.updateProduct(fd, this.state._id)
                .then(result => {
                    if (result.data.message === 'Success') {
                        this.props.history.push('/store/admin/products');
                    };
                })
        }
    }

    render() {
        let image;

        if (this.state.file) {
            image = <img className="productImage1" alt='productI' src={this.state.file}></img>
        } else {
            image = <img className="productImage1" alt='productI' src={'http://localhost:4000/' + this.state.productImage}></img>
        }

        return (
            <React.Fragment>
                <div className="row">
                    <LeftPanel></LeftPanel>
                    <div className="col-md-10">
                        <div className="product-form">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="form-title">EDIT PRODUCT</p>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="col-md-12">
                                            <label>Name</label>
                                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Product Name" />
                                        </div>
                                        <div className="col-md-12">
                                            <label>Price</label>
                                            <input type="text" name="price" value={this.state.price} onChange={this.handleChange} placeholder="Eg: 2500" />
                                        </div>
                                        <div className="col-md-12">
                                            <label>Qauntity</label>
                                            <input type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} placeholder="Eg: 90" />
                                        </div>
                                        <div className="col-md-12">
                                            <label>Descriptoin</label>
                                            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} placeholder="Eg: This is a T-shirt" />
                                        </div>
                                        <div className="col-md-12">
                                            <label>Category</label>
                                            <input type="text" name="category" value={this.state.category} onChange={this.handleChange} placeholder="category" />
                                        </div>
                                        <div className="col-md-12">
                                            <label>Discount</label>
                                            <input type="text" name="discount" value={this.state.discount} onChange={this.handleChange} placeholder="Eg: 25" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 image-section">
                                        <label>Product Image</label>
                                        {image}
                                        <label className="custom-file-upload">
                                            <input type="file" className="button-input" name="productImage" onChange={this.handleFile} placeholder="Product Image" />
                                    Upload Image
                                    </label>
                                    </div>

                                    <div className="col-md-12 button-col">
                                        <input type="hidden" name="id" value={this.state._id} />
                                        <button type="submit">SAVE</button>
                                        {/* <button type="button">CANCEL</button> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
