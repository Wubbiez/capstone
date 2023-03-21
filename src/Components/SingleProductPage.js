import React, {useEffect, useState} from 'react';

import {Box, Breadcrumbs, Button, ButtonGroup, Divider, Paper, Rating, styled, Typography, Tooltip} from "@mui/material";

import AddToOrderButton from "./Buttons/AddToOrderButton.js";
import UpdateQuantityButton from "./Buttons/UpdateQuantityButton.js";
import {useParams} from 'react-router-dom';
import {getAverageProductRating, getReviewsByProductId, getSingleProduct} from '../api/apirequests.js';


const ReviewsSection = styled(Box)(({theme}) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    height: '70%',
    overflowY: 'auto',
    width: '70vw',
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
        color: '#333333',
    },
});


function SingleProductPage({order, setOrder, setRefreshCart, userId}) {
    const {id} = useParams();
    const [product, setProduct] = useState();
    const [refresh, setRefresh] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [rating, setRating] = useState(0);

    async function handleDeleteClick(review_id) {
        const token = localStorage.getItem('user-token');
        try {

            const response = await fetch(`${process.env.REACT_APP_EC2_PUBLIC_IP}/api/reviews/${review_id}`, {
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
         getSingleProduct(id)
            .then((pro) => {
                setProduct(pro);
                return getReviewsByProductId(pro.product_id);
            })
            .then((rev) => {
                setReviews(rev);
                return getAverageProductRating(id);
            })
            .then((score) => {
                //set rating and convert to number
                setRating(Number(score.avg).toFixed(2));

            })
            .catch((error) => {
                console.error(error);
            });

        const checkAdmin = localStorage.getItem("user-is_admin");
        if (checkAdmin === "true") {
            setIsAdmin(true);
        }
        setRefresh(false);
    }, [id, setIsAdmin, refresh ]);



    if (!product) {
        return <Typography>Loading...</Typography>;
    }
    console.log(reviews)


    return (
        <React.Fragment>
            <Box sx={{
                background: 'linear-gradient(45deg, rgba(29,53,87,1) 0%, rgba(241,250,238,1) 50%, rgba(245,245,245,1) 100%)',
            
            }}>
            <Breadcrumbs sx={{
            fontWeight: '200',
            fontStyle: 'normal',
            letterSpacing: '0em',
            textTransform: 'none',
            lineHeight: '1.2em',
            paddingTop: '1rem',
            paddingLeft: '1rem',
            margin: '0 0 0 0',
            fontSize: 'calc(0.8rem + 0.2vw)',
            '@media (min-width:600px)': {
                fontSize: 'calc(0.9rem + 0.6vw)',
            },
            '@media (min-width:960px)': {
                fontSize: 'calc(1rem + 1.2vw)',
            },
        }}>

                <Typography variant="p">
                    Home
                </Typography>
                <Typography variant="p">
                    Products
                </Typography>
                <Typography variant="p">{product.title}</Typography>
            </Breadcrumbs>
            <Box sx={{

            height: "100%",
            width: "100%",
            padding: "2vh 10px 10px 10px",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflowY: 'scroll',
            }}>
            <Box sx={{

                height: "100%",
                width: "100%",
                padding: "2vh 10px 10px 10px",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',


            }}>
                <Box
                    component="img"
                    sx={{
                        maxHeight: "100%",
                        width: '20%',
                        padding: "0px 5px 15px 5px",
                        objectFit: 'contain',
                        alignSelf: "flex-start",
                    }}
                    alt="title"
                    src={product.image}
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '0.5rem',
                    paddingRight: '3rem',
                    width: '60%',
                    height: '80%',
                    maxHeight: "100%",
                    maxWidth: "100%",
                    flex: 2
                }}>
                    <Typography variant='h2'
                    >{product.title}</Typography>

                    <Typography variant='h4'>
                        $ {product.price}
                    </Typography>
                    <Typography variant='h4'>Category:</Typography>
                    <Typography variant='p'
                    >{product.category}</Typography>
                    <Typography variant='h4'>Rating:</Typography>
                    <Rating name="read-only" value={rating} readOnly/>
                    <Typography variant='h4'
                    >Description:</Typography>
                    <Typography variant='p'
                    >{product.description}</Typography>



                    <ButtonGroup sx={{
                        marginTop: '1rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
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
marginTop: '1rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                        <UpdateQuantityButton order_id={order} orderProductId={product.product_id}
                                              price={product.price} setRefresh={setRefresh} refresh={refresh}
                                              setRefreshCart={setRefreshCart}/>
                    </Box>

                </Box>
                
            </Box>
            <Box
                    sx={{display: 'flex',

                        marginRight: '1rem',
                        marginLeft: '1rem',
                        maxHeight: "100%",
                        maxWidth: "100%"}}>
                    <ReviewsSection>
                        <Typography variant='h2'>Reviews</Typography>
                        <Divider style={{marginBottom: '1rem'}}/>
                        {reviews.map(review => (
                            <StyledPaper key={review.review_id}>
                                <Typography variant='h4'>{review.title}</Typography>
                                <Typography variant='p'>{review.content}</Typography>
                                <Rating defaultValue={review.rating} precision={0.5} readOnly gutterBottom/>
                                <Typography className='username' variant='body1'>-{review.username}</Typography>
                                {isAdmin && <Button onClick={() => handleDeleteClick(review.review_id)}  sx={{
                                    backgroundColor: '#E63946',
                                    color: '#F1FAEE',
                                    '&:hover': {
                                        backgroundColor: '#A8DADC',
                                        color: '#E63946'
                                    }
                                }}>Delete</Button>}
                            </StyledPaper>
                        ))}
                    </ReviewsSection>
                </Box>
            </Box>
            </Box>
        </React.Fragment>


    );
}

export default SingleProductPage;