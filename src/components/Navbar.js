import React from "react";

import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import { CatchingPokemonTwoTone } from "@mui/icons-material";


const Navbar = () => {

    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge='start' color="inherit" aria-label='logo'>
                    <CatchingPokemonTwoTone>

                    </CatchingPokemonTwoTone>
                </IconButton>
                <Typography variant="h5" component='div' sx={{flexGrow: 1}}>Grace Shopper Team 4</Typography>
                <Stack direction='row' spacing='2'>
                    <Button color="inherit">About Us</Button>
                    <Button color="inherit">Reviews</Button>
                    <Button color="inherit">Products</Button>
                    <Button color="inherit">Login</Button>
                </Stack>
            </Toolbar>
        </AppBar>

    )
}

export default Navbar;