import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, Grid, Modal, Paper, styled, Typography} from '@mui/material';
import {getOrderProductsByOrderId} from "../api/apirequests.js";
import DeleteOrderProductButton from "./Buttons/DeleteOrderProductButton.js";
import UpdateQuantityButton from './Buttons/UpdateQuantityButton.js';
import CheckoutButton from './Buttons/CheckoutButton.js';
import EmptyCartButton from './Buttons/EmptyCartButton.js';
import {ShoppingCartTwoTone} from '@mui/icons-material';

const StyledTypography = styled(Typography)({
    fontSize: 'calc(2rem + 2vw)',
    '@media (max-width: 600px)': {
        fontSize: 'calc(1.5rem + 1.5vw)',
    },
});
const Cart = ({order, setOrder, setRefreshCart, refreshCart}) => {


    const [orderProducts, setOrderProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        // Call API to get order products
        if (order) {
            // check if order is paid
            getOrderProductsByOrderId(order).then((orderProducts) => {
                setOrderProducts(orderProducts);
                setRefresh(false);
                setRefreshCart(false);
            });
        }

    }, [order, refresh, refreshCart]);


    function handleOpenCart() {
        setIsOpen(true);

        if (!order) {
            const order_id = localStorage.getItem('order_id');
            if (order_id) {
                setOrder(order_id);
                console.log("order_id is", order_id);
            }
        }

        setRefresh(true);
    }

    function handleCloseCart() {
        setIsOpen(false);
    }

    return (
        <React.Fragment>

            <Button
                variant="contained"
                onClick={handleOpenCart}
                sx={{
                    backgroundColor: '#457B9D',
                    transition: 'background-color 0.3s ease',

                    '&:hover': {
                        backgroundColor: '#457B9D',
                        boxShadow: '1px 2px 1px 1px #F1FAEE;',
                    }
                }}>
                <ShoppingCartTwoTone/>
                {
                    orderProducts.length > 0
                        ? Number(
                            orderProducts.reduce(
                                (total, orderProduct) => total + orderProduct.quantity,
                                0
                            )
                        ).toFixed(0)
                        : 0
                }
            </Button>


            <Modal open={isOpen} onClose={handleCloseCart}>
                <Paper
                    sx={{
                        margin: "5vh auto 5vh auto",
                        boxShadow: "10px 10px 2px 1px rgba(0, 0, 0, 0.2)",
                        height: "75vh",
                        maxHeight: "85vh",
                        width: "75vw",
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1',
                        objectFit: 'contain',

                        alignItems: 'center',
                    }}
                    open={isOpen}>
                    <Box
                        p={2}
                        role='presentation'
                        sx={{
                            backgroundColor: '#1D3557',
                            color: '#f8edeb',
                            width: '75vw',
                            textAlign: 'center',
                            justifyContent: "center",
                            alignItems: "center",

                        }}
                    >
                        <StyledTypography variant='h4' component='div' sx={{color: '#f8edeb'}}> My
                            Cart</StyledTypography>
                        {orderProducts.length > 0 ? <Typography variant="h4">
                            Order Total: $ {Number(
                            orderProducts.reduce(
                                (total, orderProduct) =>
                                    total + orderProduct.quantity * orderProduct.price,
                                0
                            )
                        ).toFixed(2)}

                        </Typography> : null}
                        <CheckoutButton order_id={order} setRefreshCart={setRefreshCart}/>
                        <EmptyCartButton order_id={order} setRefresh={setRefresh}/>
                        <Button
                            onClick={handleCloseCart}
                            sx={{
                                backgroundColor: "#333333",
                                position: 'absolute',
                                top: '5vh',
                                right: '12.5vw',

                                '&:hover': {
                                    backgroundColor: '#F1FAEE',
                                }
                            }}>
                            X
                        </Button>
                    </Box>


                    <Grid container spacing={2} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'left',
                        alignItems: 'center',

                        width: '100%',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        margin: 0,
                    }}>

                        {orderProducts.length > 0 ? orderProducts.sort((a, b) => a.productId - b.productId).map((orderProduct) => {

                            console.log("orderProduct is", orderProduct)

                            return (

                                <Card key={orderProduct.id}
                                      sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-around',
                                          width: 'inherit',
                                          marginTop: '0',
                                      }}>


                                    <CardContent sx={{
                                        backgroundColor: '#F5F5F5',
                                        color: '#333333',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        minHeight: '70px',
                                        borderBottom: "2px solid #212529",
                                        width: '100%',
                                    }}>

                                        <Box
                                            component="img"
                                            sx={{
                                                maxHeight: "45vh",
                                                maxWidth: "20vw",
                                                padding: "15px 5px 15px 5px"
                                            }}
                                            alt="Product Image"
                                            src={orderProduct.image}
                                        />
                                        <Box sx={{
                                            backgroundColor: '#F5F5F5',
                                            color: '#343a40',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'space-around',
                                            minHeight: '70px',
                                            width: '100%',
                                        }}>
                                            <StyledTypography variant="h6"
                                                              sx={{color: '#343a40',}}
                                            >{orderProduct.title}</StyledTypography>
                                            <StyledTypography
                                                variant="h6"
                                                sx={{
                                                    color: '#343a40',
                                                    paddingBottom: '1rem'
                                                }}
                                            >${orderProduct.price}</StyledTypography>

                                            <CardActions sx={{
                                                display: 'flex',
                                                flexDirection: 'row',


                                            }}>
                                                <UpdateQuantityButton order_id={order}
                                                                      orderProductId={orderProduct.productId}
                                                                      price={orderProduct.price}
                                                                      setRefresh={setRefresh}
                                                                      refresh={refresh}
                                                                      key={`quantity_${orderProduct.id}`}
                                                />
                                                <DeleteOrderProductButton order_id={order}
                                                                          product_id={orderProduct.productId}
                                                                          setRefresh={setRefresh} refresh={refresh}
                                                                          key={`delete_${orderProduct.id}`}/>
                                            </CardActions>
                                        </Box>
                                    </CardContent>

                                </Card>
                            )
                        }) : null}
                    </Grid>
                </Paper>
            </Modal>
        </React.Fragment>
    );
}

export default Cart;