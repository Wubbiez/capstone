import React, {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    ButtonGroup,
    Typography,
    Paper,
    Box
} from "@mui/material";


import AddToOrderButton from "./Buttons/AddToOrderButton.js";
import UpdateQuantityButton from "./Buttons/UpdateQuantityButton.js";
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../api/apirequests.js';



function SingleProductPage({ order, setOrder, stripe_id}) {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [refresh, setRefresh] = useState(false);
   
    


    
    useEffect(() => {


     getSingleProduct(id).then(pro => {
        console.log("Product is", pro)
        setProduct(pro);
        console.log("Product is", product)
        
    });  
    }
    , [id]);


    if (!product) {
        return <Typography>Loading...</Typography>;
      }

  return (
    <React.Fragment>
      
        <Box sx={{

            height: "100vh",
            width: "100vw",
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
                    src={product.image}
                />
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '3rem',
                      paddingRight: '3rem',
                      paddingTop: '3rem',
                    }}>
                        <Typography variant='h1'>{product.title}</Typography>
                        
                        <Typography variant='h4'>$ {product.price}</Typography>
                        <Typography variant='h4'>Category:</Typography>
                        <Typography variant='p'>{product.category}</Typography>
                        <Typography variant='h4'>Description:</Typography>
                        <Typography variant='p'>{product.description}</Typography>

                            <ButtonGroup sx={{
                                marginTop: '5rem',
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '50%'
                            }}>
           
                                <AddToOrderButton userId={1}
                                    product_id={product.product_id}
                                    status="created"        
                                    price={product.price}
                                    quantity={1}
                                    setOrder={setOrder}
                                    stripe_id={product.stripe_id}
                                    order_id={order}
                                    setRefresh={setRefresh}
                                />


                            </ButtonGroup>
                            <UpdateQuantityButton order_id={order} orderProductId={product.product_id}
                                                        price={product.price} setRefresh={setRefresh} refresh={refresh}/>
                        </Box>
                    </Box>
    </React.Fragment>

    
  );
};

export default SingleProductPage;