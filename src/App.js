import React, {useState} from 'react';

import { Route,  Routes, BrowserRouter } from 'react-router-dom';
import SignUp from './Components/SignUp.js';
import NavBar from './Components/NavBar.js';
import LogIn from './Components/LogIn.js';
import SampleProducts from "./Components/SampleProducts.js";
import PageNotFound from './Components/PageNotFound.js';
import Cart from './Components/Cart.js';
import Success from './Components/Success.js';
import Contact from './Components/Contact.js';
import AdminDashboard from "./Components/AdminDashboard.js";

import SingleProductPage from './Components/SingleProductPage.js';
import OrderHistory from "./Components/OrderHistory.js";



export const TOKEN_STORAGE_KEY = "user-token";
export const USER_STORAGE_KEY = "user-username";
export const ADMIN_STORAGE_KEY = "user-admin";

const storageToken = localStorage.getItem(TOKEN_STORAGE_KEY);
const storageUser = localStorage.getItem(USER_STORAGE_KEY);
const storageIsAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);



function App() {
  const [order, setOrder] = useState(null);
  const [token, setToken] = useState(storageToken);
    const [user, setUser] = useState(storageUser);
    const [isAdmin, setIsAdmin] = useState(storageIsAdmin);
  return (
    <React.Fragment>
    <BrowserRouter>
    <NavBar setIsAdmin={setIsAdmin} setToken={setToken}  order={order} setOrder={setOrder}/>
      <Routes>
      <Route
        path='/'
        exact element={<SampleProducts order={order} setOrder={setOrder} user={user} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}></Route>
      <Route
        path='/products'
        exact element={<SampleProducts order={order} setOrder={setOrder} user={user} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}></Route>
      <Route
        path='/products/:id'
        exact element={<SingleProductPage order={order} setOrder={setOrder} user={user} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}></Route>

        <Route
        path='/login'
        exact element={<LogIn setToken={setToken} setIsAdmin={setIsAdmin} />}></Route>
        <Route
        path='/signup'
        exact element={<SignUp setUser={setUser} setToken={setToken} />}></Route>
        <Route
          path='/admin'
            exact element={<AdminDashboard isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}></Route>
        <Route
        path='/nav'
        exact element={<NavBar />}></Route>
      <Route
        path='/contact'
        exact element={<Contact />}></Route>
        <Route
        path='*'
        exact element={<PageNotFound />}></Route>
        <Route
        path='/cart'
        exact element={<Cart />}></Route>
        <Route
          path='/success'
            exact element={<Success order={order} setOrder={setOrder} />}></Route>
        <Route
          path='/orderhistory'
            exact element={<OrderHistory user={user} />}></Route>
        
      </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
