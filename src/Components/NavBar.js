import React, {useCallback, useEffect, useState} from "react";
import {
    alpha,
    AppBar,
    Avatar,
    Box,
    ButtonGroup,
    Container,
    IconButton,
    Menu,
    MenuItem, styled,
    Tab,
    Tabs,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
    InputBase,
    Icon,
    Stack
} from "@mui/material";

import {css} from '@emotion/react';
import DrawerComp from "./Drawer.js";

import {Link} from "react-router-dom";
import {handleLogout} from "./Buttons/LogoutButton.js";
import Cart from "./Cart.js";
import {SearchSharp} from '@mui/icons-material';
import {searchProducts} from "../api/apirequests.js";
import SearchBar from "./SearchBar.js";

const NavBar = ({admin, setIsAdmin, setToken, order, setOrder, token, refreshCart, setRefreshCart, user}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [settings, setSettings] = useState([
        {label: 'Profile', to: '/me'},
        {label: 'Order History', onClick: () => window.location.href = "/orderhistory"},
        {label: 'Logout', onClick: () => handleLogout(setToken, setIsAdmin)}
    ]);

    const [value, setValue] = useState();
    const [hasToken, setHasToken] = useState(Boolean(localStorage.getItem("user-token")));
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const styles = {
        cartContainer: css`
          display: flex;
          justify-content: flex-end;
          align-items: center;
        `
    };


    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }


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
        let updatedSettings = [{
            label: 'Profile',
            to: '/me'
        }, {label: 'Order History', to: '/orderhistory'}, {
            label: 'Logout',
            onClick: () => handleLogout(setToken, setIsAdmin)
        }];
        if (!token) {
            // If there's no token, update the settings to remove the "Logout" and "Order History" options
            updatedSettings = updatedSettings.filter(setting => setting.label !== "Logout" && setting.label !== "Order History" && setting.label !== "Profile");
            updatedSettings = [...updatedSettings, {label: 'Sign Up', to: '/signup'}, {label: 'Log In', to: '/login'}];
        }
        if (admin === "true") {
            updatedSettings = [{label: 'Admin Dashboard', to: '/admin'}, ...updatedSettings];
        }

        setSettings(updatedSettings);
    }, [setToken, token, admin, user, refreshCart, order]);

    const altText = user && user.length > 0 ? user.charAt(0) : '';

    function stringAvatar(name) {
        return {
            sx: {
                backgroundColor: stringToColor(name),
            },
            children: `${altText}`,
        };
    }

    return (
        <React.Fragment>
            <AppBar sx={{background: "#1D3557", padding: "0", margin: "0"}} position="sticky">
                <Toolbar disableGutters sx={{ display: 'flex', alignItems: 'center' }}>
                    {isMatch ? (
                        <>
                            <Typography component={Link} to="/" align="center" sx={{
                                fontWeight: 900,
                                fontSize: 'calc(1.3rem + 1vw)',
                                textDecoration: "none",
                                color: "inherit",
                                cursor: "pointer",
                                marginLeft: "0.5rem",
                                marginBottom: '0px'
                            }}>
                                G<b style={{color: "#E63946"}}>G</b>
                            </Typography>
                            <Box sx={{flexGrow: 1, marginLeft: ".5rem", marginRight: "0.5rem"}}>
                                <SearchBar/>
                            </Box>
                            <Box sx={{flexGrow: 1}}/>
                            <Cart order={order} setOrder={setOrder} setRefreshCart={setRefreshCart}
                                  refreshCart={refreshCart} sx={{mr: theme.spacing(2)}}/>
                            <ButtonGroup>
                                <Container maxWidth="xl">
                                    <Toolbar disableGutters>
                                        <Box sx={{flexGrow: 0}}>
                                            <Tooltip title="Open settings">
                                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                                    {user ? <Avatar {...stringAvatar(`${user}`)} /> :
                                                        <Avatar src="/broken-image.jpg"/>}
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                sx={{mt: '45px'}}
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
                                                    <MenuItem key={setting.label} onClick={setting.onClick}
                                                              component={Link} to={setting.to}>
                                                        <Typography textAlign="center">{setting.label}</Typography>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </Box>
                                    </Toolbar>
                                </Container>
                            </ButtonGroup>
                        </>
                    ) : (
                        <>
                            <Typography component={Link} to="/" align="center" sx={{
                                fontWeight: 900, textDecoration: "none", color: 'inherit',
                                fontSize: 'calc(1.3rem + 1vw)'
                            }}>
                                Gadget<b style={{color: "#E63946"}}>Galaxy</b>
                            </Typography>
                            <Box sx={{flexGrow: 1, marginLeft: ".5rem"}}>
                                <SearchBar/>
                            </Box>


                            <Tabs
                                sx={{marginLeft: "auto"}}
                                indicatorColor="secondary"
                                textColor="inherit"
                                value={false}
                                onChange={(e, value) => setValue(value)}
                            >
                                <Tab label="Products" component={Link} to="/products"/>
                                <Tab label="Contact" component={Link} to="/contact"/>
                            </Tabs>
                            <Cart order={order} setOrder={setOrder} setRefreshCart={setRefreshCart}
                                  refreshCart={refreshCart}/>
                            <ButtonGroup>
                                <Container maxWidth="xl">
                                    <Toolbar disableGutters>
                                        <Box sx={{flexGrow: 0}}>
                                            <Tooltip title="Open settings">
                                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                                    {user ? <Avatar {...stringAvatar(`${user}`)} /> :
                                                        <Avatar src="/broken-image.jpg"/>}
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                sx={{mt: '45px'}}
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
                                                    <MenuItem key={setting.label} onClick={setting.onClick}
                                                              component={Link} to={setting.to}>
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
