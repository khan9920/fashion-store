import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import StylesNavBar from './styles/NavBarStyles';

export default class Navbar extends Component {
    render() {
        return (
            <div className="row" style={StylesNavBar.row}>
                <div className="col-md-2">
                    <p style={StylesNavBar.brand}>Life Etc.</p>
                </div>
                <div className="col-md-10">
                    <ul style={StylesNavBar.navListUl}>
                        <li style={StylesNavBar.linkList}>
                            <Link to='/shop' style={StylesNavBar.linktListA}>SHOP</Link>
                        </li>
                        <li style={StylesNavBar.linkList}>
                            <Link to='/about' style={StylesNavBar.linktListA}>ABOUT</Link>
                        </li>
                        <li style={StylesNavBar.linkList}>
                            <Link to='/contact' style={StylesNavBar.linktListA}>CONTACT</Link>
                        </li>
                        <li style={StylesNavBar.linkList}>
                            <ion-icon name="person-circle-outline" style={StylesNavBar.linkListIcon}></ion-icon>
                            LOG IN
                        </li>
                        <li style={StylesNavBar.linkList}>
                            <ion-icon name="cart-outline" style={StylesNavBar.linkListIcon}></ion-icon>
                            CART
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
