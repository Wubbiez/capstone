
import React from 'react';

import {BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';




function App() {
  let [value, setValue] = useState();
  return (
    <div style={{ textAlign: 'center' }}>
      <header>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
