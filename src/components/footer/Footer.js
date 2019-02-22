import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <React.Fragment>
            <footer>
                    <img src={require('../../assets/logo-condense.png')} alt="logo" />
                    <span>&copy; Co-op Catalog 2019</span>
            </footer>
        </React.Fragment>
    )
}

export default Footer;