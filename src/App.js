import React, { useState } from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import './App.css';



//const TestHomeComponent = ({}) => {
//  return(
//    
//  )
//}

const TestFeaturesComponent = ({}) => {
  return(
    <h1>Features</h1>
  )
}


const App = () => (
  <Router>

    <Navigation sticky="top" />
    <Routes>
      
      <Route path="/" element={<Home />}></Route>
      <Route path="/features" element={<TestFeaturesComponent />}></Route>
      
    </Routes>
    
    

  </Router>
);

export default App;

