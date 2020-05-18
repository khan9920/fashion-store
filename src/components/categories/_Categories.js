import React, { Component } from 'react'
import LaftPanel from './../leftpanel/_leftPanel';
import Categories from './../categories/_CategoriesList';

export default class _Categories extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <LaftPanel></LaftPanel>
                    <Categories />
                </div>
            </React.Fragment>
        )
    }
}
