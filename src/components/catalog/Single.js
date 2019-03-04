import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Particles from '../particles/Particle';
import APIURL from '../../helpers/environment';
import Moment from 'moment';
import './Single.css';

export default class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game,
            modalGameEdit: false,
            name: '',
            summary: '',
            genre: '',
            min: '',
            max: '',
            url: '',
            rating: '',
            updatedAt: '',
            firstSearch: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.game && this.state.firstSearch === true){
            this.setState({ 
                game: nextProps.game,
                name: nextProps.game.name,  
                summary: nextProps.game.summary,
                genre: nextProps.game.genre,
                min: nextProps.game.minPlayers,
                max: nextProps.game.maxPlayers,
                url: nextProps.game.boxartURL,
                rating: nextProps.game.rating,
                updatedAt: nextProps.game.updatedAt,
                firstSearch: false
            });
        }  
      }

    formatUpdateTime = (time) => {
        return Moment(time).format("MMM Do YY");              
    }

    toggleEdit = () => {
        let modalGameEdit = this.state.modalGameEdit;
        this.setState({
            modalGameEdit: !modalGameEdit
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEdit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/games/edit/${this.props.game.id}`, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
        .then(res => res.json())
        .then(json => { 
            this.setState({
                game: json.newPost
            })
        })
        .catch(err => err.message);
        this.props.refresh(this.props.game.id);
        this.toggleEdit();
    }

    loginCheck = (user) => {
        if (user !== null) {
            return (<div style={{marginTop: '.15rem'}} className="single-game-button-edit">
                        <Button onClick={this.toggleEdit} color="warning" className="game-edit-confirm">Edit Entry</Button>
                    </div>)
        } else {
            return null
        }
    }
    
    render() {
        if(this.state.game) {
            let date = this.state.updatedAt;
            return (
                <div className="catalog-main">
            
                        <div className="particle-container">
                            <Particles />
                        </div>
            
                        <Container className="single-all-container">
                        <div className="single-all-info-container">
                            <Row className="single-all-info single">
                                <Col sm="5">
                                    <Link className="arrow" to="/catalog"><FaArrowLeft /> Go back</Link>
                                    <img className="single-game-image" src={this.state.url} alt={this.state.game.name} />
                                </Col>
                                <Col sm="7">
                                    <div className="single-game-details-contain">
                                        <h5>Name:</h5>
                                        <h5>{this.state.name}</h5>
                                        <h5>Summary:</h5>
                                        <p>{this.state.summary}</p>
                                        <h5>Genre:</h5>
                                        <h5>{this.state.genre}</h5>
                                        <h6>Number of Players:</h6>
                                        <h6>{this.state.min} - {this.state.max}</h6>
                                        <h5>Rating:</h5>
                                        <h6>{this.state.rating}</h6>
                                        <h5>Last edited:</h5>
                                        <h6>{this.formatUpdateTime(date)}</h6>
                                        {this.loginCheck(this.props.user)}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>    

                    <Modal isOpen={this.state.modalGameEdit} toggle={this.toggleEdit}>
                        <ModalHeader toggle={this.toggle}>Edit Game</ModalHeader>
                        <ModalBody>
                            <form>
                                <label className="top-label" htmlFor="name">Name:</label><br/>
                                <input onChange={this.handleChange} value={this.state.name} name="name" type="text" id="name" /><br/>

                                <label htmlFor="summary">Summary:</label><br/>
                                <textarea onChange={this.handleChange} value={this.state.summary} name="summary" type="text" id="summary"></textarea><br/>

                                <label htmlFor="passwordConfirm">Genre</label><br/>
                                <input onChange={this.handleChange} value={this.state.genre} name="genre" type="text" id="genre" /><br/>

                                <label htmlFor="min">Minimum Players:</label><br/>
                                <input onChange={this.handleChange} value={this.state.min} name="min" type="number" id="min" min="1" /><br/>

                                <label htmlFor="max">Maximum Players:</label><br/>
                                <input onChange={this.handleChange} value={this.state.max} name="max" type="number" id="max" min="1" /><br/>

                                <label htmlFor="rating">Rating</label><br/>
                                <input onChange={this.handleChange} value={this.state.rating} name="rating" type="number" id="rating" min="0" max="5" /><br/>

                                <label htmlFor="url">Boxart URL</label><br/>
                                <input onChange={this.handleChange} value={this.state.url} name="url" type="text" id="url" /><br/>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.handleEdit} className="profile-edit-confirm" type="submit">Confirm Edit</Button>
                            <Button color="secondary" onClick={this.toggleEdit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                </div>
            )
        } else {
            return (
                <div className="catalog-main">
                    <div className="particle-container">
                        <Particles />
                    </div>
                    <Container className="single-all-container">
                        <div className="single-all-info-container">
                            <Row className="single-all-info single">
                                <Col className="arrow">
                                    <Link to="/catalog"><FaArrowLeft /> Go back</Link>
                                    <h3>An error occured, please go back and try again</h3>
                                </Col>
                            </Row>
                        </div>
                    </Container>    
                </div>

            )
        }
    }
}