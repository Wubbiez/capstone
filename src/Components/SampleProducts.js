import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import {Card, Paper, Grid, styled, Typography, Button, CardContent, Box, Popover} from "@mui/material";
import AddToOrderButton from "./Buttons/AddToOrderButton.js";
import {getAllProducts} from "../api/apirequests.js";
// import EditOrderProductButton from "./Buttons/EditOrderProductButton.js";
import UpdateQuantityButton from "./Buttons/UpdateQuantityButton.js";
import EditProductButton from "./Buttons/EditProductButton.js";
import DeleteProductButton from "./Buttons/DeleteProductButton.js";
import DeleteOrderProductButton from "./Buttons/DeleteOrderProductButton.js";
import CheckoutButton from "./Buttons/CheckoutButton.js";
import SingleProductModal from "./SingleProductModal.js";
import EmptyCartButton from "./Buttons/EmptyCartButton.js";
import category from "./Category.js";

function SampleProducts({order, setOrder, user, setIsAdmin, isAdmin, setRefreshCart, userId}) {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category');
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverTimeout, setPopoverTimeout] = useState(null);
    const [open, setOpen] = useState(false);



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
            if(category) {
                products = products.filter(product => product.category === category)
            }
            setProducts(products);
        });
        setRefresh(false);
    }, [order, setOrder, refresh, isAdmin, category]);



    return (
        <React.Fragment>

            <Grid container spacing={2} sx={{
                backgroundColor: '#f4eee9',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: '-10px',
                marginRight: '-10px',
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
                {products.sort((a, b) => a.product_id - b.product_id).map((product) => {

                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}sx={{
                            backgroundColor: '#f4eee9',
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginLeft: '-10px',
                            marginRight: '-10px',
                            '& > .MuiCard-root': {
                                maxWidth: '100%',
                              },
                              '& > .MuiCard-root > .MuiCardContent-root': {
                                flexGrow: 1,
                              },
                            }}>
                            <Card sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                                flex: '1',
                                backgroundColor: '#f1faee',
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'105\' viewBox=\'0 0 80 105\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg id=\'death-star\' fill=\'%231d3557\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M20 10a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm15 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zM20 75a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zm30-65a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm0 65a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zM35 10a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zM5 45a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zm60 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                                }}>

                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'left',
                                    height: '100%',
                                    width: '100%'

                                }}>

                                    <Box
                                            component="img"
                                            sx={{
                                            display: 'flex',
                                            flexFlow: 'column',
                                            aspectRatio: '16/9',
                                            maxHeight:"100%",
                                            maxWidth:  "80%",
                                            flex: '1',
                                            padding: '1vh',
                                            }}
                                            alt="title"
                                            src={product.image}
                                        />


                                    <Box sx={{ display: 'flex',
                                        flexDirection: 'column',
                                        flex: '1',
                                        justifyContent: 'center',
                                        alignItems: 'space-around',
                                        marginBottom: '1rem',
                                        // height: '30%',
                                        // maxWidth: '60%',
                                        // maxHeight: '40%',
                                        // width: '70%',
                                        
                                       }}>
                                    <Typography variant="h6">{product.title}</Typography>
                                    <Typography variant="h6" gutterBottom>$ {product.price}</Typography>
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
                                            {/* <Box display="flex" alignItems="center" justifyContent="center"
                                                style={{margin: '8px 0',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                backgroundColor: '#A8DADC'}}>
                                                    Admin Tools
                                                { isAdmin &&<EditProductButton
                                                                variant="contained"
                                                                color="secondary"
                                                                title={product.title}
                                                                description={product.description}
                                                                price={product.price} image={product.image}
                                                                product_id={product.product_id} 
                                                                category={product.category}
                                                                in_stock={product.in_stock} 
                                                                stripeId={product.stripe_id} /> 
                                                }

                                                <Box display="flex" alignItems="center" justifyContent="center"
                                                style={{margin: '8px 0'}}>
                                                    <DeleteProductButton product_id={product.product_id} setRefresh={setRefresh}/>
                                                </Box>
                                            </Box> */}
                                        </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
}

export default SampleProducts;