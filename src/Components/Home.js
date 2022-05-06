import React from "react"
import { Box } from "@mui/system"
import Greet from './HomeComponents/Greet';
import Bookmarks from './HomeComponents/Bookmarks';
import { styled } from '@mui/material/styles';
import { Grid, Paper, Container } from "@mui/material";


export default function Home() {

  getUserData();
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Container maxWidth="auto">
      <Grid mt={0} mb={2} container spacing={2}>
        <Grid item xs={12} >
          <Item><Greet/></Item>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item><Bookmarks/></Item>
        </Grid>
        <Grid item xs={6}>
          <Item>2</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Container>
  )
}

 //retrive UserData from Backend, save to local storage
 function getUserData() {
  //space for backend call

  //create dummy for userdata
  localStorage.setItem('UserName', "Ralf Gärtner");

  //read userdata example
  //const UserName = localStorage.getItem('UserName');
}