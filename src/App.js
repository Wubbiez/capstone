import React from 'react';
//import ReactDOM from 'react-dom/client';
//import  { useState, useEffect } from 'react';
import { Route,  Routes, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import NavBar from './Components/NavBar';
import LogIn from './Components/LogIn';


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
        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
