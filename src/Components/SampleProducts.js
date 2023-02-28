import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Card, Paper, Grid, styled, Typography, Button, CardContent} from "@mui/material";

import {getAllProducts} from "../api/apirequests";
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
                                    <Typography variant="h5">{product.title}</Typography>
                                    <Typography variant="h6">{product.price}</Typography>
                                    <Typography variant="body1">{product.description}</Typography>
                                    <Button variant="contained" component={Link} to={`/products/${product.product_id}`}>View</Button>
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