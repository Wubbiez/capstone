import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    ButtonGroup,
    Typography,
    Modal,
    Paper,
    Box
} from "@mui/material";

import AddToOrderButton from "./Buttons/AddToOrderButton.js";
import UpdateQuantityButton from "./Buttons/UpdateQuantityButton.js";

function SingleProductPage({product_id, title, description, price, image, in_stock, category, order, setRefresh, setOrder, stripe_id, refresh}) {
  
  return (
    <React.Fragment>
      
        
          <Paper sx={{
            margin: "5vh 10vw 5vh 10vw",
            boxShadow: "10px 10px 2px 1px rgba(0, 0, 0, 0.2)",
            height: "60vh",
            maxHeight: "85vh",
            maxWidth: "75vw",
            padding: "5vh 10px 10px 10px",
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#f5f5f5',
            position: 'relative'
          }}>
            <Box
        component="img"
        sx={{
          maxHeight:"45vh",
          maxWidth:  "20vw",
          padding: "15px 5px 15px 5px"
        }}
        alt="title"
        src={image}
      />
      <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '3rem',
                      paddingRight: '3rem',
                      paddingTop: '3rem',
                    }}>
            <Typography variant='h1'>{title}</Typography>
            
            <Typography variant='h4'>$ {price}</Typography>
            <Typography variant='h4'>Category:</Typography>
            <Typography variant='p'>{category}</Typography>
            <Typography variant='h4'>Description:</Typography>
            <Typography variant='p'>{description}</Typography>
            <ButtonGroup sx={{
              marginTop: '5rem',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '50%'
            }}>
            <Button onClick={handleCloseModal} s sx={{
          backgroundColor: "#333333",
          position: 'absolute',
          top: '0',
          right: '0',
        }}>X</Button>


            <AddToOrderButton userId={1} product_id={product_id} status="created"
                                                        price={price} quantity={1} setOrder={setOrder}
                                                        stripe_id={stripe_id} order_id={order} setRefresh={setRefresh}

                                        />
                                        <Box display="flex" alignItems="center" justifyContent="center"
                                            style={{margin: '8px 0'}}>
                                            <UpdateQuantityButton order_id={order} orderProductId={product_id}
                                                                price={price} setRefresh={setRefresh} refresh={refresh}/>
                                        </Box>
            <Button variant="contained" component={Link}
                                            to={`/products/${product_id}`} sx={{
                                              marginBottom: '3rem',
                                              width: '100%'
                                            }}>View Full Item</Button>
            </ButtonGroup>
            </Box>
          </Paper>
    </React.Fragment>

    
  );
};

export default SingleProductPage;