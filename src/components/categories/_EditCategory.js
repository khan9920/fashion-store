import React, { Component } from 'react';
import { CategoriesService } from './../../services/categoriesService';
import LaftPanel from './../leftpanel/_leftPanel';

export default class _EditCategory extends Component {

    categoriesService;

    constructor(props) {
        super(props);
        this.categoriesService = new CategoriesService();
        this.state = {
            _id: '',
            name: '',
            description: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        const ID = this.props.match.params.id;
        this.categoriesService.getCategory(ID)
            .then(result => {
                this.setState({
                    _id: result.data.category._id,
                    name: result.data.category.name,
                    description: result.data.category.description
                });
            })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (event) {
            this.categoriesService.updateCategory(this.state, this.state._id)
                .then(result => {
                    if (result.data.message === 'Success') {
                        this.props.history.push('/store/admin/categories');
                    };
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <LaftPanel></LaftPanel>
                    <div className="col-md-10">
                        <div className="category-form">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="form-title">EDIT CATEGORY</p>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Name</label>
                                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Eg: Top" />
                                    </div>
                                    <div className="col-md-12">
                                        <label>Description</label>
                                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange} placeholder="Eg: Top" />
                                    </div>
                                    <input type="hidden" name="ID" value={this.state._id} onChange={this.handleChange} />
                                    <div className="col-md-12 button-col">
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
