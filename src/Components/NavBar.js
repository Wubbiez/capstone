import React, { useState } from "react";
import {
  AppBar,
  Button,
  ButtonGroup,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {AddShoppingCart} from '@mui/icons-material';
import DrawerComp from "./Drawer.js";

import { Link } from "react-router-dom";
const NavBar = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#00008B" }}>
        <Toolbar>
          <AddShoppingCartIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                The BroZ Store
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="Home"  component={Link} to="/" />
                <Tab label="Products"  component={Link} to="/products" />
          
                <Tab label="Cart" component={Link} to="/cart"/>
                <Tab label="Contact" component={Link} to="/contact"/>
              </Tabs>
              <ButtonGroup>
                <Link to="/login">
                  <Button variant="contained">
                    Login
                  </Button>
                  </Link>
                <Link to="/signup">
                  <Button variant="contained">
                    SignUp
                  </Button>
                </Link>
              </ButtonGroup>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavBar;
