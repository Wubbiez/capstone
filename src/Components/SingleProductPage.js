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
            fontSize: 'calc(1.5rem + 0.5vw)',
            backgroundColor: '#f1faee',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 0H0v36h36V0zM15.126 2H2v13.126c.367.094.714.24 1.032.428L15.554 3.032c-.188-.318-.334-.665-.428-1.032zM18 4.874V18H4.874c-.094-.367-.24-.714-.428-1.032L16.968 4.446c.318.188.665.334 1.032.428zM22.874 2h11.712L20 16.586V4.874c1.406-.362 2.512-1.468 2.874-2.874zm10.252 18H20v13.126c.367.094.714.24 1.032.428l12.522-12.522c-.188-.318-.334-.665-.428-1.032zM36 22.874V36H22.874c-.094-.367-.24-.714-.428-1.032l12.522-12.522c.318.188.665.334 1.032.428zm0-7.748V3.414L21.414 18h11.712c.362-1.406 1.468-2.512 2.874-2.874zm-18 18V21.414L3.414 36h11.712c.362-1.406 1.468-2.512 2.874-2.874zM4.874 20h11.712L2 34.586V22.874c1.406-.362 2.512-1.468 2.874-2.874z' fill='%23457b9d' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            marginBottom: '0',
            fontWeight: 'bold'
        }}>
            
             <Typography sx={{
            fontSize: 'calc(1.5rem + 0.5vw)',
            marginBottom: '0',
            fontWeight: 'bold'
        }}>
             Home
             </Typography>
             <Typography sx={{
            fontSize: 'calc(1.5rem + 0.5vw)',
            marginBottom: '0',
            fontWeight: 'bold'
        }}>
             Products
             </Typography>
             <Typography sx={{
            fontSize: 'calc(1.5rem + 0.5vw)',
            marginBottom: '0',
            fontWeight: 'bold'
        }}>{product.title}</Typography>
    </Breadcrumbs>
      
        <Box sx={{

            height: "100vh",
            width: "100vw",
            padding: "2vh 10px 10px 10px",
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#f1faee',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 0H0v36h36V0zM15.126 2H2v13.126c.367.094.714.24 1.032.428L15.554 3.032c-.188-.318-.334-.665-.428-1.032zM18 4.874V18H4.874c-.094-.367-.24-.714-.428-1.032L16.968 4.446c.318.188.665.334 1.032.428zM22.874 2h11.712L20 16.586V4.874c1.406-.362 2.512-1.468 2.874-2.874zm10.252 18H20v13.126c.367.094.714.24 1.032.428l12.522-12.522c-.188-.318-.334-.665-.428-1.032zM36 22.874V36H22.874c-.094-.367-.24-.714-.428-1.032l12.522-12.522c.318.188.665.334 1.032.428zm0-7.748V3.414L21.414 18h11.712c.362-1.406 1.468-2.512 2.874-2.874zm-18 18V21.414L3.414 36h11.712c.362-1.406 1.468-2.512 2.874-2.874zM4.874 20h11.712L2 34.586V22.874c1.406-.362 2.512-1.468 2.874-2.874z' fill='%23457b9d' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
   
            position: 'relative'
          }}>
                <Box
              component="img"
              sx={{
                aspectRatio: '16/9',
                maxHeight:"36vh",
                maxWidth:  "20vw",
                padding: "15px 5px 15px 5px",
                "& > *": {
                    flexShrink: 1
                  }
          
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