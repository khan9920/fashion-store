import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import StylesNavBar from './styles/NavBarStyles';
import { JwtService } from "../services/jwtService";
import { Redirect } from "react-router-dom";
import './navbar.css';

export default class Navbar extends Component {
    // Services
    jwtService;

    constructor() {
        super();
        this.jwtService = new JwtService();
        const token = this.jwtService.validateToken();
        this.state = {
            isLoggedIn: token,
            role: token ? token.role : null,
            redirect: false,
            redirectToLogin: false
        }
    }

    signOut = () => {
        this.jwtService.deleteToken();
        this.setState({
            isLoggedIn: false,
            role: null,
            redirect: true
        });
    };

    navigateToLogin = () => {
        this.setState({
            redirect: false,
        }, this.setRedirectState())
    }

    setRedirectState() {
        this.setState({
            redirectToLogin: true
        });
    }



    render() {
        return (
            <div className="row" style={StylesNavBar.row}>
                <div className="col-md-2">
                    <Link to='/store' style={StylesNavBar.brand}>Life Etc.</Link>
                </div>
                <div className="col-md-10 nav-list">
                    <ul style={StylesNavBar.navListUl}>
                        {
                            (this.state.role && this.state.role !== 'User') && <li style={StylesNavBar.linkList}>
                                <Link to='/store/admin/products' style={StylesNavBar.linktListA}>Dashboard</Link>
                            </li>
                        }
                        <li style={StylesNavBar.linkList}>
                            <Link to='/store/shop' style={StylesNavBar.linktListA}>SHOP</Link>
                        </li>
                        <li style={StylesNavBar.linkList}>
                            <Link to='/store/about' style={StylesNavBar.linktListA}>ABOUT</Link>
                        </li>
                        <li style={StylesNavBar.linkList}>
                            <Link to='/store/contact' style={StylesNavBar.linktListA}>CONTACT</Link>
                        </li>
                        {(this.state.role && this.state.role === 'User') && <Link to='/store/wishlist'>
                            <li style={StylesNavBar.linkList}>
                                <ion-icon name="heart-outline" style={StylesNavBar.linkListIcon}></ion-icon>
                                WISHLIST
                            </li>
                        </Link>}
                        {(this.state.role && this.state.role === 'User') && <Link to='/store/cart'>
                            <li style={StylesNavBar.linkList}>
                                <ion-icon name="cart-outline" style={StylesNavBar.linkListIcon}></ion-icon>
                                CART
                            </li>
                        </Link>}
                        <li style={StylesNavBar.linkList}>
                            <a href="" className="link" onClick={this.state.isLoggedIn ? this.signOut : this.navigateToLogin}
                                style={StylesNavBar.linktListA}> <ion-icon name="person-circle-outline" style={StylesNavBar.linkListIcon}></ion-icon>
                                {this.state.isLoggedIn ? 'Sign Out' : 'Login'}
                            </a>
                        </li>
                    </ul>
                </div>
                {console.log(this.state.redirectToLogin)}
                {this.state.redirectToLogin && <Redirect to="/login" />}
                {this.state.redirect && <Redirect to="/" />}
            </div>
        )
    }
}
