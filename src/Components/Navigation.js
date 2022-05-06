import { Navbar, Nav, FormControl, NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import styled, { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme, GlobalStyles} from "./themes.js";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import { Switch } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Radio, RadioGroup, FormLabel } from '@mui/material';
import { InputBase } from '@mui/material';
import SearchBar from "material-ui-search-bar";

function Navigation({setTheme, theme}){
  const pages = ['Home', 'Features', 'Pricing', 'Login'];
  
  const settings = ['Profil verwalten', 'Nutzer einladen', 'Logout'];
  const themeToggler = () => {
    if(theme){
      setTheme(false);
      localStorage.setItem('theme', "dark");
    }else{
      setTheme(true);
      localStorage.setItem('theme', "light");
    }
  }  
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
  return(
    <AppBar position="static" color ="primary" >
 
      <Toolbar disableGutters>
        <Typography
         
            variant="h6"
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            href= "/"
          ><img
          src="logo-lila.png"
          width="30"
          height="30"
          
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
          
        />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}

              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography  textAlign="center">
                    <Link style={{textDecoration: "none", color: "black"}} to={`/${page}`} color="inherit">{page}</Link>
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img
          src="logo-lila.png"
          width="30"
          height="30"
          
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
          
        />
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                
                <Link style={{textDecoration: "none", color: "white"}}  to={`/${page}`} color="inherit">{page}</Link>
              </Button>
            ))}
          </Box>
          <SearchBar style={{
        margin: '0 auto',
        maxWidth: 800
      }} onChange={(value) => setsearchValue(value)} onRequestSearch={() => console.log({searchValue})}/>
        <ThemeProvider  theme={localStorage.getItem("theme") === "light" ? lightTheme : darkTheme }></ThemeProvider>
        
        
        <Box sx={{ flexGrow: 1}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="user-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}

              color="inherit"
            >
              <AccountCircleIcon sx={{ fontSize: 40 }} />
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
                display: { xs: 'block', md: 'block' },
              }}
            >
              
              <MenuItem key="Profilverwaltung" onClick={handleCloseUserMenu}>
                
                  
                  <Typography
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
                  variant="h6"
                  noWrap
                  component={Link}
                  to="/invite"
                  color="textPrimary"
                  >Nutzer einladen</Typography>
              </MenuItem>
              
                <FormLabel id="demo-controlled-radio-buttons-group">Darstellung</FormLabel>
                  <RadioGroup defaultValue="light" onChange={() => themeToggler()}
                    >
                      <FormControlLabel value="light" control={<Radio />} label="helles Design" />
                      <FormControlLabel value="dark" control={<Radio />} label="dunkles Design" />
                  </RadioGroup>
                  <MenuItem key="Logout" onClick={handleCloseUserMenu}>
                  <Typography
                  variant="h6"
                  noWrap
                  component={Link}
                  to="/login"
                  color="red"
                  >Logout</Typography>
              </MenuItem>
            </Menu>
            </Box>
        </Toolbar>
      </AppBar>
      
    
    )
  }

  export default Navigation;