import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';


const Home = () => {
    return (
        <div>
            <Navbar />
            <div id="landing-page" style={{ backgroundImage: './imgs/8.svg' }}>
            <h1 id="landing-page-title">Welcome to Team 4's Grace Shopper</h1>
            <h4 id="landing-page-description">Ipsum Loreum</h4>
    
        
            </div>
        </div>

    )
    
}

export default Home;