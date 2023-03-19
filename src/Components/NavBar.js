import React, {useEffect, useState} from "react";
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
    Icon
} from "@mui/material";
import {css} from '@emotion/react';
import DrawerComp from "./Drawer.js";

import {Link} from "react-router-dom";
import {handleLogout} from "./Buttons/LogoutButton.js";
import Cart from "./Cart.js";
import {SearchSharp} from '@mui/icons-material';

const NavBar = ({admin, setIsAdmin, setToken, order, setOrder, token, refreshCart, setRefreshCart}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [settings, setSettings] = useState([
        {label: 'Profile', onClick: () => console.log('Profile clicked')},
        {label: 'Order History', onClick: () => window.location.href = "/orderhistory"},
        {label: 'Logout', onClick: () => handleLogout(setToken, setIsAdmin)}
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

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
        display: "flex",
        flexGrow: 1,
        maxWidth: "50",
        alignItems: "center", // add this line to center vertically
    }));


    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        height: '100%',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 0, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));


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
            {label: 'Profile', onClick: () => console.log('Profile clicked')},
            {label: 'Order History', to: '/orderhistory'},
            {label: 'Logout', onClick: () => handleLogout(setToken, setIsAdmin)}
        ];
        if (!token) {
            // If there's no token, update the settings to remove the "Logout" and "Order History" options
            updatedSettings = updatedSettings.filter(setting => setting.label !== "Logout" && setting.label !== "Order History");
            updatedSettings = [...updatedSettings, {label: 'Sign Up', to: '/signup'}, {label: 'Log In', to: '/login'}];
        }
        if (admin === "true") {
            updatedSettings = [{label: 'Admin Dashboard', to: '/admin'}, ...updatedSettings];
        }
        setSettings(updatedSettings);
    }, [setToken, token, admin]);

    return (
        <React.Fragment>
            <AppBar sx={{background: "#1D3557", padding: "0", margin: "0"}} position="sticky">
                <Toolbar disableGutters>
                    {isMatch ? (
                        <>
                            <Typography align="center"  sx={{ fontWeight: 900,
                                                            fontSize: 'calc(1.3rem + 1vw)' }}>
                            Gadget<b style={{ color: "#E63946" }}>Galaxy</b>
                            </Typography>
                            <Box sx={{flexGrow: 1}}/>
                            <Cart order={order} setOrder={setOrder} setRefreshCart={setRefreshCart}
                                  refreshCart={refreshCart} sx={{mr: theme.spacing(2)}}/>
                            <ButtonGroup>
                                <Container maxWidth="xl">
                                    <Toolbar disableGutters>
                                        <Box sx={{flexGrow: 0}}>
                                            <Tooltip title="Open settings">
                                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                                    <Avatar alt="Z" src="/static/images/avatar/2.jpg"/>
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
                            <Typography component={Link} to="/" align="center" sx={{ fontWeight: 900, textDecoration: "none", color: 'inherit',
                                fontSize: 'calc(1.3rem + 1vw)' }}>
                                Gadget<b style={{ color: "#E63946" }}>Galaxy</b>
                            </Typography>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchSharp />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}


                                />
                            </Search>

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
                                                    <Avatar alt="Z" src="/static/images/avatar/2.jpg"/>
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
