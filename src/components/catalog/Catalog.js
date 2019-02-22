import React, { Component } from 'react';
import { Container, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Particles from '../particles/Particle';
import APIURL from '../../helpers/environment';
import './Catalog.css';

export default class Catalog extends Component {
    constructor(props){
        super(props);
        this.state = {
            gameTable: this.props.games,
            search: 'a',
            modalAdd: false,
            name: '',
            summary: '',
            genre: '',
            min: '',
            max: '',
            url: '',
            rating: '',
            firstLoad: true
        }
    }

    componentWillMount() {
        this.searchModify(this.state.search);
    }

    searchModify = (query) => {
        this.props.refresh();
        this.setState({
            firstLoad: false
        })
        const search = query;
        const games = this.props.games;
        let filterGames = games.filter(function (game) {
            return game.name[0].toLowerCase() === search;
        });
        this.setState({
            gameTable: filterGames.map((data, index) => {
                let singleId = data.id;
                let newData = '/catalog/'+ singleId;
                return (<tr key={index} className="game-table-item">
                            <td>
                                <img src={data.boxartURL} alt={data.name} />
                            </td>
                            <td>{data.name}</td>
                            <td>{data.genre}</td>
                            <td>{data.minPlayers}</td>
                            <td>{data.maxPlayers}</td>
                            <td>{data.rating}</td>
                            <td onClick={() => this.props.singleGame(singleId)}>
                                <Link className="details-link" to={newData}>View details</Link>
                            </td>
                        </tr>);
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleClick = (e) => {
        let query = e.target.id;
        this.searchModify(query);
    }

    toggleAdd = () => {
        let modalAdd = this.state.modalAdd;
        this.setState({
            modalAdd: !modalAdd
        })
    }

    handleAdd = () => {
        fetch(`${APIURL}/games/add`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }, console.log('fetch completed'))
        })
        .then(() => {
            console.log('game created')
        })
        .catch(err => console.log(err.message))
        this.props.refresh();
        this.toggleAdd();
        this.searchModify('a');
    }

    render() {
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        let alphabetMap = alphabet.map(letter => {
            return <span id={letter} className="search-letter" key={letter} onClick={this.handleClick}>{letter.toUpperCase()}</span>
        });

        return (
            <div className="catalog-main">
        
                    <div className="particle-container">
                        <Particles />
                    </div>
        
                    <Container className="catalog-all-container">
                        <div className="catalog-all-info">
                            <div className="game-table">
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <p className="addition-suggestion">Choose a letter to sort by</p>
                                     {/* Add a game */}
                                    <p className="addition-suggestion">Don't see the game you play? <span className="game-add-span" onClick={this.toggleAdd}>Add it to the library</span></p>
                                </div>
                                <div className="alphabet">
                                    {alphabetMap}
                                </div> <hr />
                                <table>
                                    <tbody>
                                        <tr className="head-table-row">
                                            <th>Boxart</th>
                                            <th>Name</th>
                                            <th>Genre</th>
                                            <th>Min. Players</th>
                                            <th>Max. Players</th>
                                            <th>Rating</th>
                                            <th>Single View</th>
                                        </tr>
                                        {this.state.gameTable}
                                    </tbody>
                                </table>
                                <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd}>
                                    <ModalHeader toggle={this.toggle}>Add a Game</ModalHeader>
                                    <ModalBody>
                                        <form>
                                            <label className="top-label" htmlFor="name">Name:</label><br/>
                                            <input onChange={this.handleChange} value={this.state.name} type="text" id="name" /><br/>

                                            <label htmlFor="summary">Summary:</label><br/>
                                            <textarea onChange={this.handleChange} value={this.state.summary} type="text" id="summary"></textarea><br/>

                                            <label htmlFor="passwordConfirm">Genre</label><br/>
                                            <input onChange={this.handleChange} value={this.state.genre}  type="text" id="genre" /><br/>

                                            <label htmlFor="min">Minimum Players:</label><br/>
                                            <input onChange={this.handleChange} value={this.state.min} type="number" id="min" min="1" /><br/>

                                            <label htmlFor="max">Maximum Players:</label><br/>
                                            <input onChange={this.handleChange} value={this.state.max} type="number" id="max" min="1" /><br/>

                                            <label htmlFor="rating">Rating</label><br/>
                                            <input onChange={this.handleChange} value={this.state.rating} type="number" id="rating" min="0" max="5" /><br/>

                                            <label htmlFor="url">Boxart URL</label><br/>
                                            <input onChange={this.handleChange} value={this.state.url} type="text" id="url" /><br/>
                                        </form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={this.handleAdd} className="profile-edit-confirm" type="submit">Confirm Addition</Button>
                                        <Button color="secondary" onClick={this.toggleAdd}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                    </Container>

            </div>
        )
    }
}