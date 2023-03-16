import { Box, Stack, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Watch from "../Components/Images/watch.jpg";
import LapTop from "../Components/Images/laptop.png";
import Fridge from "../Components/Images/fridge.jpg";
import VideoGame from "../Components/Images/video_game.jpeg";
import Tv from "../Components/Images/tv.jpeg";
import {Link} from "react-router-dom";


const StyledBox = styled(Box)({
    height: 200,
    width: "100%",
    cursor: "pointer",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    border: 1,
    borderRadius: '17px',
});
const StyledTypography = styled(Typography)({
    margin: "25% 50px 25% 50px",
    background: "white",
    opacity: "0.8",
});

const Category = () => {


    return (
        <Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={6}
            >
                <StyledBox sx={{ backgroundImage: `url(${Fridge})` }}>
                    <Link to="/products?category=FRIDGE">
                        <StyledTypography align="center" variant="h6">
                            Refrigerator
                        </StyledTypography>
                    </Link>
                </StyledBox>
                <StyledBox sx={{ backgroundImage: `url(${LapTop})` }}>
                    <Link to="/products?category=LAPTOP">
                        <StyledTypography align="center" variant="h6">
                            Laptops
                        </StyledTypography>
                    </Link>
                </StyledBox>
                <StyledBox sx={{ backgroundImage: `url(${Watch})` }}>
                    <Link to="/products?category=SMART-WATCHES">
                        <StyledTypography align="center" variant="h6">
                            Smart-Watches
                        </StyledTypography>
                    </Link>
                </StyledBox>
                <StyledBox sx={{ backgroundImage: `url(${VideoGame})` }}>
                    <Link to="/products?category=VIDEO-GAMES">
                        <StyledTypography align="center" variant="h6">
                            Video-Games
                        </StyledTypography>
                    </Link>
                </StyledBox>
                <StyledBox sx={{ backgroundImage: `url(${Tv})` }}>
                    <Link to="/products?category=TV">
                        <StyledTypography align="center" variant="h6">
                            TV's
                        </StyledTypography>
                    </Link>
                </StyledBox>
            </Stack>
        </Box>
    );
};

export default Category;
