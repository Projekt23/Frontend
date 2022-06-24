import React, {useState, useEffect} from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Login from './Components/Login';
import Resultlist from './Components/Resultlist';
import Lexikon from "./Components/Lexikon";
import ObjektAnlegen from "./Components/ObjektAnlegen";
import ObjektBearbeiten from "./Components/ObjektBearbeiten";
import Profil from './Components/SettingsComponents/Profil';
import {Link, Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';
import Invite from './Components/SettingsComponents/Invite';
import Settings from './Components/Settings';
import {  ReactiveBase}  from "@appbaseio/reactivesearch";
import {useNavigate} from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { CssBaseline, Divider, Typography } from '@mui/material/';
import SearchResult from './Components/SearchResult';
import { BottomNavigation } from '@mui/material';
import {BottomNavigationAction} from '@mui/material/';

// Test Data

import Registierung from './Components/Registierung';

import { Box } from '@mui/system';



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
const loginTheme = createTheme({
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
    const[loggedIn, setLoggedIn] = useState(false);
    const [theme, setTheme] = useState(true);
    const [password, setPassword] = useState("");
    
    function checkLogin(){
        if(localStorage.getItem("userID") === null || decodeToken(localStorage.getItem("userID")) === null || (decodeToken(localStorage.getItem("userID")).username === undefined && decodeToken(localStorage.getItem("userID")).email === undefined && decodeToken(localStorage.getItem("userID")).id === undefined)){
            return (
                <Routes>
                        <Route index element={<Login setUserID = {setUserID} password = {password} setPassword = {setPassword}/>} />
                        <Route path="/login" element={<Login setUserID = {setUserID} password = {password} setPassword = {setPassword}/>}/>
                        <Route path="/register" element={<Registierung setUserID = {setUserID}/>}/>
                        <Route path="*" element={<Box><Typography>Access denied!</Typography><Typography component={Link} to="/login" >zum Login</Typography></Box>} />
                </Routes>
            )
        }
        
        else{
            return  (
            <>
            
            <ReactiveBase
            app='business_objects'
            url={process.env.REACT_APP_API_ELASTIC}
            >

       
            <Navigation setTheme={setTheme} theme={theme} sticky="top" setUserID = {setUserID} password = {password} setPassword = {setPassword}/>

            

            <Routes>
                    <Route index element={<Home />} />
                    <Route path="/startseite" element={<Home/>}/>
                    {/* <Route path="/login" element={<Login setUserID = {setUserID}/>}/>*/}
                    <Route path="/register" element={<Registierung setUserID = {setUserID}/>}/> 
                    <Route path="/lexikon" element={<Lexikon/>}/>
                    <Route path="/objekt_anlegen" element={<ObjektAnlegen />}/>
                    <Route path="/objekt_bearbeiten" element={<ObjektBearbeiten />}/>
                    <Route path="/settings" element={<Settings />}/>
                    <Route path="/invite" element={<Invite />}/>
                    <Route path="/resultlist" element={<Resultlist />}/>
                    <Route path="/profile" element={<Profil password = {password} setPassword = {setPassword}/>}/>
                    <Route path="/result" element={<SearchResult />}/>
                    <Route path="*" element={<div>404 Not Found!</div>} />
                </Routes>
                </ReactiveBase>
                </>
                    )
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
            <BottomNavigation
            showLabels
            
            >
            <BottomNavigationAction label="© 2022 - Projekt23" />
            </BottomNavigation>
        </ThemeProvider>
    )}
export default App;