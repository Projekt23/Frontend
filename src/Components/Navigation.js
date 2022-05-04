import { Navbar, Nav, FormControl } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import styled, { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme, GlobalStyles} from "./themes.js";
import React, { useState } from 'react';

const StyledApp = styled.div``;

export default function Navigation(){
  
  
  const themeToggler = () => {
    localStorage.getItem("theme") ==="light" ? localStorage.setItem('theme', "dark") : localStorage.setItem('theme', "light");
  }  

  return(
   
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
        <img
          src="logo-lila.png"
          width="30"
          height="30"
          
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        <Navbar.Brand href="#home">Projekt23</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="features">Features</Nav.Link>
          <Nav.Link href="pricing">Pricing</Nav.Link>
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
        <ThemeProvider theme={localStorage.getItem("theme") === "light" ? lightTheme : darkTheme }>
        <GlobalStyles />
        <StyledApp><button onClick={() => themeToggler()}>Change theme</button></StyledApp>
        </ThemeProvider>
        </Nav>
        </Container>
      </Navbar>
    </>
    )
  }