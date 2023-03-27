import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, Grid, Typography,} from "@mui/material/";

import {getOrderProductsByOrderId, getOrdersByUserId} from "../api/apirequests.js";
import {Divider, Paper} from "@mui/material";
import CreateReviewButton from "./Buttons/CreateReviewButton.js";

function OrderHistory({userId, user}) {
    const [orders, setOrders] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getOrdersByUserId(userId).then(async (orders) => {
            const paidOrders = await Promise.all(
                orders.map(async (order) => {
                    if (order.status === "paid") {
                        const orderProducts = await getOrderProductsByOrderId(order.order_id);
                        return {...order, orderProducts};
                    }
                })
            );
            // filter out undefined orders
            setOrders(paidOrders.filter((order) => order));
            setRefresh(false)
        });
    }, [userId, refresh]);


    return (
        <React.Fragment>
            <Paper style={{padding: '1rem', backgroundColor: '#f5f5f5'}}>
                <Typography variant="h3" style={{marginTop: '2rem', marginBottom: '1rem'}}>
                    Order History
                </Typography>
                <Divider style={{marginBottom: '1rem'}}/>
                <Grid container spacing={2} style={{
                    display: 'flex',
                    flexDirection: 'column',

                    width: '100%',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    margin: 0,
                }}>
                    {orders.map((order) => (
                        <Grid item xs={12} sm={6} md={4} key={order.order_id}>
                            <Card sx={{
                                width: '80vw',
                                backgroundColor: "#f5f5f5",
                                paddingTop: '0.5rem',
                                paddingBottom: '1rem',
                                paddingLeft: '1rem',
                                borderBottom: '2px solid #212529'
                            }}>
                                <CardContent>
                                    <Typography variant="h6">Order ID: {order.order_id}</Typography>
                                    <Typography variant="h6">Order Date: {order.date_created}</Typography>
                                    <Typography variant="h6">Order Status: {order.status}</Typography>
                                    <Typography variant="h6">
                                        Order Total: $
                                        {Number(
                                            order.orderProducts.reduce(
                                                (total, orderProduct) =>
                                                    total + orderProduct.quantity * orderProduct.price,
                                                0
                                            )
                                        ).toFixed(2)}
                                    </Typography>
                                    <Typography variant="h6" sx={{textDecoration: 'underline'}}>Purchased
                                        Items:</Typography>
                                    {order.orderProducts.map((orderProduct) => (
                                        <Box key={orderProduct.product_id} backgroundColor="rgba(241,250,238,0.7)"
                                             paddingBottom='1rem' borderBottom='2px solid #212529'>
                                            <Typography variant="h6"
                                                        sx={{paddingTop: '1rem'}}>Name: {orderProduct.title}</Typography>
                                            <Typography variant="h6">Quantity: {orderProduct.quantity}</Typography>
                                            <Typography variant="h6">Price: ${orderProduct.price}</Typography>
                                            <CreateReviewButton userId={userId} user={user} setRefresh={setRefresh}
                                                                product_id={orderProduct.productId}/>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>

                    ))}
                </Grid>
            </Paper>
        </React.Fragment>
    );
}

export default OrderHistory;
