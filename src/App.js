import React from 'react';
//import ReactDOM from 'react-dom/client';
//import  { useState, useEffect } from 'react';
import { Route,  Routes, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home.js';
import SignUp from './Components/SignUp.js';
import NavBar from './Components/NavBar.js';
import LogIn from './Components/LogIn.js';
import SampleProducts from "./Components/SampleProducts.js";
import PageNotFound from './Components/PageNotFound.js';
import Cart from './Components/Cart.js';
import Success from './Components/Success.js';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route
        path='/'
        exact element={<Home />}></Route>
        <Route
        path='/login'
        exact element={<LogIn />}></Route>
        <Route
        path='/signup'
        exact element={<SignUp />}></Route>
        <Route
        path='/nav'
        exact element={<NavBar />}></Route>
        <Route
        path='/products'
        exact element={<SampleProducts />}></Route>
        <Route
        path='*'
        exact element={<PageNotFound />}></Route>
        <Route
        path='/cart'
        exact element={<Cart />}></Route>
        <Route
          path='/success'
            exact element={<Success />}></Route>

        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
