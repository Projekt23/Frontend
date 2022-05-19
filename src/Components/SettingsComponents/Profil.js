import React, {useEffect, useState } from "react" 
import { Box,sizing } from "@mui/system"
import { styled } from '@mui/material/styles';
import { Grid, Paper,  Typography, Divider, Button } from "@mui/material";
import SettingsNav from "./SettingsNav";
import { TextField } from "@mui/material";
import { isExpired, decodeToken } from "react-jwt";

export default function Profil() {
    const [username, setusername] = useState();
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
      };
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'primary' : 'primary',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'right',
        height: '1000px',
        width: '100%'
      }));

      getUser();
       
  return (
    
    <Box sx={{ m: 2}}>

        <Grid container rowSpacing={1}  columnSpacing={{ xs: 0, sm: 0, md: 0 }} >
            {/* Display SettingsNav only in Desktop Version */}
            <Grid  sx={{ minWidth: 200, display: {xs: 'none', md:'block'}}} item xs={1.5}>
                <SettingsNav />   
            </Grid>
            <Grid  item sx={{flexGrow: 2}} >
                <Item >
                <Typography align='left' variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>Profil </Typography>
                <Divider sx={{ borderBottomWidth: 3,  color: 'primary' }}/>
                <Grid container sx={{}} rowSpacing={1}  columnSpacing={{ xs: 0, sm: 0, md: 0 }} >
                    {/* Display only in Desktop Version */}
                    <Box sx={{mr: 33.2, marginTop: 4, flexGrow: 0, display: {xs: 'none', md:'block'}} }>
                        <Typography sx={{marginTop: 3}}align='left' variant="h6">Benutzername</Typography>
                        <Typography sx={{marginTop: 7}} align='left' variant="h6">E-Mail Adresse</Typography>
                        <Typography sx={{marginTop: 6}} align='left' variant="h6">Vorname</Typography>
                        <Typography sx={{marginTop: 6}} align='left' variant="h6">Nachname</Typography>
                    </Box>
                    <Box sx={{marginTop: 3, flexGrow: 0.5, alignSelf: "center"}}>
                        <TextField sx={{ marginTop: 3,  overflow: 'auto'}} fullWidth id="userName" label="Benutzername" variant="filled" defaultValue={username}></TextField><br/>
                        <TextField sx={{marginTop: 3,  overflow: 'auto'}} fullWidth id="email" label="E-Mail-Adresse" variant="filled" defaultValue={email}></TextField><br/>
                        <TextField sx={{marginTop: 3,  overflow: 'auto'}} fullWidth id="firstName" label="Vorname" variant="filled" defaultValue={name} ></TextField><br/>
                        <TextField sx={{marginTop: 3,  overflow: 'auto'}} fullWidth id="lastName" label="Nachname" variant="filled"></TextField><br/><br/>
                        <Button size= "small" variant="contained">Bearbeiten</Button>&nbsp;<Button size= "small" disabled variant="contained">Speichern</Button>
                    </Box>
                    
                    
                </Grid>
                <Box sx={{marginTop: 5}}>
                <Typography align='left' variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>Passwort ändern </Typography>
                <Divider sx={{  marginBottom: 2, borderBottomWidth: 3,  color: 'primary' }}/>
                <Grid container rowSpacing={1}  columnSpacing={{ xs: 0, sm: 0, md: 0 }} >
                    {/* Display only in Desktop Version */}
                    <Box sx={{mr: 20,alignItems: "center", marginTop: 3, flexGrow: 0, display: {xs: 'none', md:'block'}}}>
                            <Typography sx={{marginTop: 1}} align='left' variant="h6">Aktuelles Passwort</Typography>
                            <Typography sx={{marginTop: 5.5}} align='left' variant="h6">Neues Passwort</Typography>
                            <Typography sx={{marginTop: 6.5}} align='left' variant="h6">Neues Passwort bestätigen</Typography>
                    </Box>
                    <Box  sx={{alignItems: "center", marginTop: 2.5, flexGrow: 0.5}}>
                        <TextField  fullWidth id="email" variant="filled" type="password"></TextField><br/>
                        <TextField fullWidth sx={{marginTop: 3}}  id="email" variant="filled" type={passwordShown ? "text" : "password"}></TextField><br/>
                        <TextField fullWidth sx={{marginTop: 3}}  id="firstName" variant="filled" type="password"></TextField><br/><br/>
                        <Button  size= "small"  variant="contained">Speichern</Button>
                    </Box>
                    
                </Grid>
                </Box>
                </Item>
            </Grid>
        </Grid>
    </Box>
  );

  function getUser(){
    console.log(decodeToken(localStorage.getItem("userID")))
    var id = decodeToken(localStorage.getItem("userID")).id;

    const server = process.env.REACT_APP_API_BACKEND;
    fetch(server+'/user/'+id+'', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        })
        .then(response => {
        response.text().then(value => {
            var responseJSON = JSON.parse(value);
            
            setusername(responseJSON["username"]);
            setemail(responseJSON["email"]);
            setname(responseJSON["name"]);

            }).catch(err => {
            console.log(err);
            });
        });
    }
}
