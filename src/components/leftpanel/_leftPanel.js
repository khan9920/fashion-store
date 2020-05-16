import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './_leftPanel.css';

export default class _leftPanel extends Component {
    render() {
        return (
            <div className="col-md-2 left-panel">
                <ul>
                    <li><Link to='/admin/products'>PRODUCTS</Link></li>
                    <li><Link to='/admin/categories'>CATEGORIES</Link></li>
                    <li><Link to='/admin/sales'>SALES</Link></li>
                    <li><Link to='/admin/uses'>USERS</Link></li>
                </ul>
            </div>
        )
    }
}