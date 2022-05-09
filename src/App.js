import React, {useState} from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Login from './Components/Login';
import Lexikon from "./Components/Lexikon";
import {Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';


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
                    <Navigation setTheme={setTheme} theme={theme} sticky="top"/>
                    <Routes>
                        <Route index element={<Login/>} />
                        <Route path="/" element={<Home/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/startseite" element={<Home/>}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/lexikon" element={<Lexikon />}/>
                        <Route path="*" element={<div>404 Not Found!</div>} />
                    </Routes>
        </ThemeProvider>
    )}
export default App;

