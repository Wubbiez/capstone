
import React from "react";
import { Link } from "react-router-dom";




import {Box, Button, ButtonGroup, Typography} from '@mui/material/';

const PageNotFound = () => {
    return (
        <Box 
        sx={{
            maxHeight: '100%',
            maxWidth: '100%',
            backgroundImage: 'url("../imgs/8.png")',
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
                    Oops! We couldn't find that page.
            </Typography>
            <Typography variant="h5"
                sx={{
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                    fontWeight: 'bold'
                }}>
                Maybe you can find what you're looking for here?</Typography>
   
   
       <ButtonGroup color='secondary' aria-label="medium secondary button group" size="large">
         
            <Link to='/products'>
                <Button variant="contained">Products
                </Button>
            </Link>
            <Link to='/login'>
                <Button variant="contained">Login
                </Button>
            </Link>
            <Link to='/cart'>
                <Button variant="contained">Cart
                </Button>
            </Link>
       </ButtonGroup>
       </Box>
   
    

    )
}

export default PageNotFound;
