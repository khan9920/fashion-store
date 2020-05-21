import React, { Component } from 'react';
import Title from './Title';
import './Contact.css';

export default class Contact extends Component {
    render() {
        return (
            <React.Fragment>
                <Title title="CONTACT" />
                <div className="row row-contact">
                    <div className="col-md-6">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.3479599298603!2d79.97074693496496!3d6.91468433909214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256db1a6771c5%3A0x2c63e344ab9a7536!2sSri%20Lanka%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2slk!4v1590073807479!5m2!1sen!2slk" width="600" height="450" frameborder="0" aria-hidden="false" tabindex="0"></iframe>
                    </div>
                    <div className="col-md-6">
                        <div className="wrapper-contact-details">
                            <div className="wrapper-address">
                                <p className="title">Visit Us</p>
                                <address>SLIIT Malabe Campus,<br />New Kandy Road,<br />Malabe</address>
                            </div>
                            <div class="wraper-phone">
                                <p className="title">Get in touch</p>
                                <p className="">+94 (11) 123 4567 / +94 (11) 123 4567</p>
                            </div>

                            <div class="wraper-email">
                                <p className="title">Say hello</p>
                                <p className="">hello@lifeetc.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
