import React from 'react';
import { Drawer, Box, Grid, Typography, Stack, Card, CardContent, CardActions, CardMedia, Button, Link, Paper, Modal } from '@mui/material';
import { padding } from '@mui/system';
import { useState, useEffect } from 'react';


import {getOrderProductsByOrderId} from "../api/apirequests.js";

import DeleteOrderProductButton from "./Buttons/DeleteOrderProductButton.js";


import UpdateQuantityButton from './Buttons/UpdateQuantityButton.js';

import CheckoutButton from './Buttons/CheckoutButton.js';
import theme from './theme.js';






const Cart = ({order, setOrder}) => {


const [orderProducts, setOrderProducts] = useState([]);
const [refresh, setRefresh] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const order_id = localStorage.getItem('order_id');


// useEffect(() => {
//   if (!order) {
//       const order_id = localStorage.getItem('order_id');
//       if (order_id) {
//           setOrder(order_id);
//           console.log("order_id is", order_id);
//       }
//   }
//   setRefresh(true);
//   getOrderProductsByOrderId(order).then((orderProducts) => {
//     console.log("orderProducts are", orderProducts);
//     setOrderProducts(orderProducts);
//     setRefresh(false);
//     console.log("orderProducts are still", orderProducts);
//   });
// }, [order, setOrder]);

useEffect(() => {

}, [refresh])

function handleOpenCart() {
  setIsOpen(true);
  
  if (!order) {
    
    if (order_id) {
        setOrder(order_id);
        console.log("order_id is", order_id);
    }
}
setRefresh(true);

getOrderProductsByOrderId(order_id).then((orderProducts) => {
  console.log("orderProducts are", orderProducts);
  setOrderProducts(orderProducts);
  setRefresh(false);
  console.log("orderProducts are still", orderProducts);
} )};

function handleCloseCart() {
  setIsOpen(false);
}  

  return (
    <React.Fragment>

      
       <Button
            variant="contained"
            color="primary"
            onClick={handleOpenCart}
        >
            {'View Cart'}
        </Button>

        <Modal
                    open={isOpen}
                    onClose={handleCloseCart}
            
        >
       <Paper
    sx={{
      margin: "5vh 10vw 5vh 10vw",
      boxShadow: "10px 10px 2px 1px rgba(0, 0, 0, 0.2)",
      height: "70vh",
      maxHeight: "85vh",
      width: "75vw",
      overflowY: 'scroll',
    }}
    open={isOpen}>
      <Box 
        p={2}
        role='presentation'
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          justifyContent: "center",
          overflowY: 'scroll'
          
        }}
        >
        <Typography variant='h4' component='div'> My Cart</Typography>
                                                
          
                                    <CheckoutButton 
                                                        order_id={order_id}/>
       
       
       
        <Button
        onClick={handleCloseCart}
        sx={{
          backgroundColor: "#333333",
          position: 'absolute',
          top: '5vh',
          right: '15vw',
        }}>X</Button>
        </Box>

        <Grid container spacing={2} direction="column" style={{ overflowY: 'scroll',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxHeight: '85vh',
                    width: '100%',
                    margin: 0,}}>

          
        {orderProducts.map((orderProduct) => {

          return (
          
            <Card key={orderProduct.id}
            sx={{
              display: 'flex',
              flexFlow: 'column',
              overflowY: 'scroll',
              width: 'inherit ',
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
                  width: 'inherit',
                  borderBottom: "1px solid #666666",
                  paddingLeft: '5vh'


                  }}>

                    <Typography variant="h5"
                    >Product Id:  {orderProduct.productId}</Typography>
                    <Typography variant="h6">Price ${orderProduct.price}</Typography>

                  <CardActions>
                    <UpdateQuantityButton order_id={order_id} orderProductId={orderProduct.productId}
                                                              price={orderProduct.price} setRefresh={setRefresh} refresh={refresh} />
                    <DeleteOrderProductButton order_id={order} product_id={orderProduct.productId} setRefresh={setRefresh} refresh={refresh}/>
                  </CardActions>
                </CardContent>

            </Card>
          )})}


        </Grid>
      </Paper>
</Modal>
 </React.Fragment>
  );
}

export default Cart;