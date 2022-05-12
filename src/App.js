import React, {useState, useEffect} from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Login from './Components/Login';
import Lexikon from "./Components/Lexikon";
import Profil from './Components/SettingsComponents/Profil';
import {Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';
import Invite from './Components/SettingsComponents/Invite';
import Settings from './Components/Settings';

import { CssBaseline } from '@mui/material/';
import SearchResult from './Components/SearchResult';


const darkTheme = createTheme({
    palette: {
        background: {
            default: '#1A2027',
            paper: '#1A2027',
          },
        mode: 'dark',
        primary: {
          main: '#004ea5',
        },
    },
    components: {
        Link: {
            color: "white"
        }

    },
});
const lightTheme = createTheme({
    palette: {
        background: {
            default: 'white',
            paper: 'white',
          },
        mode: 'light',
        primary: {
          main: '#004ea5',
        },
    },

    components: {
        Link: {
            color: "black"
        }}
    
});
const App = () =>
{
    useEffect(() => {
        // write your code here, it's like componentWillMount
        if(localStorage.getItem('theme') === null){
            localStorage.setItem('theme', 'light');
        }
            
    }, [])
 
    const [theme, setTheme] = useState(true);
    
    return(
        <ThemeProvider theme={theme ?  lightTheme : darkTheme}>
            <CssBaseline/>
                    <Navigation setTheme={setTheme} theme={theme} sticky="top"/>
                    <Routes>
                        <Route index element={<Login/>} />
                        <Route path="/startseite" element={<Home/>}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/lexikon" element={<Lexikon />}/>
                        <Route path="/settings" element={<Settings />}/>
                        <Route path="/invite" element={<Invite />}/>
                        <Route path="/profile" element={<Profil />}/>
                        <Route path="/result" element={<SearchResult />}/>
                        <Route path="*" element={<div>404 Not Found!</div>} />
                    </Routes>
        </ThemeProvider>
    )}
export default App;