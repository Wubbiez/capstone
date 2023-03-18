import React, {  useState, useEffect } from 'react';

import {
    Button,
    ButtonGroup,
    Typography,
    Paper,
    Box,
    Breadcrumbs,
    styled,
    Rating
} from "@mui/material";

import AddToOrderButton from "./Buttons/AddToOrderButton.js";
import UpdateQuantityButton from "./Buttons/UpdateQuantityButton.js";
import { useParams } from 'react-router-dom';
import { getSingleProduct, getReviewsByProductId } from '../api/apirequests.js';



const ReviewsSection = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    height: '50vh', // set height to 50% of the viewport height
    overflowY: 'auto', // add scroll bar when content exceeds the height
    width: '50vw'
}));

const StyledPaper = styled(Paper)({
    padding: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#f5f5f5',
    '& .username': {
        marginTop: 'auto',
        textAlign: 'right',
        fontSize: '0.8rem',
        color: '#333333'
    }
});



function SingleProductPage({ order, setOrder, setRefreshCart, userId}) {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [refresh, setRefresh] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

   async function handleDeleteClick(review_id) {
       const token = localStorage.getItem('user-token');
        try {

            const response = await fetch(`http://localhost:3001/api/reviews/${review_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }

            });

            if (response.ok) {
                const item = await response.json();
                console.log(item);
            }
        } catch (error) {
            console.error(error);
        }
        setRefresh(true)
    }

    useEffect(() => {
        getSingleProduct(id).then(pro => {
            setProduct(pro);
            getReviewsByProductId(pro.product_id).then(rev => {
                setReviews(rev);
            });
        });
        const checkAdmin = localStorage.getItem('user-is_admin');
        if (checkAdmin === "true") {
            setIsAdmin(true);
        }
        setRefresh(false)
    }, [id, isAdmin, refresh]);


    if (!product) {
        return <Typography>Loading...</Typography>;
      }
    console.log(reviews)



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
                        <Typography variant='body1'
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
                        <ReviewsSection>
                            <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>Reviews</Typography>
                            {reviews.map(review => (
                                <StyledPaper key={review.review_id}>
                                    <Typography variant='h5'>{review.title}</Typography>
                                    <Typography variant='body1'>{review.content}</Typography>
                                    <Rating  defaultValue={review.rating} precision={0.5} readOnly />
                                    <Typography className='username' variant='body1'>-{review.username}</Typography>
                                    <Typography className='username' variant='body1'>{review.review_id}</Typography>
                                    {isAdmin && <Button onClick={() => handleDeleteClick(review.review_id)}>Delete</Button>}
                                </StyledPaper>
                            ))}
                        </ReviewsSection>
                        </Box>



                    </Box>
    </React.Fragment>

    
  );
};

export default SingleProductPage;