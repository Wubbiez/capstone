import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Box, Card, CardContent, Grid, List, ListItem, ListItemText, styled, Typography} from "@mui/material";
import {getAllProducts} from "../api/apirequests.js";
import SingleProductModal from "./SingleProductModal.js";
import category from "./Category.js";
import {alpha} from '@mui/system';

const StyledTypography = styled(Typography)({
    fontSize: 'calc(2rem + 2vw)',
    '@media (max-width: 600px)': {
        fontSize: 'calc(1.5rem + 1.5vw)',
    },
});

function SampleProducts({order, setOrder, user, setIsAdmin, isAdmin, setRefreshCart, userId}) {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const location = useLocation();
    const [category, setCategory] = useState(new URLSearchParams(location.search).get('category'));
    const [searchString, setSearchString] = useState("");
    const history = useNavigate();
    const categories = ['ALL PRODUCTS', 'FRIDGES', 'LAPTOPS', 'SMART-WATCHES', 'VIDEO-GAMES', 'TELEVISIONS'];

    const handleSearchChange = (event) => {
        setSearchString(event.target.value);
    };

    useEffect(() => {
        if (!order) {
            const order_id = localStorage.getItem('order_id');
            if (order_id) {
                setOrder(order_id);
            }
        }
        const checkAdmin = localStorage.getItem('user-is_admin');
        if (checkAdmin === "true") {
            setIsAdmin(true);
        }
        getAllProducts().then((products) => {
            products = products.filter(product => product.in_stock === true)
            if (category) {
                products = products.filter(product => product.category === category)
            }
            setProducts(products);
        });
        setRefresh(false);
    }, [order, setOrder, refresh, isAdmin, category]);


    return (
        <React.Fragment>
            <Box sx={{backgroundColor: '#F5F5F5', width: '100%'}}>
                <Box sx={{backgroundColor: 'white'}}>
                    <StyledTypography variant="h2" sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                        {category || (
                            <>

                                ALL <b style={{color: "#E63946"}}>PRODUCTS</b>
                            </>
                        )}
                    </StyledTypography>
                    {/*<TextField*/}
                    {/*    label="Search"*/}
                    {/*    value={searchString}*/}
                    {/*    onChange={handleSearchChange}*/}
                    {/*    variant="outlined"*/}
                    {/*    fullWidth*/}
                    {/*/>*/}
                    <Grid container spacing={1} justifyContent="center"
                        // Reduce number of columns on small screens
                          sx={{justifyContent: {xs: 'center', sm: 'flex-start'}}}
                    >
                        {categories.map((category) => (
                            <Grid key={category} item xs={6} sm={4} md={4} lg={2}>
                                <List sx={{
                                    backgroundColor: '#F5F5F5',
                                    textAlign: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',

                                    alignItems: 'center',
                                    marginBottom: '.2rem',
                                    padding: '0.5rem',
                                    'media (max-width: 600px)': {
                                        padding: '0.2rem',
                                    },

                                }}>
                                    <ListItem
                                        sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            flexWrap: 'wrap',
                                            height: 'auto',
                                            'media (max-width: 600px)': {
                                                padding: '0.2rem',
                                                width: '50%',
                                            }

                                        }}

                                        onClick={() => {
                                            if (category === 'ALL PRODUCTS') {
                                                setCategory(null);
                                                history('/products');
                                            } else {
                                                setCategory(category);
                                                history(`/products?category=${category}`);
                                            }
                                        }}
                                    >
                                        <ListItemText
                                            primary={category}
                                            primaryTypographyProps={{
                                                color: "#FFA500",
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                margin: 'auto',
                                                fontSize: '.7rem',
                                                lineHeight: '1.2rem',
                                                maxHeight: '2.4rem',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                // align text vertically in the center
                                                alignItems: 'center',
                                                'media (max-width: 600px)': {
                                                    padding: '0.2rem',
                                                    fontSize: '0.1rem',
                                                }
                                            }}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                        ))}
                    </Grid>
                </Box>


                <Grid sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '100%',
                    backgroundImage: 'url(https://st2.depositphotos.com/1716670/9902/v/450/depositphotos_99023574-stock-illustration-retrofuturistic-seamless-space-background.jpg)',

                    '& > .MuiGrid-item': {
                        flexBasis: '100%',
                        '@media (min-width: 600px)': {
                            flexBasis: '50%',
                        },
                        '@media (min-width: 960px)': {
                            flexBasis: '33.33%',
                        },
                    },
                }}>
                    {products.filter(product => product.title.toLowerCase().includes(searchString.toLowerCase()))
                        .sort((a, b) => a.product_id - b.product_id)
                        .map((product) => {

                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id} container spacing={2}
                                      sx={{

                                          display: 'flex',
                                          flexWrap: 'wrap',
                                          marginLeft: 'auto',
                                          marginRight: 'auto',
                                          width: '100%',
                                          marginTop: '1rem',
                                          justifyContent: 'space-between',

                                          '& > .MuiCard-root': {
                                              maxWidth: '100%',
                                          },
                                          '& > .MuiCard-root > .MuiCardContent-root': {
                                              flexGrow: 1,
                                          },
                                      }}>
                                    <Card sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: '1',
                                        backgroundColor: alpha('#fff', 0.8),


                                    }}>

                                        <CardContent sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                            width: '100%'

                                        }}>

                                            <Box
                                                component="img"
                                                sx={{
                                                    flexFlow: 'column',
                                                    aspectRatio: '16/9',
                                                    objectFit: "contain",
                                                    maxHeight: "50%",
                                                    width: "80%",
                                                    flex: '1',
                                                    padding: '1vh',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                                alt="title"
                                                src={product.image}
                                            />


                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flex: '1',
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                                width: '100%',
                                                marginBottom: '1vh',
                                                // height: '30%',
                                                // maxWidth: '60%',
                                                // maxHeight: '40%',
                                                // width: '70%',

                                            }}>
                                                <StyledTypography variant="h6">{product.title}</StyledTypography>
                                                <StyledTypography variant="h6"
                                                                  gutterBottom>$ {product.price}</StyledTypography>
                                                <SingleProductModal
                                                    variant="contained"
                                                    userId={userId}
                                                    order_id={order}
                                                    title={product.title}
                                                    description={product.description}
                                                    price={product.price}
                                                    image={product.image}
                                                    product_id={product.product_id}
                                                    category={product.category}
                                                    in_stock={product.in_stock}
                                                    status="created"
                                                    quantity={1}
                                                    setOrder={setOrder}
                                                    stripe_id={product.stripe_id}
                                                    refresh={refresh}
                                                    setRefresh={setRefresh}
                                                    setRefreshCart={setRefreshCart}
                                                />
                                                {/* <Box display="flex" alignItems="center" justifyContent="center"*/}
                                                {/*    style={{margin: '8px 0',*/}
                                                {/*    display: 'flex',*/}
                                                {/*    flexDirection: 'column',*/}
                                                {/*    backgroundColor: '#A8DADC'}}>*/}
                                                {/*        Admin Tools*/}
                                                {/*    { isAdmin &&<EditProductButton*/}
                                                {/*                    variant="contained"*/}
                                                {/*                    color="secondary"*/}
                                                {/*                    title={product.title}*/}
                                                {/*                    description={product.description}*/}
                                                {/*                    price={product.price} image={product.image}*/}
                                                {/*                    product_id={product.product_id}*/}
                                                {/*                    category={product.category}*/}
                                                {/*                    in_stock={product.in_stock}*/}
                                                {/*                    stripeId={product.stripe_id} />*/}
                                                {/*    }*/}

                                                {/*    <Box display="flex" alignItems="center" justifyContent="center"*/}
                                                {/*    style={{margin: '8px 0'}}>*/}
                                                {/*        <DeleteProductButton product_id={product.product_id} setRefresh={setRefresh}/>*/}
                                                {/*    </Box>*/}
                                                {/*</Box>*/}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                </Grid>
            </Box>
        </React.Fragment>
    );
}

export default SampleProducts;