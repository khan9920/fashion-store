import React, { Component } from 'react'
import './../styles/ProductList.css'
import Title from '../Title';

export default class ProductList extends Component {
    // state = {
    //     products: []
    // }

    constructor(props) {
        super(props);
        this.state = {
            errror: null,
            products: [],
            response: {}
        }
    }

    componentDidMount() {
        fetch('http://localhost:4000/api/v1/products')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    products: json.products
                });
            });
    }

    render() {
        return (
            <React.Fragment>
                <Title title="featured items" />
                <div className="row">
                    {
                        this.state.products.map(product => (
                            <div className="col-md-4" key={product._id}>
                                <p>{product.name}</p>
                                <img className="productImage" width={50} alt="" src={'http://localhost:4000/' + product.productImage} />
                                <p>{product.price}</p>
                            </div>
                        ))
                    }
                </div>
            </React.Fragment>
        )
    }
}
