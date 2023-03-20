import { Box, Stack, Typography, styled } from "@mui/material";
import React from "react";
import {Email} from '@mui/icons-material/';
import {Call} from '@mui/icons-material/';
import { Facebook, Instagram, Twitter } from "@mui/icons-material/";
const SocialBox = styled(Box)({
  display: "flex",
  gap: 10,
  color: "white",
});

const Footer = () => {
  return (
    <Box sx={{ background: "#003A6E", height: "80%", width: '100%' }}>
      <Stack direction={{ xs: "row", md: "row" }} p={3}>
        <Box flex={1}>
          <Typography color={"#ffff"} align={"center"}>
            Get In Touch
          </Typography>
          <Typography color={"#808080"} align={"center"} >
         <Email /> GadgetGalaxy@gmail.com
          </Typography>
          <Typography color={"#808080"} align={"center"} marginBottom={3} >
          <Call />  +1-555-232-2123
          </Typography>
          <Typography color={"#ffff"} align={"center"} mt={20}>
            CopyRight@GadgetGalaxy
          </Typography>
        
        </Box>
        <Box flex={2}>
          <Typography color={"#ffff"} align={"center"}>
           About Us
          </Typography>
          <Typography color={"#808080"} align={"center"}>
          Our store is ranked one of the best shopping site in 2023
          </Typography><br></br>
          <Typography color={"#808080"} align={"center"}>
          We are honest, transparent and committed to doing what is best for our customers and our company.
          </Typography>
          
        </Box>
        <Box flex={1}>
          <Typography color={"#ffff"} align={"center"} variant={"body1"}>
            Categories
          </Typography>
          <Typography color={"#808080"} variant={"body2"} align={"center"}>
            Refrigerator
          </Typography>
          <Typography color={"#808080"} variant={"body2"} align={"center"}>
            Laptops
          </Typography>
          <Typography color={"#808080"} variant={"body2"} align={"center"}>
            Smart Watches
          </Typography>
          <Typography color={"#808080"} variant={"body2"} align={"center"}>
            Video Games
            </Typography>
            <Typography color={"#808080"} variant={"body2"} align={"center"}>
            TV's
            </Typography>
        </Box>
        <Box>
          <Typography color={"#ffff"} align={"center"}>
            Social Media
          </Typography>
          <SocialBox color={'#808080'}>
            <Facebook />
            <Instagram />
            <Twitter />
          </SocialBox>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;