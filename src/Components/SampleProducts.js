import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Card, Paper, Grid, styled, Typography, Button, CardContent, Box} from "@mui/material";
import AddToOrderButton from "./AddToOrderButton.js";
import {getAllProducts} from "../api/apirequests.js";
import EditOrderProductButton from "./EditOrderProductButton.js";
import UpdateQuantityButton from "./UpdateQuantityButton.js";
function SampleProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then((products) => {
            setProducts(products);
        });
    }, []);

    return (
        <div>
            <Grid container spacing={2}>
                {products.map((product) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
                            <Card>
                                <CardContent>
                                    <img src={product.image} alt={product.description} style={{ maxWidth: '100%', height: 'auto' }}/>
                                    <Typography variant="h5">{product.title}</Typography>
                                    <Typography variant="h6">{product.price}</Typography>
                                    <Typography variant="body1">{product.description}</Typography>
                                    <Button variant="contained" component={Link} to={`/products/${product.product_id}`}>View</Button>
                                    <AddToOrderButton userId={1} product_id={product.product_id} status="created" price={product.price} quantity={1} />
                                    <EditOrderProductButton orderProductId={product.product_id} price={product.price} quantity={1} />
                                    <Box display="flex" alignItems="center">
                                    <UpdateQuantityButton orderProductId={product.product_id} price={product.price} />
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