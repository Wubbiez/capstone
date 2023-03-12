import React, {useEffect, useState} from "react";
import { Grid, Typography,  Card, CardContent,  Button, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { CheckCircleOutlineTwoTone } from "@mui/icons-material";
import { ShoppingBagTwoTone } from "@mui/icons-material";

import {getOrderProductsByOrderId} from '../api/apirequests.js';
import theme from "./theme.js";

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
        localStorage.removeItem('order_id');
        setOrder(null);

    }, []);


    return (
        <React.Fragment sx={{
            
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#F5F5F5',
            }}>< CheckCircleOutlineTwoTone sx={{
                      fontSize: '5rem',
                      color: theme.palette.success.main,
                }} />
            <Typography variant ="h1" sx={{
                paddingTop: '1.5rem',
                paddingLeft: '1rem'
            }}>
                           
                Order placed, thanks! </Typography>
                </Box>
            <Grid container spacing={2} direction="column" style={{ overflowY: 'scroll',
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxHeight: '85vh',
                    width: '100%',
                    margin: 0,}}>

          
{orderProducts.map((orderProduct) => {

  return (
  
    <Card key={orderProduct.id} sx={{
        display: 'flex',
        flexDirection: 'row',
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
                  paddingLeft: '5vw',
                  paddingRight: '20vw'


                  }}>


            <Typography variant="h5">Product Id:  {orderProduct.productId}</Typography>
            <Typography variant="h6">Quantity: {orderProduct.quantity}</Typography>

        </CardContent>

    </Card>
  )})}

         
         <Link to='/products' sx={{
            marginTop: '1rem'
         }}>
            
             <Button variant="contained"> <ShoppingBagTwoTone /> View Products
             </Button>
         </Link>
        

</Grid>
        </React.Fragment>
    )
}

export default Success;