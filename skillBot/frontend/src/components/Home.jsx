import React, { useEffect } from 'react'
import headerpic from '/img/headerpic.png'
import Typewriter from 'typewriter-effect';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../styles/Home.css'
import Dash from './Dash';
import ChatBot from './ChatBot';
import ChatBotMenu from './ChatBotMenu';
const Home = () => {

    return (
        <>
            <Navbar />
            <div class='home'>
                <div className='header'>
                    <div className='header-text'>
                        <h1 id="special-header">
                            <Typewriter
                                options={{
                                    strings: ["DialogDuo", "Skill Bot"],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h1>
                        <p>Your personalized career companion guiding high school students in choosing paths, exploring colleges, internships, and higher education, while offering resume building tools for a seamless transition to a successful future.</p>
                    </div>
                    <div className='header-img'>
                        <span style={{ marginLeft: "190px" }}></span>
                        <img src={headerpic} alt="homepage logo" />
                    </div>
                </div>
            </div>
            <ChatBotMenu />
            <Dash />
            <Footer />
        </>
    )
}

export default Home