import React from "react";
import { Box, Typography } from "@mui/material";
import Backg from  '../Images/images/Backg.jpg';
const Back = () => {
  return (
    <Box>
      <Typography align="center" variant="h3" sx={{ fontWeight: 900 }}>
      Team 4's<b style={{ color: "red" }}>Store</b>
      </Typography>
      <Typography align="center" variant="body2" sx={{ fontWeight: 100 }}>
        We Make Shopping Fun!
      </Typography>
      <Box
        sx={{
          backgroundImage: `url(${Backg})`,
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
            width: { xs: "100%", sm: "50%", md: "40%" },
            padding: { xs: 3, sm: 2, md: 20 },
          }}
        >
          <Box sx={{ background: "white", opacity: "0.8" }}>
            <Typography variant={"h6"} color="tomato" align="center" pt={8}>
              Trending Technologies
            </Typography>
            <Typography variant="h4" align="center">
              Life is Boring without Shopping!
            </Typography>
            <Typography variant="body1" align="center" pb={8}>
              we love to provide what your home deserve
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Back;