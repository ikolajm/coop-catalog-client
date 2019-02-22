import './Welcome.css';
import React from 'react';
import Particles from '../particles/Particle';
import { 
    FaRegArrowAltCircleDown,
    FaThumbsUp, 
    FaComment 
} from 'react-icons/fa';
import { IoLogoGameControllerB } from 'react-icons/io';
import {
    Container,
    Row,
    Col, 
    Button
} from 'reactstrap';

const Welcome = () => {
    return(
        <div className="welcome-main">

            {/* Particle splash */}
            <div className="welcome-splash">
                <div className="particle-container">
                    <Particles />
                </div>

                <section className="welcome-content">
                    <img src={require('../../assets/logo.png')} alt="logo" />
                    <p>Your home for local multiplayer PC games</p>

                    <div className="scroll-info-container">
                        <span>Scroll down for more information!</span>
                        <a href="#welcome-purpose-container" className="arr-down"><FaRegArrowAltCircleDown /></a>
                    </div>
                </section>
            </div>

            <hr  className="divider" />

            <Container className="post-welcome-content">

                {/* Purpose */}
                <div id="welcome-purpose-container">
                    <section className="welcome-purpose">
                        <h1>Our Purpose</h1>

                        <div className="purpose-container">
                            <p>If you're anything like us, a lot of your friends still play on console. So when it's your turn to host, what are you going to do for fun? You can only dust off the old XBOX or Playstation so many times before things become to feel dull, besides, you've been playing those same games for over a decade now. You got into PC gaming to take advantage of all the next-gen technology, but that doesn't mean that local multiplayer needs to become a thing of the past.</p>

                            <p className="middle-p">That's where Co-op Catalog comes into play!</p>

                            <p>You and users like you are able to take advantage of a user driven database where all posted games are titles that someone has enjoyed playing with their friends locally. Fellow users can then contribute to the post by providing reviews regarding their personal experience, ensuring that you get the most information possible before making that purchase!</p>
                        </div>
                        
                    </section>
                </div>

                <hr className="divider" />

                {/* Block layout what can you do */}
                <section className="welcome-action-options">
                    <h1>"So what can I do here exactly?"</h1>
                    <div className="welcome-box-container">
                        <div className="block">
                            <div>
                                <p className="icon"><IoLogoGameControllerB /></p>
                                <p>Find a PC game to play on the couch with your friends</p>
                            </div>
                        </div>

                        <div className="block">
                            <div>
                                <p className="icon"><FaThumbsUp /></p>
                                <p>If you find a game that isn't in the database yet, add it in and show your fellow users</p>
                            </div>
                        </div>

                        <div className="block">
                            <div>
                                <p className="icon"><FaComment /></p>
                                <p>Let everyone know about your experience when you played one of the listed games</p>
                            </div>
                        </div>
                    </div>
                </section>

            </Container>

        </div>
    )
}

export default Welcome;