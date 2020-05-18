import React, { Component } from 'react';
import { API } from './../../data/api';
import { CategoriesService } from '../../services/categoriesService';
import { Link } from 'react-router-dom';
import LaftPanel from './../leftpanel/_leftPanel';

export default class CategoriesList extends Component {

    categoriesService;

    constructor(props) {
        super(props);
        this.categoriesService = new CategoriesService();
        this.state = {
            error: null,
            categories: [],
            response: {}
        }
    }

    componentDidMount() {
        this.categoriesService.getCategory()
            .then((result => {
                this.setState({
                    categories: result.data.categories
                })
            }));
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <LaftPanel></LaftPanel>
                    <div className="col-md-10">
                        <Link to="/store/admin/categories/add">
                            <button>ADD CATEGORY</button>
                        </Link>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.categories.map(category => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <button ><ion-icon name="create-outline"></ion-icon></button>
                                            <button ><ion-icon name="trash-outline"></ion-icon></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
