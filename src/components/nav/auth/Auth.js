import React, { Component } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { Button } from 'reactstrap';
import APIURL from '../../../helpers/environment';
import './Auth.css';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            url: '',
            genre: '',
            showMisMatch: false,
            maxHeight: '0px',
            class: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            // Change the state specific to it's id, which is named the same as the state
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // Check if passwords match
        if (!this.state.login && this.state.password !== this.state.passwordConfirm) {
            this.setState({
                showMisMatch: true
            });
            return;
        } else {
            let url = this.state.login ? `${APIURL}/user/signin` : `${APIURL}/user/signup`;
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(json => {
                // Store session token
                this.props.storeSessionToken(json.sessionToken);
                // Store user data
                this.props.storeUserData(json.user);
                localStorage.setItem('token', json.sessionToken);
            });
        }
    }

    loginToggle = (evt) => {
        evt.preventDefault();
        let _login = this.state.login;
        this.setState({
            // !_login is the opposite of state login
            login: !_login,
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            url: '',
            genre: '',
            showMisMatch: false
        })
    }

    toggleFormView = () => {
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
        let passErr = (this.state.showMisMatch === true) ? (<p style={{color: 'red'}}>*Your passwords must match!</p>) : null;
        let text = this.state.login ? 'Login!' : 'Signup!';
        let formFields = this.state.login ?
                        // Login 
                           (<React.Fragment>
                                <label htmlFor="username">Username:</label><br/>
                                <input onChange={this.handleChange} value={this.state.username} type="text" id="username" /><br/>
                                <label htmlFor="password">Password:</label><br/>
                                <input onChange={this.handleChange} value={this.state.password} type="password" id="password" /><br/>
                           </React.Fragment>) 
                           :
                        // Signup
                           (<React.Fragment>
                                <label htmlFor="username">Username:</label><br/>
                                <input onChange={this.handleChange} value={this.state.username} type="text" id="username" /><br/>
                                <label htmlFor="password">Password:</label><br/>
                                <input onChange={this.handleChange} value={this.state.password} minLength="5" type="password" id="password" /><br/>
                                <label htmlFor="passwordConfirm">Confirm Password:</label><br/>
                                <input onChange={this.handleChange} value={this.state.passwordConfirm} type="password" id="passwordConfirm" /><br/>
                                <label htmlFor="firstName">Email:</label><br/>
                                <input onChange={this.handleChange} value={this.state.email} type="email" id="email" /><br/>
                                <label htmlFor="url">Avatar Photo URL:</label><br/>
                                <input onChange={this.handleChange} value={this.state.url} type="text" id="url" /><br/>
                                <label htmlFor="genre">Favorite Game Genre:</label><br/>
                                <input onChange={this.handleChange} value={this.state.genre} type="text" id="genre" /><br/>
                           </React.Fragment>) 
        return (
            <div className="auth-container">
                <p onClick={this.toggleFormView}>Login/Signup<FaCaretDown className={this.state.class} /></p>
                <div style={{maxHeight: this.state.maxHeight}} className="form-view-container">
                    <div className="form-view">

                        <form onSubmit={this.handleSubmit}>
                            {passErr}
                            {formFields}
                            <Button className="form-toggle" onClick={this.loginToggle}>Login/Signup Toggle</Button><br/>
                            <Button className="form-submit" type="submit">{text}</Button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}