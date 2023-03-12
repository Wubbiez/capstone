import React, {useEffect, useState} from "react";
import {getAllProducts} from "../api/apirequests.js";
import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import EditProductButton from "./Buttons/EditProductButton.js";
import PageNotFound from "./PageNotFound.js";


// admin dashboard component able to create/edit products, create categories, manage product availability

function AdminDashboard({setIsAdmin, isAdmin}) {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {

            const checkAdmin = localStorage.getItem('user-is_admin');
        if(checkAdmin==="true"){
            setIsAdmin(true);
        }
            setRefresh(false);
        getAllProducts().then((products) => {
            setProducts(products);
        });
    }, [refresh, isAdmin, refresh]);

    if (!isAdmin) {
        return <PageNotFound />;
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {products
                    .sort((a, b) => a.product_id - b.product_id)
                    .map((product) => {
                    return (
                        <Grid item xs={6} sm={6} md={6} lg={6} key={product.product_id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h1">Product Id: {product.product_id}</Typography>
                                    <Typography variant="h1">Product Title: {product.title}</Typography>
                                    <Typography variant="h4">Price: {product.price}</Typography>
                                    <Typography variant="h4">Description: {product.description}</Typography>
                                    <Typography variant="h4">Image: {product.image}</Typography>
                                    <Typography variant="h4">In Stock: {product.in_stock ? "Yes" : "No"}</Typography>
                                    <Typography variant="h4">Category: {product.category}</Typography>

                                    <Box display="flex" alignItems="center" justifyContent="center"
                                         style={{margin: '8px 0'}}>
                                        { isAdmin && <EditProductButton variant="contained" color="secondary" title={product.title}
                                                                        description={product.description}
                                                                        price={product.price} image={product.image}
                                                                        product_id={product.product_id} category={product.category}
                                                                        in_stock={product.in_stock}
                                                                        stripe_id={product.stripe_id}
                                                                        setRefresh={setRefresh}
                                        /> }
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </React.Fragment>
    )
}

export default AdminDashboard;






