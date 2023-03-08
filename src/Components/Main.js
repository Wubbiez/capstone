import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Catagory from './Catagory.js';
import Back from './Back.js';
import Rightbar from './Rightbar.js';
import NavBar from "./NavBar.js";
import Footer from './Footer.js';


const Main = () => {
  return (
    <Box>
        <NavBar />
      <Back />
      <Container>
        <Catagory />
        
        <hr />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, sm: 2, md: 8 }}
          mt={8}
        >
         
          <Box flex={1}>
            <Rightbar />
            <Footer />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Main;