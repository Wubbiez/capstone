import React, { useState, useEffect } from "react";
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
    Box,
Tooltip,
    Avatar,
    IconButton,
    Container,
    Menu,
    MenuItem,


} from "@mui/material";
import {AddShoppingCart} from '@mui/icons-material';
import DrawerComp from "./Drawer.js";

import { Link } from "react-router-dom";
import {handleLogout} from "./Buttons/LogoutButton.js";
import Cart from "./Cart.js";

const NavBar = ({setIsAdmin, setToken, order, setOrder}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [settings, setSettings] = useState([
    { label: 'Profile', onClick: () => console.log('Profile clicked') },
    { label: 'Order History', onClick: () => window.location.href="/orderhistory" },
    { label: 'Logout', onClick: () => handleLogout(setToken,setIsAdmin) }
  ]);


  const [value, setValue] = useState();

  const [hasToken, setHasToken] = useState(Boolean(localStorage.getItem("user-token")));



  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  useEffect(() => {
    const token = localStorage.getItem("user-token");
    const admin = localStorage.getItem("user-is_admin");
    setHasToken(Boolean(token));
    if (!token) {
      // If there's no token, update the settings to remove the "Logout" option
      setSettings(settings.filter(setting => setting.label !== "Logout"));
      setSettings(prevSettings => [...prevSettings, { label: 'Sign Up', onClick: () => window.location.href="/signup" }, { label: 'Log In', onClick: () => window.location.href = "/login" }, { label: 'Order History', onClick: () => window.location.href="/orderhistory" }]);
    }
    if(admin){
      setSettings(prevSettings => [{ label: 'Admin Dashboard', onClick: () => window.location.href = "/admin" }, ...prevSettings ]);
    }
    else {
      // If there is a token, make sure the "Logout" option is available
      if (!settings.find(setting => setting.label === "Logout")) {
        setSettings(prevSettings => [...prevSettings, { label: 'Log Out', onClick: () => handleLogout(setToken,setIsAdmin) }]);
      }
    }
  }, [setIsAdmin, setToken]);



  return (
    <React.Fragment>
      <AppBar sx={{ background: "#00008B"}}  position="sticky" >
        <Toolbar>
          <AddShoppingCart sx={{ transform: "scale(2)" }} />
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
                value={false}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="Home"  component={Link} to="/" />
                <Tab label="Products"  component={Link} to="/products" />
                <Tab label="Contact" component={Link} to="/contact"/>
              </Tabs>
              <Cart order={order} setOrder={setOrder} />
              <ButtonGroup>
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                      </Tooltip>
                      <Menu
                          sx={{ mt: '45px' }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                      >
                        {settings.map((setting) => (
                            <MenuItem key={setting.label} onClick={setting.onClick}>
                              <Typography textAlign="center">{setting.label}</Typography>
                            </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                    </Toolbar>
                    </Container>
              </ButtonGroup>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavBar;
