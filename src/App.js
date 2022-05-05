import React from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

import './App.css';
import { MusicNote } from '@material-ui/icons';



//const TestHomeComponent = ({}) => {
//  return(
//    
//  )
//}

const TestFeaturesComponent = () => {
  return(
    <h1>Features</h1>
  )
}
var themeVar;
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
const App = () =>
 {
  
  localStorage.setItem('theme', "light");
  if(localStorage.getItem('theme') === "light"){
    themeVar = lightTheme;
  }
  else{
    themeVar = darkTheme;
  }
  return(
    <ThemeProvider theme={themeVar}>
   <div>
    <Navigation sticky="top"/>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/features" element={<TestFeaturesComponent />}></Route>
          <Route path="/login" element={<Login />}/>
        </Routes>
  </div>
  </ThemeProvider>
  
)}  


export default App;

