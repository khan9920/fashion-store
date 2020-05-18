import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './_leftPanel.css';

export default class _leftPanel extends Component {
    render() {
        return (
            <div className="col-md-2 left-panel">
                <ul>
                    <li><Link to='/store/admin/products'>PRODUCTS</Link></li>
                    <li><Link to='/store/admin/categories'>CATEGORIES</Link></li>
                    <li><Link to='/store/admin/sales'>SALES</Link></li>
                    <li><Link to='/store/admin/users'>USERS</Link></li>
                </ul>
            </div>
        )
    }
}