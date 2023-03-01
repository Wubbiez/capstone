import React from 'react';
import { Drawer, Box, Typography, Stack, Card, CardContent, CardActions, CardMedia, Button } from '@mui/material';
import { padding } from '@mui/system';





const Cart = () => {


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
          textAlign: 'right'
          
        }}
        >
        <Typography variant='h4' component='div'> My Cart</Typography>
        
        </Box>
        <Box>
          <Card>
              <CardContent sx={{
                backgroundColor: 'grey',
                color: 'white',
                width: '250px',
                padding: '16px',
                display: 'flex',
                flexFlow: 'row wrap',
                }}>

                  <CardMedia 
                    component="img"
                    height="100px"
                    image="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
                    alt="product.description" 
                    style={{ maxWidth: '10%', height: 'auto' }}/>

                  <Typography variant="h5"
                  >product.title</Typography>
                  <Typography variant="h6">order_products.price</Typography>
                  <Typography gutterBottom variant="p">order_products.quantity</Typography>
                

                <CardActions>
                  <Button size='small'>Remove</Button>
                  <Button size='small'>Edit</Button>
                </CardActions>
              </CardContent>

            </Card>
          </Box>
      </Drawer>
  );
}

export default Cart;
