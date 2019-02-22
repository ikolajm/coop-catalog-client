import React, { Component } from 'react';
import Nav from './components/nav/Navbar';
import Welcome from './components/welcome/Welcome';
import Catalog from './components/catalog/Catalog';
import SingleGame from './components/catalog/Single';
import Profile from './components/profile/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import APIURL from './helpers/environment';
import './App.css';
 
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            sessionToken: undefined,
            user: null,
            gameData: [],
            singleData: null
        }
    }

    // Check token from local storage, clear existing game data
    componentWillMount() {
        const token = localStorage.getItem('token');
        if (token && this.state.user === null) {
            localStorage.removeItem('token');
        } else {
            if (token && this.state.sessionToken === undefined) {
                this.setState({
                    sessionToken: token
                });
            }
        }
        this.fetchGameData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.singleData) {
            this.setState({
                singleData: nextProps.singleData
            })
        }
    }

    // Store the session token
    storeSessionToken = (token) => {
        this.setState({
            sessionToken: token,
        })
    }

    storeUserData = (user) => {
        this.setState({
            user: user
        });
    }

    // Remove session token and reset user data
    removeSessionToken = () => {
        localStorage.removeItem('token');
        this.setState({
            sessionToken: undefined,
            user: null
        })
    }

    // Get all game data
    fetchGameData = () => {
        let url = `${APIURL}/games/`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(json => { 
            this.setState({
                gameData: json.games
            });
        })
        .catch(err => err.message);
    }

    // Get single game data
    findSingle = (id) => {
        let url = `${APIURL}/games/${id}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
                singleData: json.game
            })
        })
        .catch(err => err.message)
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Nav
                    token={this.state.sessionToken}
                    storeSessionToken={this.storeSessionToken}
                    removeSessionToken={this.removeSessionToken}
                    storeUserData={this.storeUserData} />
                    <Switch>
                        <Route exact path="/">
                            <Welcome />
                        </Route>
                        <Route exact path="/catalog">
                            <Catalog refresh={this.fetchGameData} games={this.state.gameData} singleGame={this.findSingle} />
                        </Route>
                        <Route exact path="/catalog/:id">
                            <SingleGame refresh={this.findSingle} game={this.state.singleData} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile storeSessionToken={this.storeSessionToken} storeUserData={this.storeUserData} user={this.state.user} />
                        </Route>
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}