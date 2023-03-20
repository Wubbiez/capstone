import React, {useEffect, useState} from 'react';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignUp from './Components/SignUp.js';
import NavBar from './Components/NavBar.js';
import LogIn from './Components/LogIn.js';
import SampleProducts from "./Components/SampleProducts.js";
import PageNotFound from './Components/PageNotFound.js';
import Cart from './Components/Cart.js';
import Success from './Components/Success.js';
import Contact from './Components/Contact.js';
import AdminDashboard from "./Components/AdminDashboard.js";
import Main from './Components/Main.js';
import Back from './Components/Back.js';
import Category from './Components/Category.js';
import Extra from './Components/Extra.js';
import Footer from './Components/Footer.js';

import SingleProductPage from './Components/SingleProductPage.js';
import OrderHistory from "./Components/OrderHistory.js";
import {getOrderById, getOrderProductsByOrderId} from "./api/apirequests.js";
import {Box} from "@mui/material";
import Me from "./Components/Me.js";


export const TOKEN_STORAGE_KEY = "user-token";
export const USER_STORAGE_KEY = "user-username";
export const ADMIN_STORAGE_KEY = "user-admin";
export const ORDER_STORAGE_KEY = "order_id";
export const USER_ID = "user-id";

const storageToken = localStorage.getItem(TOKEN_STORAGE_KEY);
const storageUser = localStorage.getItem(USER_STORAGE_KEY);
const storageIsAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
const storageOrder = localStorage.getItem(ORDER_STORAGE_KEY);
const storageUserId = localStorage.getItem(USER_ID);


function App() {
    const [order, setOrder] = useState(storageOrder || null);
    const [token, setToken] = useState(storageToken);
    const [user, setUser] = useState(storageUser);
    const [userId, setUserId] = useState(storageUserId);
    const [isAdmin, setIsAdmin] = useState(storageIsAdmin);
    const [refreshCart, setRefreshCart] = useState(false);
    const [navBarKey, setNavBarKey] = useState(0);

    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        // if there is an open order and its status is 'paid', populate the cart on page load

        if (order !== null) {
            try {
                getOrderById(order).then((r) => {
                    console.log(r.status)
                    if (r.status === "paid") {
                        localStorage.removeItem("order_id");
                    } else {
                        getOrderProductsByOrderId(order).then((r) => {
                            setOrderProducts(r);
                        })
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    }, [order]);


    return (
        <React.Fragment>


            <BrowserRouter>
                <ToastContainer/>
                <NavBar
                    key={navBarKey} // add key prop
                    setIsAdmin={setIsAdmin}
                    setToken={setToken}
                    order={order}
                    setOrder={setOrder}
                    token={token}
                    refreshCart={refreshCart}
                    setRefreshCart={setRefreshCart}
                    isAdmin={isAdmin}
                    userId={userId}
                    user={user}
                    style={{
                        position: 'fixed',
                        width: '100%',
                        zIndex: 1,
                        margin: '0',
                    }}
                />
                <Box style={{position: 'relative'}}>
                    <Routes>
                        <Route
                            path='/'
                            exact element={<Main/>}/>
                        <Route
                            path='/products'
                            exact
                            element={<SampleProducts order={order} setOrder={setOrder} user={user} isAdmin={isAdmin}
                                                     setIsAdmin={setIsAdmin} setRefreshCart={setRefreshCart}
                                                     userId={userId}/>}></Route>
                        <Route
                            path='/products/:id'
                            exact
                            element={<SingleProductPage order={order} setOrder={setOrder} user={user} isAdmin={isAdmin}
                                                        setIsAdmin={setIsAdmin} setRefreshCart={setRefreshCart}
                                                        userId={userId}/>}/>
                        <Route
                            path='/login'
                            exact element={<LogIn setToken={setToken} setIsAdmin={setIsAdmin}/>}></Route>
                        <Route
                            path='/signup'
                            exact element={<SignUp setUser={setUser} setToken={setToken}/>}></Route>
                        <Route
                            path='/admin'
                            exact element={<AdminDashboard isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}></Route>

                        <Route
                            path='/contact'
                            exact element={<Contact/>}></Route>
                        <Route
                            path='*'
                            exact element={<PageNotFound/>}></Route>
                        <Route
                            path='/cart'
                            exact element={<Cart/>}></Route>
                        <Route
                            path='/success'
                            exact element={<Success order={order} setOrder={setOrder} setRefreshCart={setRefreshCart} />}></Route>
                        <Route
                            path='/orderhistory'
                            exact element={<OrderHistory userId={userId} user={user}/>}></Route>

                        <Route
                            path='/back'
                            exact element={<Back/>}></Route>
                        <Route
                            path='/me'
                            exact element={<Me/>}></Route>
                            <Route
                            path='/footer'
                            exact element={<Footer/>}></Route>
                            <Route
                            path='/extra'
                            exact element={<Extra/>}></Route>

                    </Routes>
                </Box>
            </BrowserRouter>

        </React.Fragment>
    );
}

export default App;
