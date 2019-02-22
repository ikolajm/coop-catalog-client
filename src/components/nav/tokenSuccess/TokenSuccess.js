import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';
import './TokenSuccess.css';

export default class TokenSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxHeight: '0px',
            class: ''
        }
    }

    toggleProfileView = () => {
        if (this.state.maxHeight === '0px') {
            this.setState({
                maxHeight: '1000px',
                class: 'rotated-arr'
            })
        } else {
            this.setState({
                maxHeight: '0px',
                class: ''
            })
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="profile-container">
                    <p onClick={this.toggleProfileView}>
                        Profile<FaCaretDown className={this.state.class} />
                    </p>
                    <div style={{maxHeight: this.state.maxHeight}} className="profile-view">
                        <div>
                            <Link to="/profile">View Profile</Link>
                            <Link to="/" onClick={this.props.removeSessionToken}>Logout</Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}