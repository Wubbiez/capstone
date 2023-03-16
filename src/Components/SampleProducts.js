import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Card, Paper, Grid, styled, Typography, Button, CardContent, Box} from "@mui/material";
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
function SampleProducts({order, setOrder, user, setIsAdmin, isAdmin}) {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);



    useEffect(() => {
        if (!order) {
            const order_id = localStorage.getItem('order_id');
            if (order_id) {
                setOrder(order_id);
            }
        }
            const checkAdmin = localStorage.getItem('user-is_admin');
        if(checkAdmin==="true"){
            setIsAdmin(true);
        }
        getAllProducts().then((products) => {
            products = products.filter(product => product.in_stock === true)
            setProducts(products);
        });
        setRefresh(false);
    }, [order, setOrder, refresh, isAdmin]);



    return (
        <React.Fragment>

            <Grid container spacing={2} sx={{
                                      backgroundColor: '#f4eee9',
                                      display: 'flex',
                                      flexDirection: 'row',
                                flexWrap: 'wrap',
                                marginLeft: '-10px',
                                marginRight: '-10px',
            }}>
                {products.sort((a, b) => a.product_id - b.product_id).map((product) => {

                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}sx={{
                            backgroundColor: '#f4eee9',
                            display: 'flex',
                      flexWrap: 'wrap',
                      marginLeft: '-10px',
                      marginRight: '-10px',
  }}>
                            <Card sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 'inherit',
                                paddingLeft: '2vw',
                                flex: '1',
                                backgroundColor: '#fff'}}>
                                <CardContent sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'space-between',
                                    marginLeft: '-10px',
                                    marginRight: '-10px',

                                }}>
                                    <img src={product.image} alt={product.description}
                                         style={{maxWidth: '50%', height: 'auto'}}/>
                                    
                                    <Box sx={{marginTop: '3rem',
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'space-between',
                                    maxWidth: '80%'}}>
                                        <Typography variant="h2">{product.title}</Typography>
                                        <Typography variant="h4">$ {product.price}</Typography>
                                        <Box sx={{
                                        display: 'flex',
                                        flexFlow: 'column',
                                        maxWidth: '100%',
                                        
                                        }}>
                                            <SingleProductModal variant="contained" 
                                                                userId={1}
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
                                                />
                                            
                                            {/* <Box display="flex" alignItems="center" justifyContent="center"
                                                style={{margin: '8px 0',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                backgroundColor: '#A8DADC'}}>
                                                    Admin Tools
                                                { isAdmin &&   <EditProductButton variant="contained" color="secondary" title={product.title}
                                                            description={product.description}
                                                            price={product.price} image={product.image}
                                                            product_id={product.product_id} category={product.category}
                                                            in_stock={product.in_stock} stripeId={product.stripe_id} /> }
                                            </Box> */}
                                            
                                            <Box display="flex" alignItems="center" justifyContent="center"
                                                style={{margin: '8px 0'}}>
                                                {/*<DeleteProductButton product_id={product.product_id} setRefresh={setRefresh}/>*/}
                                            </Box>

                                            <Box display="flex" alignItems="center" justifyContent="center"
                                            style={{margin: '8px 0'}}>
                                            </Box>
                                        </Box>
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