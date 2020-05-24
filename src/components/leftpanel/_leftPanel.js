import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './_leftPanel.css';

export default class _leftPanel extends Component {
    render() {
        return (
            <div className="col-md-2 left-panel">
                <ul>
                    <li><Link to='/store/admin/products'><i className="pi pi-tags mr-2"/>PRODUCTS</Link></li>
                    <li><Link to='/store/admin/categories'><i className="pi pi-list mr-2"/>CATEGORIES</Link></li>
                    <li><Link to='/store/admin/orders'><i className="pi pi-dollar mr-2"/>ORDERS</Link></li>
                    <li><Link to='/store/admin/users'><i className="pi pi-user mr-2"/>USERS</Link></li>
                </ul>
            </div>
        )
    }
}
