import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material/";

import { getOrderProductsByOrderId, getUserByUsername } from "../api/apirequests.js";
import { getOrdersByUserId } from "../api/apirequests.js";
import {Divider, Paper} from "@mui/material";

function OrderHistory({ user }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getUserByUsername(user).then((user) => {
            getOrdersByUserId(user.user_id).then(async (orders) => {
                console.log(orders);
                const paidOrders = await Promise.all(
                    orders.map(async (order) => {
                        if (order.status === "paid") {
                            const orderProducts = await getOrderProductsByOrderId(order.order_id);
                            return { ...order, orderProducts };
                        }
                    })
                );

                // filter out undefined orders
                setOrders(paidOrders.filter((order) => order));
            });
        });
    }, [user]);

    return (
        <React.Fragment>
            <Paper style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
                <Typography variant="h3" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                    Order History
                </Typography>
                <Divider style={{ marginBottom: '1rem' }} />
            <Grid container spacing={2}>
                {orders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.order_id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4">Order ID: {order.order_id}</Typography>
                                <Typography variant="h4">Order Date: {order.date_created}</Typography>
                                <Typography variant="h4">Order Status: {order.status}</Typography>
                                <Typography variant="h4">
                                    Order Total: $
                                    {Number(
                                        order.orderProducts.reduce(
                                            (total, orderProduct) =>
                                                total + orderProduct.quantity * orderProduct.price,
                                            0
                                        )
                                    ).toFixed(2)}
                                </Typography>
                                <Typography variant="h4">Order Products:</Typography>
                                {order.orderProducts.map((orderProduct) => (
                                    <Box key={orderProduct.product_id}>
                                        <Typography variant="h6">Product ID: {orderProduct.title}</Typography>
                                        <Typography variant="h6">Quantity: {orderProduct.quantity}</Typography>
                                        <Typography variant="h6">Price: {orderProduct.price}</Typography>
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
