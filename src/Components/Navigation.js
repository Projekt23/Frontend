import { Navbar, Nav, FormControl, NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import styled, { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme, GlobalStyles} from "./themes.js";
import React from 'react';
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
import App from '../App.js';


function Navigation(){
  const pages = ['Home', 'Features', 'Pricing'];
  
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const themeToggler = () => {
    if(localStorage.getItem("theme") ==="light"){
      localStorage.setItem('theme', "dark");
    }
    else{
      localStorage.setItem('theme', "light");
    }
  }  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return(
    <AppBar position="static" color ="secondary">
    <Container maxWidth="xl">
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
          
        />Projekt23
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
          
        />Projekt23
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
          <Box sx={{ flexGrow: 0 }}>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box><Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <FormControlLabel control={<Switch   />} label="
          Darkmode" onClick={() => themeToggler()}/></Box>
          <Box sx={{ flexGrow: 4, display: { xs: 'none', md: 'flex' } }}>
          <TextField  fullWidth id="outlined-basic" label="Search..." variant="filled"  /></Box>
        <ThemeProvider backgroundColor = "white" theme={localStorage.getItem("theme") === "light" ? lightTheme : darkTheme }>
        
        </ThemeProvider>
        </Toolbar>
        </Container>
      </AppBar>
      
    
    )
  }

  export default Navigation;