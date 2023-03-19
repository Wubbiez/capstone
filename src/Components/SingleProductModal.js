import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, ButtonGroup, Modal, Paper, Typography, Tooltip} from "@mui/material";
import {OpenInNewTwoTone} from '@mui/icons-material';

import AddToOrderButton from "./Buttons/AddToOrderButton.js";
import UpdateQuantityButton from "./Buttons/UpdateQuantityButton.js";


function SingleProductModal({
                                product_id,
                                title,
                                description,
                                price,
                                image,
                                in_stock,
                                category,
                                order,
                                setRefresh,
                                setOrder,
                                stripe_id,
                                refresh,
                                setRefreshCart,
                                userId
                            }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleCloseModal() {
        setIsOpen(false);
    }

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
                sx={{
                    backgroundColor: '#457B9D',
                    transition: 'background-color 0.3s ease',
                    width: '80%',
                    '&:hover': {
                        backgroundColor: '#A8DADC',
                        color: '#333333',
                        boxShadow: '1px 2px 1px 1px #1D3557;',
                    }
                }}>
                {'Quick View'}
            </Button>

            <Modal
                open={isOpen}
                onClose={handleCloseModal}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflowY: 'scroll',
                }}

            >
                <Paper sx={{
                    margin: "5vh 10vw 5vh 10vw",
                    boxShadow: "10px 10px 2px 1px rgba(0, 0, 0, 0.2)",
                    height: "80vh",
                    width: '80vh',
                    minHeight: "calc(10rem + 20vw)",
                    maxHeight: "85vh",
                    maxWidth: "85vw",
                    padding: "5vh 10px 10px 10px",
                    display: 'flex',
                    flexDirection: 'row',
                    flex: '1',
                    background: 'linear-gradient(45deg, rgba(29,53,87,1) 0%, rgba(241,250,238,1) 50%, rgba(245,245,245,1) 100%)',
                
                    position: 'relative',
                    "& > *": {
                        flexShrink: 1
                    }

                }}>
                    <Button onClick={handleCloseModal} s sx={{
                        backgroundColor: "#333333",
                        position: 'absolute',
                        top: '0',
                        right: '0',
                    }}>X</Button>
                    <Box
                        component="img"
                        sx={{
                            aspectRatio: '16/9',
                            maxHeight: "50%",
                            maxWidth: "30%",
                            padding: "15px 5px 15px 5px"
                        }}
                        alt="title"
                        src={image}
                    />

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1',
                        paddingLeft: '0.5rem',
                        paddingRight: '0.5rem',
                        flexBasis: '100%',
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        '@media screen and (min-width: 600px)': {
                            flexBasis: '50%',
                            overflow: 'hidden',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word'
                        },
                        '@media screen and (min-width: 960px)': {
                            flexBasis: '33.33%',
                            overflow: 'hidden',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word'
                        },
                        "& > *": {
                            flexShrink: 1,

                        }
                    }}>
                        <Typography variant='h1'>{title}</Typography>
                        <Typography variant='h4'>$ {price}</Typography>
                        <Typography variant='h5'>Description:</Typography>
                        <Typography variant='p'>{description}</Typography>

                        <ButtonGroup sx={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            height: '10%',
                            width: '80px',
                            margin: '5rem 0 5rem 1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            justifyContent: 'left',
                            "& > *": {
                                flexShrink: 1
                            },
                            '@media (min-width:600px)': {
                                width: '120px',
                            },
                            '@media (min-width:960px)': {
                                bottom: '0',
                                left: 'calc(1rem + 0.3vw)',
                                width: '160px',
                            },
                        }}>


                            <AddToOrderButton userId={userId} product_id={product_id} status="created"
                                              price={price} quantity={1} setOrder={setOrder}
                                              stripe_id={stripe_id} order_id={order} setRefresh={setRefresh}
                                              setRefreshCart={setRefreshCart}

                            />


                            <Box display="flex" alignItems="center" justifyContent="center"
                                 style={{margin: '8px 0'}}>
                                <UpdateQuantityButton order_id={order} orderProductId={product_id}
                                                      price={price} setRefresh={setRefresh} refresh={refresh}
                                                      setRefreshCart={setRefreshCart}/>
                            </Box>
                            <Tooltip title="View Full Item" arrow>
                            <Button variant="contained" component={Link}
                                    to={`/products/${product_id}`}
                                    sx={{
                                        backgroundColor: '#457B9D',
                                        height: '100%',
                                        width: '100%',
                                        fontSize: 'calc(1rem + 0.2vw)',
                                        padding: 'calc(0.5rem + 0.1vw)',

                                        transition: 'background-color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#A8DADC',
                                            color: '#333333',
                                            boxShadow: '1px 2px 1px 1px #1D3557;',
                                        },
                                        // '@media (min-width:600px)': {
                                        //     padding: 'calc(1.2rem + 0.6vw)',
                                        //     fontSize: 'calc(1.3rem + 0.8vw)',
                                        // },
                                        // '@media (min-width:960px)': {
                                        //     padding: 'calc(1.6rem + 1.2vw)',
                                        //     fontSize: 'calc(2.2rem + 1.2vw)',
                                        // },
                                    }}>
                                <OpenInNewTwoTone/>
                            </Button>
                            </Tooltip>
                        </ButtonGroup>
                    </Box>
                </Paper>
            </Modal>
        </React.Fragment>


    );
};

export default SingleProductModal;


