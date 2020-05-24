import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CategoriesService } from '../../services/categoriesService';
import { ProductsService } from '../../services/productsService';
import Title from '../Title';
import './Shop.css';
import Spinner from './../Spinner';
import { API } from '../../data/api';

export default class Shop extends Component {

    categoryService;
    productsService;

    constructor(props) {
        super(props);
        this.categoriesService = new CategoriesService();
        this.productsService = new ProductsService();
        this.state = {
            categories: [],
            products: [],
            isLoading: true,
            isEmpty: true
        }

        this.onFilter = this.onFilter.bind(this);
    }

    componentDidMount() {
        this.categoriesService.getCategories()
            .then(result => {
                const resultCategory = result.data.categories;
                let updatedCategoryObject = {};
                let updatedCategory = [];

                resultCategory.map(category => {
                    let name = category.name.toUpperCase();
                    let url = `?category=${category.name.toLowerCase()}`;

                    updatedCategoryObject = {
                        name,
                        url,
                    }
                    updatedCategory.push(updatedCategoryObject);
                })

                this.setState({
                    categories: updatedCategory,
                    isLoading: false
                })
            })

        const URL = this.props.history.location.search;

        if (URL === '') {
            this.productsService.getProducts()
                .then(result => {
                    let products = [];
                    result.data.products.map(product => {
                        if (product.discount === 0) {
                            products.push(product);
                        }
    
                       
                        product.price = product.price - (product.price * (product.discount / 100));
    
                        products.push(product);
                    });


                    this.setState({
                        products
                    })
                })
        } else {
            this.productsService.getProductsFiltered(URL)
                .then(result => {
                    let products = [];
                    result.data.products.map(product => {
                        if (product.discount === 0) {
                            products.push(product);
                        }
    
                       
                        product.price = product.price - (product.price * (product.discount / 100));
    
                        products.push(product);
                    });


                    this.setState({
                        products
                    })
                })
        }

        console.log(URL);
    }

    onFilter(category) {
        this.productsService.getProductsFiltered(category)
            .then(result => {
                // this.setState({
                //     products: result.data.products
                // })
                let products = [];
                result.data.products.map(product => {
                    if (product.discount === 0) {
                        products.push(product);
                    }

                   
                    product.price = product.price - (product.price * (product.discount / 100));

                    products.push(product);
                });


                this.setState({
                    products
                })
            })
    }

    onLoad(ID) {
        this.props.history.push(`/store/product/${ID}`);
    }

    render() {
        return (
            <React.Fragment>
                <Title title="SHOP ALL YOU WANT" />
                {this.state.isLoading &&
                    <Spinner></Spinner>
                }
                {!this.state.isLoading &&
                    <div className="row">
                        <div className="col-md-3 shop-category-panel">
                            <p className="shop-category">CATEGORIES</p>
                            <ul>
                                {this.state.categories.map(category => (
                                    <Link to={category.url} key={category.name}>
                                        <li onClick={() => this.onFilter(category.url)}>{category.name}</li>
                                    </Link>
                                ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-9">
                            <div className="row shop-products-row">
                                {
                                    this.state.products.map(product => (
                                        <div key={product._id} className="col-md-4">
                                            <a onClick={() => this.onLoad(product._id)}>
                                                <div className="product-view-wrapper">
                                                    <img className="productImage image" alt="" src={API.IMAGEURL + product.productImage} />
                                                    <h5>{product.name}</h5>
                                                    <p>LKR {product.price}.00</p>
                                                    <div className="middle">
                                                        <div className="text">CLICK TO VIEW</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}
