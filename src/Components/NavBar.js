import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DrawerComp from "./Drawer";
//import { Link } from "react-router-dom";
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
                <Tab href="http://localhost:3000/" label='Home'/>
                <Tab href="http://localhost:3000/products" label='Products'/>
                <Tab href="http://localhost:3000/contact" label='Contact'/>
              </Tabs>
              <Button sx={{ marginLeft: "auto" }} variant="inherit" href="http://localhost:3000/login">LogIn
                
              </Button>
              <Button sx={{ marginLeft: "10px" }} variant="contained" href="http://localhost:3000/signup">
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavBar;