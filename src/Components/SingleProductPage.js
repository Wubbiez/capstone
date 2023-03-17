import React, {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    ButtonGroup,
    Typography,
    Paper,
    Box,
    Breadcrumbs
} from "@mui/material";



import AddToOrderButton from "./Buttons/AddToOrderButton.js";
import UpdateQuantityButton from "./Buttons/UpdateQuantityButton.js";
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../api/apirequests.js';



function SingleProductPage({ order, setOrder, stripe_id, setRefreshCart, userId}) {
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
        <Breadcrumbs sx={{
            paddingTop: '2rem',
            color: '#333333',
            fontWeight: 'bold'
        }}>
            
             <Typography variant='h4'>
             Home
             </Typography>
             <Typography variant='h4'>
             Products
             </Typography>
      <Typography variant='h4'>{product.title}</Typography>
    </Breadcrumbs>
      
        <Box sx={{

            height: "100vh",
            width: "100vw",
            padding: "2vh 10px 10px 10px",
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#fff',
            position: 'relative'
          }}>
                <Box
                    component="img"
                    sx={{
                    
                    minWidth: '200px',
                    minHeight: '400px',
                    maxHeight:"80%",
                    maxWidth:  "80%",
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
                      width: '80%',
                      height: '80%',
                      maxHeight:"100%",
                      maxWidth:  "100%",
                    }}>
                        <Typography variant='h1'
                        >{product.title}</Typography>
                        
                        <Typography variant='h4'>
                             $ {product.price}
                        </Typography>
                        <Typography variant='h4' >Category:</Typography>
                        <Typography variant='p'
                        >{product.category}</Typography>
                        <Typography variant='h4'
                            >Description:</Typography>
                        <Typography variant='p'
                        >{product.description}</Typography>

                            <ButtonGroup sx={{
                                marginTop: '5rem',
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '50%',
                                position: 'relative'
                                                      
                            }}>
           
                                <AddToOrderButton userId={userId}
                                    product_id={product.product_id}
                                    status="created"        
                                    price={product.price}
                                    quantity={1}
                                    setOrder={setOrder}
                                    stripe_id={product.stripe_id}
                                    order_id={order}
                                    setRefresh={setRefresh}
                                                  setRefreshCart={setRefreshCart}
                                />


                            </ButtonGroup>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '1.5rem',
                                paddingRight: '33vw'
                            }}>
                                <UpdateQuantityButton order_id={order} orderProductId={product.product_id}
                                                        price={product.price} setRefresh={setRefresh} refresh={refresh} setRefreshCart={setRefreshCart}/>
                            </Box>
                        </Box>
                    </Box>
    </React.Fragment>

    
  );
};

export default SingleProductPage;