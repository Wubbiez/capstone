import React from 'react';
import { Drawer, Box, Grid, Typography, Stack, Card, CardContent, CardActions, CardMedia, Button, Link, Paper, Modal } from '@mui/material';
import { padding } from '@mui/system';
import { useState, useEffect } from 'react';


import {getOrderProductsByOrderId} from "../api/apirequests.js";

import DeleteOrderProductButton from "./Buttons/DeleteOrderProductButton.js";


import UpdateQuantityButton from './Buttons/UpdateQuantityButton.js';

import CheckoutButton from './Buttons/CheckoutButton.js';
import EmptyCartButton from './Buttons/EmptyCartButton.js';
import { ShoppingCartTwoTone } from '@mui/icons-material';

const Cart = ({order, setOrder}) => {


const [orderProducts, setOrderProducts] = useState([]);
const [refresh, setRefresh] = useState(false);
const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        // Call API to get order products
        if (order) {
            getOrderProductsByOrderId(order).then((orderProducts) => {
                console.log("orderProducts are", orderProducts);
                setOrderProducts(orderProducts);
                setRefresh(false);
                console.log("orderProducts are still", orderProducts);
            });
        }
    }, [order, refresh]);


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
          {orderProducts.length > 0 ? (
              <Button
                  variant="contained"
                  onClick={handleOpenCart}
                  sx={{
                    backgroundColor: '#457B9D',
                    transition: 'background-color 0.3s ease',
    
        '&:hover': {
            backgroundColor: '#457B9D',
          boxShadow: '1px 2px 1px 1px #F1FAEE;',}
                 }}>
        <ShoppingCartTwoTone /> ({Number(
    orderProducts.reduce(
        (total, orderProduct) =>
            total + orderProduct.quantity,
        0
    )
).toFixed(0)}
        )
              </Button>
          ) : null}





        <Modal open={isOpen} onClose={handleCloseCart}>
       <Paper
    sx={{
      margin: "5vh 10vw 5vh 10vw",
      boxShadow: "10px 10px 2px 1px rgba(0, 0, 0, 0.2)",
      height: "70vh",
      maxHeight: "85vh",
      width: "75vw",
      overflowY: 'scroll',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column'
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
          overflowY: 'scroll',
          overflowX: 'hidden',
          
        }}
        >
          <Typography variant='h4' component='div' sx={{color: '#f8edeb'}}> My Cart</Typography>
          <CheckoutButton  order_id={order}/>
          <EmptyCartButton order_id={order} setRefresh={setRefresh} />
          <Button
            onClick={handleCloseCart}
            sx={{
              backgroundColor: "#333333",
              position: 'absolute',
              top: '5vh',
              right: '15vw',

              '&:hover': {
                backgroundColor: '#F1FAEE',
              }}}>
                X
          </Button>
        </Box>




        <Grid container spacing={2} style={{ 
         display: 'flex',
         flexDirection: 'row',
                    justifyContent: 'left',
                    alignItems: 'center',
                    maxHeight: '85vh',
                    width: '75vw',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    margin: 0,}}>

          
        {orderProducts.length > 0 ? orderProducts.map((orderProduct) => {
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
                  paddingLeft: '5vh',
                  width: 'inherit',
                  }}>
                    
                    <Box
                      component="img"
                      sx={{
                        maxHeight:"45vh",
                        maxWidth:  "20vw",
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
                  paddingLeft: '1rem',
                  }}>
                    <Typography variant="h6"
                    sx={{color: '#343a40',}}
                    >{orderProduct.title}</Typography>
                    <Typography
                      variant="h6"
                      sx={{color: '#343a40',
                                      paddingBottom: '1rem'}}
                      >${orderProduct.price}</Typography>

                  <CardActions sx={{
                     display: 'flex',
                  flexDirection: 'row',
                     }}>
                    <UpdateQuantityButton order_id={order}
                                          orderProductId={orderProduct.productId}
                                          price={orderProduct.price}
                                          setRefresh={setRefresh}
                                          refresh={refresh}
                    />
                    <DeleteOrderProductButton order_id={order} product_id={orderProduct.productId} setRefresh={setRefresh} refresh={refresh}/>
                  </CardActions>
                  </Box>
                </CardContent>

            </Card>
          )}) : null}


        </Grid>
      </Paper>
</Modal>
 </React.Fragment>
  );
}

export default Cart;