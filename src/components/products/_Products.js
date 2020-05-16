import React, { Component } from 'react';
import LaftPanel from './../leftpanel/_leftPanel';
import Product from './Product';

export default class _Products extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <LaftPanel></LaftPanel>
                    <Product />
                </div>
            </React.Fragment>
        )
    }
}
