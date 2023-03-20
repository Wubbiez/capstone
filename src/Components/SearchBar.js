// component that handles searching all products using an input string

import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {alpha, Box, Button, InputBase, Paper, styled, Hidden} from "@mui/material";
import {Search, SearchSharp} from "@mui/icons-material";
import {getAllProductsBySearchTerm} from "../api/apirequests.js";

// search bar component using material ui search icon and input base

const SearchBar = () => {

    const SearchContainer = styled('div')(({ theme }) => ({
        position: 'relative',
        width: '100%',
    }));

    const Search = styled("div")(({theme}) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%", // set your desired width here
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
    }));



    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        height: '100%',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 0, 0),
            // vertical padding + font size from searchIcon
            transition: theme.transitions.create('width'),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 0,
            },
        },
    }));

    const StyledBox = styled(Box)(({ theme }) => ({
        // remove position and adjust top and left properties
        position: 'absolute',
        top: "calc(100% + 8px)",
        left: 0,
        right: 0,
        zIndex: 1,
        bgcolor: "background.paper",
        mt: 1,
        p: 1,
        maxHeight: 200,
        overflowY: "scroll",
        borderRadius: 1,
        boxShadow: 1,
        backgroundColor: '#f5f5f5',
    }));


    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);
    const history = useNavigate();


    function handleSubmit() {
        if(searchTerm !== "") {
            history(`/products/${searchResults[0].id}`);
        }
    }

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        try {
            getAllProductsBySearchTerm(term).then((response) => {
                console.log(response);
                const products = response.map((product) => ({
                    id: product.product_id,
                    name: product.title
                }));
                setSearchResults(products);
                setDropdownItems(products);
                setShowDropdown(true);
            });

        } catch (e) {
            console.log(e);
        }
    };

    const handleDropdownClick = (item) => {

        setSearchTerm(item);
        history(`/products/${item.id}`);
        setSearchTerm('');
        setShowDropdown(false);
    };



    useEffect(() => {
        if (searchTerm === '') {
            setShowDropdown(false);
        }

    }, [searchTerm, history]);


    return (
        <>
            <SearchContainer>
        <form onSubmit={handleSubmit}>
            <Search>
                <Hidden smDown>
                <SearchIconWrapper>
                    <SearchSharp />
                </SearchIconWrapper>
                </Hidden>
                <StyledInputBase
                    placeholder="Search…"
                    value={searchTerm}
                    onChange={handleSearch}
                    autoFocus
                    inputProps={{ maxLength: 50 }}
                />


            </Search>
        </form>
    {showDropdown && (
        <StyledBox>
            {dropdownItems.map((item, index) => (
                <Button
                    key={index}
                    onClick={() => handleDropdownClick(item)}
                    sx={{width: "100%", justifyContent: "left"}}
                >
                    {item.name}
                </Button>
            ))}
        </StyledBox>
    )}
    </SearchContainer>
        </>
    );
};

export default SearchBar;