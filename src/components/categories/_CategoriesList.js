import React, { Component } from 'react';
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
        this.categoriesService.getCategories()
            .then((result => {
                this.setState({
                    categories: result.data.categories
                })
            }));
    }

    onEdit(ID) {
        this.props.history.push(`/store/admin/categories/edit/${ID}`);
    }

    onDelete(ID) {
        if (window.confirm('Are you sure..?')) {
            this.categoriesService.deleteCategory(ID)
                .then(result => {
                    if (result.data.message === 'Category deleted successfully') {
                        this.setState({
                            categories: this.state.categories.filter(category => category._id !== ID)
                        });
                    };
                })
        }
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
                                            <button onClick={() => this.onEdit(category._id)}><ion-icon name="create-outline"></ion-icon></button>
                                            <button onClick={() => this.onDelete(category._id)}><ion-icon name="trash-outline"></ion-icon></button>
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
