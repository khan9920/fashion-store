import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import StylesNavBar from './styles/NavBarStyles';

export default class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            isUser: false
        }
    }

    render() {
        return (
            <div className="row" style={StylesNavBar.row}>
                <div className="col-md-2">
                    <Link to='/store' style={StylesNavBar.brand}>Life Etc.</Link>
                </div>
                <div className="col-md-10">
                    <ul style={StylesNavBar.navListUl}>
                        {!this.state.isUser &&
                        <li style={StylesNavBar.linkList}>
                            <Link to='/store/admin/products/add/' style={StylesNavBar.linktListA}>ADD PRODUCTS</Link>
                        </li> }
                        <li style={StylesNavBar.linkList}>
                            <Link to='/store/shop' style={StylesNavBar.linktListA}>SHOP</Link>
                        </li>
                        <li style={StylesNavBar.linkList}>
                            <Link to='/store/about' style={StylesNavBar.linktListA}>ABOUT</Link>
                        </li>
                        <li style={StylesNavBar.linkList}>
                            <Link to='/store/contact' style={StylesNavBar.linktListA}>CONTACT</Link>
                        </li>
                        <li style={StylesNavBar.linkList}>
                            <Link to= {this.state.isLoggedIn ? 'contact' : '/login'} style={StylesNavBar.linktListA}> <ion-icon name="person-circle-outline" style={StylesNavBar.linkListIcon}></ion-icon>
                                {this.state.isLoggedIn ? "Sign Out" : "Login"}
                            </Link>
                        </li>
                        {this.state.isUser &&
                        <li style={StylesNavBar.linkList}>
                            <ion-icon name="cart-outline" style={StylesNavBar.linkListIcon}></ion-icon>
                            CART
                        </li> }
                    </ul>
                </div>
            </div>
        )
    }
}
