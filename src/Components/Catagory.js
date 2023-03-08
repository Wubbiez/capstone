import React from "react";
import Iconic from '../Images/images/Iconic.jpg';
import Smart from "../Images/images/Smart.jpg";
import Ultra from "../Images/images/Ultra.jpg";
import { Box, Stack, styled, Typography } from "@mui/material";

const StyledBox = styled(Box)({
  height: 200,
  width: "100%",
  cursor: "pointer",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
});
const StyledTypography = styled(Typography)({
  margin: "25% 50px 25% 50px",
  background: "white",
  opacity: "0.8",
});
const Categories = () => {
  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        mt={5}
      >
        <StyledBox sx={{ backgroundImage: `url(${Ultra})` }}>
          <StyledTypography align="center" variant="h3">
            Ultra Fridge
          </StyledTypography>
        </StyledBox>
        <StyledBox sx={{ backgroundImage: `url(${Smart})` }}>
          <StyledTypography align="center" variant="h3">
            Smart Plus
          </StyledTypography>
        </StyledBox>
        <StyledBox sx={{ backgroundImage: `url(${Iconic})` }}>
          <StyledTypography align="center" variant="h3">
            Iconic 
          </StyledTypography>
        </StyledBox>
      </Stack>
    </Box>
  );
};

export default Categories;