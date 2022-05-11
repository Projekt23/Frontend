import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from "./themes.js";
import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {FormControlLabel, FormLabel, Radio, RadioGroup, Switch} from '@mui/material';
import { Avatar } from '@mui/material';
import SearchBar from "material-ui-search-bar";
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DevicesIcon from '@mui/icons-material/Devices';
import { Divider } from '@mui/material';

function Navigation({setTheme, theme}) {
    const pages = ['Startseite', 'Lexikon'];

    const themeToggler = (event) => {
        if (event.target.value ==="dark") {
            setTheme(false);
            localStorage.setItem('theme', "dark");
        } else if(event.target.value ==="light") {
            setTheme(true);
            localStorage.setItem('theme', "light");
        }else{
            if(window.matchMedia("(prefers-color-scheme: dark)").matches === false){
                setTheme(true);
              }
              else{
                setTheme(false);
              }
        }
    }
    const [value, setValue] = React.useState('');
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [searchValue, setsearchValue] = React.useState();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar sx={{bgcolor: '#004ea5'}} position="static" >
            <Toolbar disableGutters>
                {/* Display only in Desktop Version -------------------------------------------------------------------------------------------------------------------*/}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{mr: 2, ml: 2, display: {xs: 'none', md: 'flex'}}}
                    href="/"
                ><img
                    src="logo-lila.png"
                    width="30"
                    height="30"

                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                </Typography>
                {/* Display only in Mobile Version -------------------------------------------------------------------------------------------------------------------*/}
                <Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, ml: 2, flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <img
                            src="logo-lila.png"
                            width="30"
                            height="30"

                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Typography></Box>
                {/* Display only in Mobile Version -------------------------------------------------------------------------------------------------------------------*/}
                <Box sx={{ flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}

                        color="inherit"
                    >
                        <MenuIcon/>
                    </IconButton>
                    {/* Display only in Mobile Version -------------------------------------------------------------------------------------------------------------------*/}
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            mr: 10,
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography sx={{textDecorationLine: 'none', "&:hover": { color: "white" }}} textAlign="center" variant="h6"
                                            noWrap
                                            component={Link}
                                            to={`/${page}`}
                                            color="textPrimary"
                                >
                                    {page}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                {/* Display only in Desktop Version -------------------------------------------------------------------------------------------------------------------*/}
                <Box sx={{mr: 10, flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                    {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            <Typography sx={{textDecorationLine: 'none', "&:hover": { color: "white" }}} textAlign="center" variant="h6"
                                        noWrap
                                        component={Link}
                                        to={`/${page}`}
                                        color="white"
                            >
                                {page}
                            </Typography>
                        </Button>
                    ))}
                </Box>
                {/* The searchbar is displayed in Mobile and Desktop Version -------------------------------------------------------------------------------------------------------------------*/}
                <Box  sx={{minWidth: 200,  width: 2000, alignContent: 'center'}}>
                    <SearchBar style={{
                        margin: '0 auto'
                    }} onChange={(value) => setsearchValue(value)} onRequestSearch={() =>

                        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------
                        // hier muss die Suche hin
                        console.log({searchValue})
                        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------

                    }/></Box>
                <Box sx={{width: 1}}>
                    <ThemeProvider theme={localStorage.getItem("theme") === "light" ? lightTheme : darkTheme}/>
                </Box>
                {/* The Profile Settings Button and Menu is displayed in Mobile and Desktop Version -------------------------------------------------------------------------------------------------------------------*/}
                <Box sx={{flexGrow: 1 }} >
                    <IconButton
                        size="large"
                        aria-controls="user-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenUserMenu}
                        color="inherit"
                    ><Avatar src="Profilbild.png" />
                    </IconButton>
                    <Menu
                        
                        id="user-appbar"
                        anchorEl={anchorElUser}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        sx={{
                            display: {xs: 'block', md: 'block'},
                            width:'200%'
                        }}
                    >
                        <MenuItem key="Profilverwaltung" onClick={handleCloseUserMenu}>
                            <Typography
                                sx={{textDecorationLine: 'none', "&:hover": { color: "inherit" }}}
                                variant="h6"
                                noWrap
                                component={Link}
                                to="/profile"
                                color="textPrimary"
                            >Profil verwalten
                            </Typography>
                        </MenuItem>
                        <MenuItem key="Nutzereinladung" onClick={handleCloseUserMenu}>
                            <Typography
                                sx={{textDecorationLine: 'none', "&:hover": { color: "inherit" }}}
                                variant="h6"
                                noWrap
                                component={Link}
                                to="/invite"
                                color="textPrimary"
                            >Nutzer einladen</Typography>
                        </MenuItem>
                        <Divider sx={{  marginBottom: 2, borderBottomWidth: 3,  color: 'primary' }}/>
                        <Typography
                            sx={{ml:0.5}} variant="h6">Darstellung</Typography>
                        <RadioGroup defaultValue="light" onChange={themeToggler} sx={{ml:1.5}} >
                            <Box >
                                <Box><FormControlLabel value="light"  control={<Radio/>} label="helles Design"/><LightModeIcon sx={{ml:1.5, mr:2}}/></Box>
                                <Box><FormControlLabel value="dark" control={<Radio/>} label="dunkles Design"/><DarkModeIcon /></Box>
                                <Box><FormControlLabel value="standard" control={<Radio/>} label="Gerätestandard"/><DevicesIcon /></Box>
                            </Box>
                        </RadioGroup>
                        <Divider sx={{  marginBottom: 2, borderBottomWidth: 3,  color: 'primary' }}/>
                        <MenuItem key="Logout" onClick={handleCloseUserMenu}>
                            <Typography
                                sx={{textDecorationLine: 'none', "&:hover": { color: "red" }}}
                                variant="h6"
                                noWrap
                                component={Link}
                                to="/login"
                                color="red"
                            >
                            
                            <LogoutIcon/> Abmelden</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>


    )
}

export default Navigation;