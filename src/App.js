import React, {useState, useEffect} from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Login from './Components/Login';
import Lexikon from "./Components/Lexikon";
import ObjektAnlegen from "./Components/ObjektAnlegen";
import Profil from './Components/SettingsComponents/Profil';
import {Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';
import Invite from './Components/SettingsComponents/Invite';
import Settings from './Components/Settings';

import { CssBaseline } from '@mui/material/';
import SearchResult from './Components/SearchResult';

// Test Data
import data from "./Components/LexikonComponents/LexikonData";
import Registierung from './Components/Registierung';



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
    const [userID, setUserID] = useState();
    const [theme, setTheme] = useState(true);

    function checkLogin(){
        console.log(window.location.pathname)
        if((window.location.pathname === "/" || window.location.pathname === "/Login" || window.location.pathname === "/login"|| window.location.pathname === "/register") && localStorage.getItem("userID") === null){
            return null;
        }
        else{
            return  <Navigation setTheme={setTheme} theme={theme} sticky="top" setUserID = {setUserID}/>;
        }
            
    }
    const themeStart = () => {
        if (localStorage.getItem('theme') ==="dark") {
            setTheme(false);
            localStorage.setItem('theme', "dark");
        } else if(localStorage.getItem('theme') ==="light") {
            setTheme(true);
            localStorage.setItem('theme', "light");
        }else{
            localStorage.setItem('theme', "standard");
            if(window.matchMedia("(prefers-color-scheme: dark)").matches === false){
                setTheme(true);
              }
              else{
                setTheme(false);
              }
        }
    }
    useEffect(() => {
        // write your code here, it's like componentWillMount
        if(localStorage.getItem('theme') === 'light' || localStorage.getItem('theme') === null){
            localStorage.setItem('theme', 'light');
            themeStart()
        }
        else if(localStorage.getItem('theme') === "dark"){
            localStorage.setItem('theme', 'dark');
            themeStart()
        }
        else if(localStorage.getItem('theme') === "standard"){
            localStorage.setItem('theme', 'standard');
            themeStart()
        }
            
    }, [])
    
    return(
        <ThemeProvider theme={theme ?  lightTheme : darkTheme}>
            <CssBaseline/>
                    {checkLogin()}
                    <Routes>
                        <Route index element={<Login setUserID = {setUserID}/>} />
                        <Route path="/startseite" element={<Home/>}/>
                        <Route path="/login" element={<Login setUserID = {setUserID}/>}/>
                        <Route path="/register" element={<Registierung setUserID = {setUserID}/>}/>
                        <Route path="/lexikon" element={<Lexikon lexikonData={data}/>}/>
                        <Route path="/objekt_anlegen" element={<ObjektAnlegen />}/>
                        <Route path="/settings" element={<Settings />}/>
                        <Route path="/invite" element={<Invite />}/>
                        <Route path="/profile" element={<Profil />}/>
                        <Route path="/result" element={<SearchResult />}/>
                        <Route path="*" element={<div>404 Not Found!</div>} />
                    </Routes>
        </ThemeProvider>
    )}
export default App;