import {Box, Container, Stack} from "@mui/material";
import React from "react";
import Category from './Category.js';
import Back from './Back.js';
import Footer from "./Footer.js";
import Extra from "./Extra.js";


const Main = () => {

    return (
        <Box sx={{backgroundColor: "#F5F5F5"}}>

            <Back/>
            <Container>
                <Category/>

                <hr/>
                <Stack
                    direction={{xs: "column", md: "row"}}
                    spacing={{xs: 1, sm: 2, md: 8}}
                    mt={8}
                >

                    <Box flex={1}>


                    </Box>
                </Stack>
            </Container>
            <Extra />

            <Footer />
        </Box>
    );
};

export default Main;