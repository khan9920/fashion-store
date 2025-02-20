import React, { Component } from 'react';
import { ProductsService } from '../../services/productsService';
import { CategoriesService } from '../../services/categoriesService';
import LeftPanel from './../leftpanel/_leftPanel';
import './_ProductList.css';
import { API } from '../../data/api';
import {Button} from "primereact/button";

export default class _EditProduct extends Component {
    productsService;
    CategoriesService;
    constructor(props) {
        super(props);
        this.productsService = new ProductsService()
        this.categoriesService = new CategoriesService();
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
            categories: [],
            isLoading: false,
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
            })
        this.categoriesService.getCategories()
            .then(results => {
                this.setState({
                    categories: results.data.categories
                })
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

            if (data.name === '' || data.productImage === '' || data.price === '' || data.quantity === '' || data.description === '') {
                alert("Please fill all required fields.");
            } else {
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
                
                this.setState({
                    isLoading: true,
                  });

                this.productsService.updateProduct(fd, this.state._id)
                    .then(result => {
                        if (result.data.message === 'Success') {
                            
                            this.setState({
                                isLoading: false,
                            });
                            this.props.history.push('/store/admin/products');
                        };
                    })
            }
        }
    }

    render() {
        let image;

        if (this.state.file) {
            image = <img className="productImage1" alt='productI' src={this.state.file}></img>
        } else {
            image = <img className="productImage1" alt='productI' src={API.IMAGEURL  + this.state.productImage}></img>
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
                                            <label>Name (Required)</label>
                                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Product Name" />
                                        </div>
                                        <div className="col-md-12">
                                            <label>Price (Required)</label>
                                            <input type="text" name="price" value={this.state.price} onChange={this.handleChange} placeholder="Eg: 2500" />
                                        </div>
                                        <div className="col-md-12">
                                            <label>Qauntity (Required)</label>
                                            <input type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} placeholder="Eg: 90" />
                                        </div>
                                        <div className="col-md-12">
                                            <label>Descriptoin (Required)</label>
                                            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} placeholder="Eg: This is a T-shirt" />
                                        </div>
                                        <div className="col-md-12">
                                            <label>Category (Required)</label>
                                            <select name="category" onChange={this.handleChange}>
                                                <option>{this.state.category}</option>
                                                {
                                                    this.state.categories.map(category => (
                                                        <option key={category._id} value={category.name}>{category.name}</option>
                                                    ))
                                                }
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-12">
                                            <label>Discount</label>
                                            <input type="text" name="discount" value={this.state.discount} onChange={this.handleChange} placeholder="Eg: 25" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 image-section">
                                        <label>Product Image (Required)</label>
                                        {image}
                                        <label className="custom-file-upload">
                                            <input type="file" className="button-input" name="productImage" onChange={this.handleFile} placeholder="Product Image" />
                                    Upload Image
                                    </label>
                                    </div>

                                    <div className="col-md-12 button-col">
                                        <input type="hidden" name="id" value={this.state._id} />
                                        <Button  disabled={ this.state.isLoading} 
                                        type="submit" label="SAVE"
                                            icon={this.state.isLoading ? "pi pi-spin pi-spinner" : "pi pi-check"}
                                            style={{marginRight: '.25em'}}/>
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
