import React, { Component } from 'react';
import { ProductsService } from '../../services/productsService';
import { CategoriesService } from '../../services/categoriesService';
import LeftPanel from './../leftpanel/_leftPanel';

export default class _AddProduct extends Component {

    productsService;
    categoriesService;

    constructor(props) {
        super(props);
        this.productsService = new ProductsService();
        this.categoriesService = new CategoriesService();
        this.state = {
            _id: '',
            name: '',
            productImage: '',
            price: '',
            category: '',
            quantity: '',
            description: '',
            discount: 0,
            file: null,
            categories: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
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
            const fd = new FormData();
            fd.append("name", data.name);
            fd.append("productImage", data.productImage, data.productImage.name);
            fd.append("price", data.price);
            fd.append("category", data.category);
            fd.append("quantity", data.quantity);
            fd.append("description", data.description);
            fd.append("discount", data.discount);

            this.productsService.addProduct(fd).then(result => {
                if (result.data.message === 'Success') {
                    this.props.history.push('/store/admin/products');
                };
            });
        }
    }

    render() {
        let image;

        if (this.state.file) {
            image = <img className="productImage1" alt='productI' src={this.state.file}></img>
        } else {
            image = <p>No Image Selected</p>
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
                                        <p className="form-title">ADD PRODUCT</p>
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
                                            <select name="category" onChange={this.handleChange}>
                                                <option>SELECT CATEGORY</option>
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
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}
