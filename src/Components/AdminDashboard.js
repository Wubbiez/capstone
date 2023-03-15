import React, {useEffect, useState} from "react";
import {getAllProducts, getAllUsers} from "../api/apirequests.js";
import {Box, Card, CardContent, Grid, Typography, Button} from "@mui/material";
import EditProductButton from "./Buttons/EditProductButton.js";
import PageNotFound from "./PageNotFound.js";
import EditUserButton from "./Buttons/EditUserButton.js";


// admin dashboard component able to create/edit products, create categories, manage product availability

function AdminDashboard({setIsAdmin, isAdmin}) {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const checkAdmin = localStorage.getItem('user-is_admin');
        if(checkAdmin==="true"){
            setIsAdmin(true);
        }
        setRefresh(false);
        if (showUsers) {
            // Fetch users instead of products
            getAllUsers().then((users) => {
                setUsers(users);
            });
        } else {
            getAllProducts().then((products) => {
                setProducts(products);
            });
        }
    }, [refresh, isAdmin, refresh, showUsers]);


    if (!isAdmin) {
        return <PageNotFound />;
    }

    return (
        <React.Fragment>
            <Button onClick={() => setShowUsers(!showUsers)}>Show All Users</Button>
            <Grid container spacing={2}>


                {showUsers ? (
                            users.sort((a, b) => a.user_id - b.user_id).map((user) => (
                                <Grid item xs={6} sm={6} md={6} lg={6} key={user.id}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h1">User Id: {user.user_id}</Typography>
                                            <Typography variant="h1">Username: {user.username}</Typography>
                                            <Typography variant="h4">Password: {user.password}</Typography>
                                            <Typography variant="h4">Email: {user.email}</Typography>
                                            <Typography variant="h4">Admin: {user.is_admin ? "Yes" : "No"}</Typography>
                                            <Typography variant="h4">Phone: {user.phone}</Typography>
                                            <Typography variant="h4">First Name: {user.first_name}</Typography>
                                            <Typography variant="h4">Last Name: {user.last_name}</Typography>
                                            <Typography variant="h4">Address: {user.address}</Typography>
                                            <Typography variant="h4">Active: {user.is_active ? "Yes" : "No"}</Typography>
                                            <Box display="flex" alignItems="center" justifyContent="center"
                                                 style={{margin: '8px 0'}}>
                                                <EditUserButton variant="contained" color="secondary" username={user.username} password={user.password} email={user.email} phone={user.phone} first_name={user.first_name} last_name={user.last_name} address={user.address} user_id={user.user_id} is_admin={user.is_admin} is_active={user.is_active} setRefresh={setRefresh}/>
                                                </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : products
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






