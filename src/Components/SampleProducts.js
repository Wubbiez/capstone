import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Card, Paper, Grid, styled, Typography, Button, CardContent, Box} from "@mui/material";
import AddToOrderButton from "./Buttons/AddToOrderButton.js";
import {getAllProducts} from "../api/apirequests.js";
import EditOrderProductButton from "./Buttons/EditOrderProductButton.js";
import UpdateQuantityButton from "./Buttons/UpdateQuantityButton.js";
import EditProductButton from "./Buttons/EditProductButton.js";
import DeleteProductButton from "./Buttons/DeleteProductButton.js";
import DeleteOrderProductButton from "./Buttons/DeleteOrderProductButton.js";
import CheckoutButton from "./Buttons/CheckoutButton.js";

function SampleProducts({order, setOrder}) {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        if (!order) {
            const order_id = localStorage.getItem('order_id');
            if (order_id) {
                setOrder(order_id);
            }
        }
        setRefresh(false);
        getAllProducts().then((products) => {
            products = products.filter(product => product.in_stock === true)
            setProducts(products);
        });
    }, [order, setOrder, refresh]);



    return (
        <div>
            <Grid container spacing={2}>
                {products.map((product) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
                            <Card>
                                <CardContent>
                                    <img src={product.image} alt={product.description}
                                         style={{maxWidth: '100%', height: 'auto'}}/>
                                    <Typography variant="h5">{product.title}</Typography>
                                    <Typography variant="h6">{product.price}</Typography>
                                    <Typography variant="body1">{product.description}</Typography>
                                    <Button variant="contained" component={Link}
                                            to={`/products/${product.product_id}`}>View</Button>
                                    <AddToOrderButton userId={1} product_id={product.product_id} status="created"
                                                      price={product.price} quantity={1} setOrder={setOrder}
                                                      stripe_id={product.stripe_id} order_id={order} setRefresh={setRefresh}

                                    />
                                    <EditOrderProductButton orderProductId={product.product_id} price={product.price}
                                                            quantity={1} />
                                    <Box display="flex" alignItems="center" justifyContent="center"
                                         style={{margin: '8px 0'}}>
                                        <UpdateQuantityButton order_id={order} orderProductId={product.product_id}
                                                              price={product.price} setRefresh={setRefresh} refresh={refresh}/>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center"
                                         style={{margin: '8px 0'}}>
                                        <EditProductButton variant="contained" color="secondary" title={product.title}
                                                           description={product.description}
                                                           price={product.price} image={product.image}
                                                           product_id={product.product_id} category={product.category}
                                                           in_stock={product.in_stock}
                                        />
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center"
                                         style={{margin: '8px 0'}}>
                                        {/*<DeleteProductButton product_id={product.product_id} setRefresh={setRefresh}/>*/}
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center"
                                         style={{margin: '8px 0'}}>
                                        <DeleteOrderProductButton product_id={product.product_id} order_id={order} setRefresh={setRefresh}/>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center"
                                         style={{margin: '8px 0'}}>
                                        <CheckoutButton price={product.price} name={product.title}
                                                        description={product.description} image={product.image}
                                                        order_id={order}/>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default SampleProducts;