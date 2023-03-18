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
import {css} from '@emotion/react';
import {AddShoppingCart} from '@mui/icons-material';
import DrawerComp from "./Drawer.js";

import { Link } from "react-router-dom";
import {handleLogout} from "./Buttons/LogoutButton.js";
import Cart from "./Cart.js";

const NavBar = ({setIsAdmin, setToken, order, setOrder, token, refreshCart, setRefreshCart}) => {
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

  const styles = {
    cartContainer: css`
      display: flex;
      justify-content: flex-end;
      align-items: center;
    `
  };


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
    let updatedSettings = [
      { label: 'Profile', onClick: () => console.log('Profile clicked') },
      { label: 'Order History', to: '/orderhistory' },
      { label: 'Logout', onClick: () => handleLogout(setToken,setIsAdmin) }
    ];
    if (!token) {
      // If there's no token, update the settings to remove the "Logout" and "Order History" options
      updatedSettings = updatedSettings.filter(setting => setting.label !== "Logout" && setting.label !== "Order History");
      updatedSettings = [...updatedSettings, { label: 'Sign Up', to: '/signup'}, { label: 'Log In', to: '/login' }];
    }
    if(admin){
      updatedSettings = [{ label: 'Admin Dashboard', to: '/admin'}, ...updatedSettings ];
    }
    setSettings(updatedSettings);
  }, [setIsAdmin, setToken,token]);

  return (
      <React.Fragment>
        <AppBar sx={{ background: "#1D3557", padding: "0", margin: "0"}}  position="sticky" >
          <Toolbar disableGutters>
            {isMatch ? (
                <>
                  <Typography sx={{ fontSize: "2rem" }}>
                    GadgetGalaxy
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Cart order={order} setOrder={setOrder} setRefreshCart={setRefreshCart} refreshCart={refreshCart} sx={{ mr: theme.spacing(2) }} />
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
                  <Cart order={order} setOrder={setOrder} setRefreshCart={setRefreshCart} refreshCart={refreshCart}  />
                  <ButtonGroup>
                    <Container maxWidth="xl">
                      <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 0 }}>
                          <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                              <Avatar alt="Z" src="/static/images/avatar/2.jpg" />
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
                                <MenuItem key={setting.label} onClick={setting.onClick} component={Link} to={setting.to}>
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
