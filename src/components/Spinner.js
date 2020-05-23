import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import './Spinner.css';

export default class Spinner extends Component {
    render() {
        return (
            <div class="spinner">
                <Loader
                    type="Puff"
                    color="#000"
                    height={75}
                    width={75}
                />
            </div>
        )
    }
}
