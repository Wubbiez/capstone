
import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Home from './components/Home.js';
import PageNotFound from './components/404.js';
import './css/index.css'



function App() {
  let [value, setValue] = useState();
  return (
    <div id='app'>
     <Routes>
                <Route
                    path='/'
                    element={<Home
                    />}
                />
                <Route
                    path='*'
                    element={<PageNotFound
                    />}
                />
      </Routes>
    </div>
  );
}

export default App;
// const container = document.querySelector('#container');
// const root = ReactDOM.createRoot(container);
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// )
