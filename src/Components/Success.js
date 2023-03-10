import React, {useEffect, useState} from "react";
import { Drawer, Box, Grid, Typography, Stack, Card, CardContent, CardActions, CardMedia, Button, ButtonGroup, Link } from '@mui/material';

import {getOrderProductsByOrderId} from '../api/apirequests.js';

const Success = ({order, setOrder}) => {
    const [orderId, setOrderId] = useState();
    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        const url = new URL(window.location.href);
        const sessionId = url.searchParams.get("session_id");
        const order_id = localStorage.getItem('order_id');

      if (order_id) {
          setOrderId(order_id);
          console.log("order_id is", order_id);
      }

        getOrderProductsByOrderId(order_id).then((orderProducts) => {
            console.log("orderProducts are", orderProducts);
            setOrderProducts(orderProducts);
            console.log("orderProducts are still", orderProducts);
          });

          
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/success?session_id=${sessionId}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({sessionId}),
                });


            } catch (error) {
          console.error(error);
            }
        };

        fetchData();
        // localStorage.removeItem('order_id');
        // setOrder(null);

    }, []);


    return (
        <div>
            <Typography variant ="h1"
            sx={{
                marginTop: '10vh',
            }}>Success!  Thank you for buying the items below</Typography>
            <Grid container spacing={2} direction="column" style={{ overflowY: 'scroll'}}>

          
{orderProducts.map((orderProduct) => {

  return (
  
    <Card key={orderProduct.id}sx={{
        
        display: 'flex',
        flexFlow: 'row',
        }}>

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

        </CardContent>

    </Card>
  )})};

         
         <Link to='/products'>
             <Button variant="contained">Products
             </Button>
         </Link>
        

</Grid>
        </div>
    )
}

export default Success;