import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from './auth/Auth';
import TokenSuccess from './tokenSuccess/TokenSuccess';
import './Navbar.css';

export default class Nav extends Component {
    constructor(props) {
        super(props);
    }

    authCheck = () => {
        return (this.props.token === undefined) ?
        <Auth storeUserData={this.props.storeUserData} storeSessionToken={this.props.storeSessionToken} /> : <TokenSuccess removeSessionToken={this.props.removeSessionToken} />
    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <img src={require('../../assets/logo-condense.png')} alt="logo" />
                    <div>
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/catalog">Catalog</Link>
                        {this.authCheck()}
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

