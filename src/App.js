import React, {useState} from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Login from './Components/Login';
import {Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';


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
                    <Route index element={<Login />} />
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/startseite" element={<Home />}></Route>
                    <Route path="/features" element={<TestFeaturesComponent />}></Route>
                    <Route path="/login" element={<Login />}/>
                </Routes>
            </div>
        </ThemeProvider>

    )}


export default App;

