import React, { useState } from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Login from './Components/Login';
import SearchResult from './Components/SearchResult';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
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
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#222222"
    }
    },
    components: {
      // Name of the component
      Link: {
        color: "white"
      },
      
    },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: "#e4f0e2",
    },
  },
    
    components: {
      // Name of the component
      Link: {
        color: "black"
      },
    },
});
const App = () =>
 {

  const [theme, setTheme] = useState(true);
  
  return(
  <ThemeProvider theme={theme ?  lightTheme : darkTheme}>
    
   <div>
     
    <Navigation setTheme={setTheme} theme={theme} sticky="top"/>
    
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/startseite" element={<Home />}></Route>
          <Route path="/features" element={<TestFeaturesComponent />}></Route>
          <Route path="/login" element={<Login />}/>
          <Route path="/result" element={<SearchResult />}/>
        </Routes>
  </div>
  </ThemeProvider>
  
)}  


export default App;

