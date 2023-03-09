import React from 'react';
import { Drawer, Box, Grid, Typography, Stack, Card, CardContent, CardActions, CardMedia, Button, Link } from '@mui/material';
import { padding } from '@mui/system';
import { useState, useEffect } from 'react';


import {getOrderProductsByOrderId} from "../api/apirequests.js";

import DeleteOrderProductButton from "./Buttons/DeleteOrderProductButton.js";


import UpdateQuantityButton from './Buttons/UpdateQuantityButton.js';

import CheckoutButton from './Buttons/CheckoutButton.js';





const Cart = ({order, setOrder}) => {


const [orderProducts, setOrderProducts] = useState([]);
const [refresh, setRefresh] = useState(false);
const [isOpen, setIsOpen] = useState(true);


useEffect(() => {
  if (!order) {
      const order_id = localStorage.getItem('order_id');
      if (order_id) {
          setOrder(order_id);
          console.log("order_id is", order_id);
      }
  }
  setRefresh(true);
  getOrderProductsByOrderId(order).then((orderProducts) => {
    console.log("orderProducts are", orderProducts);
    setOrderProducts(orderProducts);
    setRefresh(false);
    console.log("orderProducts are still", orderProducts);
  });
}, [order, setOrder]);

function handleOpenCart() {
  setIsOpen(true);
} 

function handleCloseCart() {
  setIsOpen(false);
}  


  return (
    <>
       <Drawer 
    anchor='right'
    open={isOpen}>
      <Box 
        p={2}
        role='presentation'
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          width: '250px',
          padding: '16px',
          textAlign: 'center',
          justifyContent: "center",
          overflowY: 'scroll'
          
        }}
        >
        <Typography variant='h4' component='div'> My Cart</Typography>
        <Button
        onClick={handleCloseCart}>Close Cart</Button>
        </Box>

        <Grid container spacing={2} direction="column" style={{ overflowY: 'scroll'}}>

          
        {orderProducts.map((orderProduct) => {

          return (
          
            <Card key={orderProduct.id}>
                <CardContent sx={{
                  backgroundColor: '#F5F5F5',
                  color: '#333333',
                  width: '250px',
                  padding: '16px',
                  display: 'flex',
                  flexFlow: 'column',
                  borderBottom: "1px solid #666666"
                  }}>

                    <Typography variant="h5"
                    >Product Id:  {orderProduct.productId}</Typography>
                    <Typography variant="h6">Price ${orderProduct.price}</Typography>
                    <Typography variant="h6">Quantity {orderProduct.quantity}</Typography>

                  <CardActions>
                    <UpdateQuantityButton />
                  </CardActions>
                </CardContent>

            </Card>
          )})};

<Box display="flex" alignItems="center" justifyContent="center"
                                         style={{margin: '8px 0'}}>
                                        <CheckoutButton 
                                                        order_id={order}/>
                                    </Box>
        </Grid>
      </Drawer>

 </>
  );
}

export default Cart;
