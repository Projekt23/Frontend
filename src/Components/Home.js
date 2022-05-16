import React from "react"
import { Box } from "@mui/system"
import Greet from './HomeComponents/Greet';
import DidYouKnow from "./HomeComponents/DidYouKnow";
import Bookmarks from './HomeComponents/Bookmarks';
import ChangeHistory from './HomeComponents/ChangeHistory'
import { styled } from '@mui/material/styles';
import { Grid, Paper, Container, Typography, Divider } from "@mui/material";
import Button from '@mui/material/Button';
import History from './HomeComponents/History';


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
          <Item ><Greet /></Item>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                m: 1,
              }}>
              <Typography align='left' variant="h5" component="h3"> <b>Merkliste:</b> </Typography>
              <Button variant="contained">Alle anzeigen</Button>
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <Bookmarks />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                m: 1,
              }}>
              <Typography align='left' variant="h5" component="h3"> <b>Zuletzt angesehen:</b> </Typography>
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <History />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                m: 1,
              }}>
              <Typography align='left' variant="h5" component="h3"> <b>Änderungshistorie:</b> </Typography>
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <ChangeHistory /></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><DidYouKnow /></Item>
        </Grid>
      </Grid >
    </Container >
  )
}

//retrive UserData from Backend, save to local storage
async function getUserData() {
  //backend call
  //placeholer 
  var id = "1";

  const server = "http://88.214.57.111:8081/api";
  return fetch(server+'/user/'+id+'', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
  })
    .then(response => {
      response.text().then(value => {
          var responseJSON = JSON.parse(value);

          localStorage.setItem('username', responseJSON["username"]);
          localStorage.setItem('name', responseJSON["name"]);
          localStorage.setItem('email', responseJSON["email"]);

        }).catch(err => {
          console.log(err);
        });
    });


  //create dummy for userdata
  localStorage.setItem('UserName', "Ralf Gärtner");

  //read userdata example
  //const UserName = localStorage.getItem('UserName');
}