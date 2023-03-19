import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {Box, Card, CardContent, Grid, List, ListItem, ListItemText, styled, Typography} from "@mui/material";
import {getAllProducts} from "../api/apirequests.js";
// import EditOrderProductButton from "./Buttons/EditOrderProductButton.js";
import SingleProductModal from "./SingleProductModal.js";
import category from "./Category.js";
import {TextField} from "@mui/material/";

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

    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverTimeout, setPopoverTimeout] = useState(null);
    const [open, setOpen] = useState(false);
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
            console.log(products);
            if (category) {
                products = products.filter(product => product.category === category)
            }
            setProducts(products);
        });
        setRefresh(false);
    }, [order, setOrder, refresh, isAdmin, category]);


    return (
        <React.Fragment>
            <Box sx={{backgroundColor: '#F5F5F5', width:'100%'}}>
                <Box sx={{position: 'sticky', top: '60px', zIndex: '1', backgroundColor:'white'}}>
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
                    <TextField
                        label="Search"
                        value={searchString}
                        onChange={handleSearchChange}
                        variant="outlined"
                        fullWidth
                    />
                    <Grid container spacing={2} justifyContent="center">
                        {categories.map((category) => (
                            <Grid key={category} item xs={4} sm={6} md={4} lg={2}>
                                <List sx={{
                                    backgroundColor: '#F5F5F5',
                                    textAlign: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '1rem',
                                }}>
                                    <ListItem
                                        button
                                        sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            margin: 'auto',

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
                                          backgroundColor: '#F1FAEE',
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
                                        backgroundColor: '#f1faee',
                                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'105\' viewBox=\'0 0 80 105\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg id=\'death-star\' fill=\'%231d3557\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M20 10a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm15 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zM20 75a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zm30-65a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm0 65a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zM35 10a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zM5 45a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zm60 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',

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
                                                <StyledTypography variant="h6" gutterBottom>$ {product.price}</StyledTypography>
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