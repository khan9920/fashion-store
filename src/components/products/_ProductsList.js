import React, { Component } from 'react'
import { ProductsService } from '../../services/productsService';
import LeftPanel from './../leftpanel/_leftPanel';

export default class _ProductsList extends Component {
    productsService;

    constructor(props) {
        super(props);
        this.productsService = new ProductsService()
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.productsService.getProducts()
            .then(results => {
                this.setState({
                    products: results.data.products
                })
            })
    }


    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <LeftPanel></LeftPanel>
                    <div className="col-md-10">
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
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
