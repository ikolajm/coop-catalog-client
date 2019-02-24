import React, { Component } from 'react';
import Particles from '../particles/Particle';
import APIURL from '../../helpers/environment';
import { Container, Row, Col, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './Profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalEdit: false,
            modalDelete: false,
            username: this.props.user.username,
            email: this.props.user.email,
            password: '',
            passwordConfirm: '',
            url: this.props.user.avatarURL,
            genre: this.props.user.favGenre,
            showMisMatch: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        // Check if passwords match
        if (!this.state.login && this.state.password !== this.state.passwordConfirm) {
            this.setState({
                showMisMatch: true
            });
            return;
        } else {
            let url = `${APIURL}/user/edit/${this.props.user.id}`;
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(json => { 
                this.props.storeSessionToken(json.sessionToken);
                this.props.storeUserData(json.user);
            })
            .catch(err => err.message);
            this.toggleEdit();
        }
    }
    
    toggleEdit = () => {
        let modalEdit = this.state.modalEdit;
        this.setState({
            modalEdit: !modalEdit
        });
    }
    
    handleDelete = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/user/delete/${this.props.user.id}`, {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          })
        })
        .then(res => res.json())
        .then(json => {
            this.props.storeSessionToken(json.sessionToken);
            this.props.storeUserData(json.user);
        })
        this.toggleDelete();
        this.setState({
            modalEdit: false,
            modalDelete: false,
            username: this.props.user.username,
            email: this.props.user.email,
            password: '',
            passwordConfirm: '',
            url: this.props.user.avatarURL,
            genre: this.props.user.favGenre,
            showMisMatch: false
        })
    }

    toggleDelete = () => {
        let modalDelete = this.state.modalDelete;
        this.setState({
            modalDelete: !modalDelete
        });
    }

    render() {
        let passErr = (this.state.showMisMatch === true) ? (<p style={{color: 'red'}}>*Your passwords must match!</p>) : null;
        let display = (this.props.user) ? (<div className="user-profile">
                                            <Row>
                                                <Col sm="4" className="user-profile-image-col">
                                                    <img src={this.props.user.avatarURL} alt={this.props.user.username} />
                                                </Col>
                                                <Col sm="8" className="user-profile-read-data">
                                                    <h5>Username:</h5>
                                                    <h3>{this.state.username}</h3>
                                                    <hr />
                                                    <h5>Email:</h5>
                                                    <h3>{this.state.email}</h3>
                                                    <hr />
                                                    <h5>Favorite Genre:</h5>
                                                    <h3>{this.state.genre}</h3>
                                                    {/* <hr />
                                                    <h5>Reputation:</h5>
                                                    <h3>{this.props.user.reputation}</h3> */}
                                                    <hr />
                                                    {/* Edit + Delete modals */}
                                                    <div className="profile-button-container">
                                                        {/* Edit */}
                                                        <Button color="warning" className="profile-edit-confirm" onClick={this.toggleEdit}>Edit Profile</Button>
                                                        <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit}>
                                                            <ModalHeader toggle={this.toggle}>Edit profile</ModalHeader>
                                                            <ModalBody>
                                                                {passErr}
                                                                <form>
                                                                    <label className="top-label" htmlFor="username">Username:</label><br/>
                                                                    <input onChange={this.handleChange} value={this.state.username} type="text" id="username" /><br/>
                                                                    <label htmlFor="password">Password:</label><br/>
                                                                    <input onChange={this.handleChange} value={this.state.password} minLength="5" type="password" id="password" /><br/>
                                                                    <label htmlFor="passwordConfirm">Confirm Password:</label><br/>
                                                                    <input onChange={this.handleChange} value={this.state.passwordConfirm} minLength="5" type="password" id="passwordConfirm" /><br/>
                                                                    <label htmlFor="firstName">Email:</label><br/>
                                                                    <input onChange={this.handleChange} value={this.state.email} type="email" id="email" /><br/>
                                                                    <label htmlFor="url">Avatar Photo URL:</label><br/>
                                                                    <input onChange={this.handleChange} value={this.state.url} type="text" id="url" /><br/>
                                                                    <label htmlFor="genre">Favorite Game Genre:</label><br/>
                                                                    <input onChange={this.handleChange} value={this.state.genre} type="text" id="genre" /><br/>
                                                                </form>
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button onClick={this.handleSubmit} className="profile-edit-confirm" type="submit">Confirm Edit</Button>
                                                                <Button color="secondary" onClick={this.toggleEdit}>Cancel</Button>
                                                            </ModalFooter>
                                                        </Modal>
                                                        {/* Delete */}
                                                        <Button color="danger" className="profile-delete-confirm" onClick={this.toggleDelete}>Delete Profile</Button>
                                                        <Modal isOpen={this.state.modalDelete} toggle={this.toggleDelete}>
                                                            <ModalHeader toggle={this.toggle}>Are you sure?</ModalHeader>
                                                            <ModalBody>
                                                                <p>If you delete you account, you won't be able to recover it, are you sure you want to proceed?</p>
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button onClick={this.handleDelete} className="profile-delete-confirm">Confirm Deletion</Button>
                                                                <Button color="secondary" onClick={this.toggleDelete}>On second thought...</Button>
                                                            </ModalFooter>
                                                        </Modal>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>) 
                                        : (<React.Fragment><h1 style={{color: 'white'}}>User successfully deleted, sorry to see you go :(</h1></React.Fragment>);
        return (
            <div className="profile-main">
    
                <div className="particle-container">
                    <Particles />
                </div>
    
                <Container className="user-profile-container">
                    {display}
                </Container>
    
            </div>
        )
    }
}