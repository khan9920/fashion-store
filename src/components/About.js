import React, { Component } from 'react';
import Title from './Title';
import './About.css';

export default class About extends Component {
    render() {
        return (
            <React.Fragment>
                <Title title="BEHIND THE BRAND" />
                <div className="row row-about-us">
                    <div className="col-md-12">
                        <img src="./../img/about-us.jpg" alt="" />
                        <p className="title-about">I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you <br />
                         to tell a story and let your users know a little more about you.</p>
                        <p className="para-about">I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you. I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you. I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
