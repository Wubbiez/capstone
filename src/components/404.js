import React from "react";
import { Link } from "react-router-dom";

// import Shortcut from '@mui/icons-material/Shortcut';

import {Button, ButtonGroup} from '@mui/material/';

const PageNotFound = () => {
    return (
        <div id="four04-page" style={{ backgroundImage: './imgs/8.svg' }}>
        <h1 id="four04-title">Oops! We couldn't find that page.</h1>
        <h4 id="four04-description">Maybe you can find what you're looking for here?</h4>
   
        {/* <Shortcut style={{ display: 'flex', transform: 'rotate(130deg)', fontSize: 100, color: 'secondary', alignItems: 'right', justifyContent: 'right', marginLeft: '70' }} /> */}
   
       <ButtonGroup id="four04-button-group" color='secondary' aria-label="medium secondary button group" size="large">
         <Button variant="contained">Products</Button>
         <Button variant="contained">Login</Button>
         <Button variant="contained">Cart</Button>
       </ButtonGroup>
       </div>
   
    

    )
}

export default PageNotFound;