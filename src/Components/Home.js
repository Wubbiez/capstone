
import React from 'react';
import NavBar from './NavBar.js';

import {Box, Typography} from '@mui/material/';

const Home = () => {
    return (
        <React.Fragment>
            <NavBar></NavBar>
            <Box 
        sx={{
            maxHeight: '100%',
            maxWidth: '100%',
            backgroundColor: 'primary.light',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center'
        }}>
            <Typography variant="h2"
                sx={{
                    paddingTop: '5rem',
                    paddingBottom: '2rem',
                    fontSize: '5em',
                    fontWeight: 'bold'
                }}>
                    Welcome to Team 4's Grace Shopper
            </Typography>
            <Typography variant="h5"
                sx={{
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                    fontWeight: 'bold'
                }}>
                Electronics Boutique</Typography>
                
                </Box>
           
        </React.Fragment>
    )
}

export default Home;
