
import { Box, Stack, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Watch from '../Images/watch.jpg';
import LapTop from "../Images/laptop.png";
import Fridge from "../Images/fridge.jpg";
import VideoGame from "../Images/video_game.jpeg";
import Tv from "../Images/tv.jpeg";
import { Link } from "@mui/material";
// import { red } from "@mui/material/colors";
;
// import { Link } from "react-router-dom";

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
const Category = ({setCategory}) => {
    
    const handleClick = (categoryName) => {
        categoryName.toUpperCase();
        setCategory(categoryName);
        console.log(categoryName)
    };

    return (
        <Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                mt={6}
            >
                <StyledBox
                    sx={{ backgroundImage: `url(${Fridge})` }}
                    onClick={() => handleClick("FRIDGE")}
                >
                    <StyledTypography align="center" variant="h6">
                        Refrigerator
                    </StyledTypography>
                </StyledBox>
                <StyledBox
                    sx={{ backgroundImage: `url(${LapTop})` }}
                    onClick={() => handleClick("LAPTOP")}
                >
                    <StyledTypography align="center" variant="h6">
                        Laptops
                    </StyledTypography>
                </StyledBox>
                <StyledBox
                    sx={{ backgroundImage: `url(${Watch})` }}
                    onClick={() => handleClick("SMART-WATCHES")}
                >
                    <StyledTypography align="center" variant="h6">
                        Smart-Watches
                    </StyledTypography>
                </StyledBox>
                <StyledBox
                    sx={{ backgroundImage: `url(${VideoGame})` }}
                    onClick={() => handleClick("VIDEO-GAMES")}
                >
                    <StyledTypography align="center" variant="h6">
                       Video-Games
                    </StyledTypography>
                </StyledBox>
                <StyledBox
                    sx={{ backgroundImage: `url(${Tv})` }}
                    onClick={() => handleClick("TV")}
                >
                    <StyledTypography align="center" variant="h6">
                        TV's
                    </StyledTypography>
                </StyledBox>
            </Stack>
        </Box>
    );
};

export default Category;