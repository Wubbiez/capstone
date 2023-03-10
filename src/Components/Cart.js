import React from 'react';
import { Drawer, Box, Grid, Typography, Stack, Card, CardContent, CardActions, CardMedia, Button } from '@mui/material';
import { padding } from '@mui/system';
import { useState, useEffect } from 'react';

import {getOrderProductById} from "../api/apirequests.js";

import DeleteOrderProductButton from "./Buttons/DeleteOrderProductButton.js";


import UpdateQuantityButton from './Buttons/UpdateQuantityButton.js';


// const orderProducts = [{
//   id: 1,
//   orderId: 1,
//   productId: 4,
//   price: '999.99',
//   quantity: 1,
// },
// {
//   id: 2,
//   orderId: 1,
//   productId: 5,
//   price: '2999.99',
//   quantity: 1,
// },
// {
//   id: 3,
//   orderId: 1,
//   productId: 3,
//   price: '1999.99',
//   quantity: 1,
// }
// ]


const Cart = () => {


const [orderProducts, setOrderProducts] = useState([]);


useEffect(() => {
  getOrderProductById(1).then((orderProducts) => {
    console.log(orderProducts);
    setOrderProducts(orderProducts);
  });
}, []);


  return (
    <Drawer 
    anchor='right'
    open={true}>
      <Box 
        p={2}
        role='presentation'
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          width: '250px',
          padding: '16px',
          textAlign: 'right',
          overflowY: 'scroll'
          
        }}
        >
        <Typography variant='h4' component='div'> My Cart</Typography>
        
        </Box>


        <Grid container spacing={2} direction="column" style={{ overflowY: 'scroll'}}>
        {orderProducts.map((orderProduct) => {

          return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={orderProduct.id}  sx={{
         
            display: 'flex',
            flexFlow: 'column',
            overflowY: 'scroll'
            }}>
            <Card>
                <CardContent sx={{
                  backgroundColor: 'blue',
                  color: 'white',
                  width: '250px',
                  padding: '16px',
                  display: 'flex',
                  flexFlow: 'column',
                  }}>

                    <Typography variant="h5"
                    >Product Id:  {orderProduct.productId}</Typography>
                    <Typography variant="h6">Price ${orderProduct.price}</Typography>
                  

                  <CardActions>
                    <DeleteOrderProductButton />
                    <UpdateQuantityButton />
                  </CardActions>
                </CardContent>

            </Card>
          </Grid>
          )})};
        </Grid>
      </Drawer>
  );
}

export default Cart;
