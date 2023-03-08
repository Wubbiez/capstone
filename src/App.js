import React, {useState} from 'react';
//import ReactDOM from 'react-dom/client';
import  { useState, useEffect } from 'react';
import { Route,  Routes, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home.js';
import SignUp from './Components/SignUp.js';
import NavBar from './Components/NavBar.js';
import LogIn from './Components/LogIn.js';
import SampleProducts from "./Components/SampleProducts.js";
import PageNotFound from './Components/PageNotFound.js';
import Cart from './Components/Cart.js';
import Success from './Components/Success.js';
import Catagory from './Components/Catagory.js';
import Back from './Components/Back.js';
import Main from './Components/Main.js';


function App() {
  const [order, setOrder] = useState(null);
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route
        path='/'
        exact element={<Home />}></Route>
        <Route
        path='/contact'
        exact element={<Contact />}></Route>
        <Route
        path='/login'
        exact element={<LogIn  setToken={setToken}/>}></Route>
        <Route
        path='/signup'
        exact element={<SignUp />}></Route>
        <Route
        path='/nav'
        exact element={<NavBar />}></Route>
        <Route
        path='/products'
        exact element={<SampleProducts order={order} setOrder={setOrder} />}></Route>
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
        path='/catagory'
        exact element={<Catagory />}></Route>
        <Route
        path='/main'
        exact element={<Main />}></Route>
        <Route
        path='/back'
        exact element={<Back />}></Route>

        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
