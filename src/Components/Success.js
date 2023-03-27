import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, Grid, Typography} from '@mui/material';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {CheckCircleOutlineTwoTone, ShoppingBagTwoTone} from "@mui/icons-material";


import {getOrderProductsByOrderId} from '../api/apirequests.js';
import theme from "./theme.js";

const Success = ({order, setOrder, setRefreshCart}) => {
    const [orderId, setOrderId] = useState();
    const [orderProducts, setOrderProducts] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const url = new URL(window.location.href);
        const sessionId = url.searchParams.get("session_id");
        const order_id = localStorage.getItem("order_id");

        if (order_id) {
            setOrderId(order_id);
        }

        getOrderProductsByOrderId(order_id).then((orderProducts) => {
            setOrderProducts(orderProducts);
        });

        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/success?session_id=${sessionId}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({sessionId}),
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

        setRefreshCart(true);
        localStorage.removeItem('order_id');
    }, []);


    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#F1FAEE',
            }}>< CheckCircleOutlineTwoTone sx={{
                fontSize: '5rem',
                color: theme.palette.success.main,
            }}/>
                <Typography variant="h6" sx={{
                    paddingTop: '2rem',
                    paddingLeft: '1rem',
                    fontWeight: 700
                }}>

                    Order placed, thanks! </Typography>
            </Box>
            <Typography variant="h6" sx={{
                paddingTop: '10px',
                paddingLeft: '1rem',
                paddingBottom: '10px',
                marginBottom: '0',
                borderBottom: "2px solid #333333",
                backgroundColor: '#F1FAEE',
            }}>

                Check your profile's order history for confirmation.</Typography>

            <Grid container spacing={2} direction="column" style={{
                overflowY: 'scroll',
                display: 'flex',
                flexFlow: 'column',

                height: '85vh',
                width: '100%',
                objectFit: 'contain',
                margin: 0,
            }}>


                {orderProducts.map((orderProduct) => {

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
                                justifyContent: 'start',
                                minHeight: '70px',
                                borderBottom: "2px solid #212529",
                                paddingLeft: '5vh',
                                width: 'inherit',
                            }}>

                                <Box
                                    component="img"
                                    sx={{
                                        maxHeight: '20vh',
                                        maxWidth: "20vw",
                                        padding: "15px 5px 15px 5px"
                                    }}
                                    alt="Product Image"
                                    src={orderProduct.image}
                                />
                                <Box sx={{
                                    backgroundColor: '#F5F5F5',
                                    color: '#333333',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    minHeight: '70px',
                                    paddingLeft: '3rem'
                                }}>
                                    <Typography variant="h6"
                                    ></Typography>
                                    <Typography
                                        variant="h6"
                                    ># Ordered: {orderProduct.quantity}</Typography>

                                </Box>
                            </CardContent>

                        </Card>
                    )
                })}

                <Link to='/products' sx={{
                    marginTop: '1rem',
                }}>

                    <Button variant="contained" sx={{
                        backgroundColor: '#457B9D',
                        transition: 'background-color 0.3s ease',
                        marginTop: '3rem',
                        marginLeft: '45vw',

                        '&:hover': {
                            backgroundColor: '#457B9D',
                            boxShadow: '3px 5px 5px 3px #1D3557;',
                        }
                    }}> <ShoppingBagTwoTone/> Products
                    </Button>
                </Link>


            </Grid>
        </React.Fragment>
    )
}

export default Success;