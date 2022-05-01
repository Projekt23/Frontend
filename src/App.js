import React, { useState } from 'react';
import Navigation from './Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './App.css';



const TestHomeComponent = ({}) => {
  return(
    <h1>Home</h1>
  )
}

const TestFeaturesComponent = ({}) => {
  return(
    <h1>Features</h1>
  )
}


const App = () => (
  <Router>

    <Navigation sticky="top" />
    
    <Routes>
      
      <Route path="/" element={<TestHomeComponent />}></Route>
      <Route path="/features" element={<TestFeaturesComponent />}></Route>
      
    </Routes>
    
    

  </Router>
);

export default App;

