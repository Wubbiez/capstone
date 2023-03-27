import {Box, Stack, styled, Typography} from "@mui/material";
import React from "react";
import Watch from "../Components/Images/watch.jpg";
import LapTop from "../Components/Images/laptop.png";
import Fridge from "../Components/Images/fridge.jpg";
import VideoGame from "./Images/video_game.jpg";
import Tv from "../Components/Images/tv.jpeg";
import {Link} from "react-router-dom";


const StyledBox = styled(Box)(({theme}) => ({
    height: "15vw",
    width: "15vw",
    cursor: "pointer",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    border: 1,
    borderRadius: '17px',
    justifyContent: "center",
    alignItems: "center",
    display: "flex",

    [theme.breakpoints.down("sm")]: {
        height: "40vw",
        width: "100vw",
    }
}));

const StyledTypography = styled(Typography)({
    margin: "25% 50px 25% 50px",
    background: "white",
    opacity: "0.8",
    justifyContent: "center",
    alignItems: "center",
});

const StyledLink = styled(Link)({
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
});

const Category = () => {


    return (
        <Box>
            <Stack
                direction={{xs: "column", sm: "row"}}
                spacing={{xs: 1, sm: 2, md: 4}}
                mt={6}
                justifyContent="center"
                alignItems="center"
            >
                <StyledLink to="/products?category=FRIDGES">
                    <StyledBox sx={{backgroundImage: `url(${Fridge})`}}>

                        <StyledTypography align="center" variant="h6">
                            Refrigerators
                        </StyledTypography>

                    </StyledBox>
                </StyledLink>
                <StyledLink to="/products?category=LAPTOPS">
                    <StyledBox sx={{backgroundImage: `url(${LapTop})`}}>

                        <StyledTypography align="center" variant="h6">
                            Laptops
                        </StyledTypography>

                    </StyledBox>
                </StyledLink>
                <StyledLink to="/products?category=SMART-WATCHES">
                    <StyledBox sx={{backgroundImage: `url(${Watch})`}}>

                        <StyledTypography align="center" variant="h6">
                            Smart-Watches
                        </StyledTypography>

                    </StyledBox>
                </StyledLink>
                <StyledLink to="/products?category=VIDEO-GAMES">
                    <StyledBox sx={{backgroundImage: `url(${VideoGame})`}}>

                        <StyledTypography align="center" variant="h6">
                            Video-Games
                        </StyledTypography>

                    </StyledBox>
                </StyledLink>
                <StyledLink to="/products?category=TELEVISIONS">
                    <StyledBox sx={{backgroundImage: `url(${Tv})`}}>

                        <StyledTypography align="center" variant="h6">
                            TV's
                        </StyledTypography>

                    </StyledBox>
                </StyledLink>
            </Stack>
        </Box>
    );
};

export default Category;
