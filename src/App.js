import React, {useState} from 'react';
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


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#004ea5',
        },
    },
    components: {
        Link: {
            color: "white"
        },

    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#004ea5',
        },
    },

    components: {
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
                        <Route path="/startseite" element={<Home/>}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/lexikon" element={<Lexikon />}/>
                        <Route path="/settings" element={<Settings />}/>
                        <Route path="/invite" element={<Invite />}/>
                        <Route path="/profile" element={<Profil />}/>
                        <Route path="*" element={<div>404 Not Found!</div>} />
                    </Routes>
        </ThemeProvider>
    )}
export default App;

