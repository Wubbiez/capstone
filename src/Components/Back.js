import React from "react";
import {Box, Typography} from "@mui/material";
import main from "../Components/Images/main.jpg";

const Back = () => {
    return (
        <Box sx={{
            backgroundColor: "#F1FAEE"
        }}>
            <Typography align="center" variant="h3" sx={{fontWeight: 900}}>
                Gadget<b style={{color: "#E63946"}}>Galaxy</b>
            </Typography>
            <Typography align="center" variant="subtitle1" sx={{fontWeight: 100}}>
                We Make Shopping Fun!
            </Typography>
            <Box
                sx={{
                    backgroundImage: `url(${main})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "black",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    height: 600,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: {xs: "100%", sm: "50%", md: "40%"},
                        padding: {xs: 3, sm: 2, md: 20},
                    }}
                >
                    <Box sx={{backgroundColor: "#F1FAEE", opacity: "0.8"}}>
                        <Typography variant={"h6"} color="#E63946" align="center" pt={7}>
                            Trending Technologies
                        </Typography>
                        <Typography variant="h4" align="center">
                            Life is Boring without Shopping!
                        </Typography>
                        <Typography variant="body1" align="center" pb={7}>
                            View our available items below ..
                        </Typography>

                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Back;