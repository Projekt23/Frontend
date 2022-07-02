import React, {useEffect, useState } from "react" 
import { Box,sizing } from "@mui/system"
import { styled } from '@mui/material/styles';
import { Grid, Paper,  Typography, Divider, Button } from "@mui/material";
import SettingsNav from "./SettingsNav";
import { TextField } from "@mui/material";
import { isExpired, decodeToken } from "react-jwt";

export default function Profil({password, setPassword}) {
    const [username, setusername] = useState();
    const [edit, setEdit] = useState(true);
    const [confirmPwdError, setConfirmPwdError] = useState("");
    const [currentPwdError, setCurrentPwdError] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const[buttonTxt, setButtonTxt] = useState("Bearbeiten")
    const [buttonColor, setButtonColor] = useState("");
    const [hoverColor, setHoverColor] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setemail] = useState();
    const [passwordShown, setPasswordShown] = useState(false);
    const server = process.env.REACT_APP_API_BACKEND;
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'primary' : 'primary',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'right',
        height: '1000px',
        width: '100%'
      }));


      const editToggle = () => {
        if(edit === false){
            setEdit(true);
            setButtonColor("")
            setHoverColor("")
            setButtonTxt("Bearbeiten")
        }
        else{
            setButtonColor("red")
            setHoverColor("#f44336")
            setButtonTxt("Abbrechen")
            setEdit(false);
        }
        }  
     useEffect(() => {
        getUser();
     }, [])
     
     
    //function to edit the user data (REST API PUT)
    function postSaveUserData(userName, email, firstName, lastName){

        
        var id = decodeToken(localStorage.getItem("userID")).id;
        fetch(server + '/user/'+id+'', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "username": userName,
            "password":password,
            "email": email
        })
        })
        .then(response => {
        response.text().then(value => {
            getUser();
            setEdit(true);
            setButtonColor("")
            setHoverColor("")
            setButtonTxt("Bearbeiten")
            }).catch(err => {
            console.log(err);
            });
        });
        
    }

    //function to edit the password (REST API PUT)
    function postSavePwd(currentPwd, pwd, confirmPwd, userName, email, firstName, lastName){

        if(currentPwd ===  password && pwd === confirmPwd){
        var id = decodeToken(localStorage.getItem("userID")).id;
        fetch(server + '/user/'+id+'', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "username": userName,
            "password":pwd ,
            "email": email
        })
        })
        .then(response => {
        response.text().then(value => {
            setEdit(true);
            setButtonColor("")
            setHoverColor("")
            setButtonTxt("Bearbeiten")
            setCurrentPwdError("")
            setConfirmPwdError("")
            setPassword(pwd)
            reLogin(pwd, userName)
            }).catch(err => {
            console.log(err);
            });
        });
    }
    else if(currentPwd !== password){
        setConfirmPwdError("")
        setCurrentPwdError("red")
    }
    else if(pwd !== confirmPwd){
        setCurrentPwdError("")
        setConfirmPwdError("red")
    }
}
    
    //function to get the current userData of the user logged in
  function getUser(){
    var id = decodeToken(localStorage.getItem("userID")).id;

    
    fetch(server+'/user/'+id+'', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        })
        .then(response => {
        response.text().then(value => {
            var responseJSON = JSON.parse(value);
            console.log(responseJSON)
            setusername(responseJSON["username"]);
            setemail(responseJSON["email"]);
            setFirstName(responseJSON["firstName"]);
            setLastName(responseJSON["lastName"]);
            setCurrentPassword(responseJSON["password"])
            }).catch(err => {
            console.log(err);
            });
        });
    }

    //function to relogin the user, if the username or the password is edited
    function reLogin(pwd, userName){
        fetch(server + '/auth/login/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
            body: JSON.stringify({
                "username": userName,
                "password":pwd ,
            })
            })
            .then(response => {
            response.text().then(value => {
                    localStorage.setItem("userID", value)
                    getUser()
                }).catch(err => {
                console.log(err);
                });
            });
    }


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
                        {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                        {/* Display only in Desktop Version */}
                        <Box sx={{mr: 33.2, marginTop: 4, flexGrow: 0, display: {xs: 'none', md:'block'}} }>
                            <Typography sx={{marginTop: 3}}align='left' variant="h6">Benutzername *</Typography>
                            <Typography sx={{marginTop: 7}} align='left' variant="h6">E-Mail Adresse *</Typography>
                            <Typography sx={{marginTop: 6}} align='left' variant="h6">Vorname</Typography>
                            <Typography sx={{marginTop: 6}} align='left' variant="h6">Nachname</Typography>
                        </Box>
                        {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                        <Box sx={{marginTop: 3, flexGrow: 0.5, alignSelf: "center"}}>
                            <TextField sx={{ marginTop: 3,  overflow: 'auto'}} disabled = {edit} fullWidth id="userName" label="Benutzername" variant="filled" defaultValue={username}></TextField><br/>
                            <TextField sx={{marginTop: 3,  overflow: 'auto'}} disabled= {edit} fullWidth id="email" label="E-Mail-Adresse" variant="filled" defaultValue={email}></TextField><br/>
                            <TextField sx={{marginTop: 3,  overflow: 'auto'}} disabled={edit} fullWidth id="firstName" label="Vorname" variant="filled" defaultValue={firstName} ></TextField><br/>
                            <TextField sx={{marginTop: 3,  overflow: 'auto'}} disabled={edit} fullWidth id="lastName" label="Nachname" variant="filled" defaultValue={lastName} ></TextField><br/><br/>
                            <Button sx={{bgcolor: buttonColor, '&:hover': {backgroundColor: hoverColor}}} id="editBtn" size= "small" variant="contained"onClick= {() => {editToggle()}}>{buttonTxt}</Button>&nbsp;<Button size= "small" disabled={edit} onClick={() => {postSaveUserData(document.getElementById("userName").value, document.getElementById("email").value, document.getElementById("firstName").value, document.getElementById("lastName").value)}} variant="contained">Speichern</Button>
                        </Box>
                        
                        
                    </Grid>
                    <Box sx={{marginTop: 5}}>
                    <Typography align='left' variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>Passwort ändern </Typography>
                    <Divider sx={{  marginBottom: 2, borderBottomWidth: 3,  color: 'primary' }}/>
                    <Grid container rowSpacing={1}  columnSpacing={{ xs: 0, sm: 0, md: 0 }} >
                        {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                        {/* Display only in Desktop Version */}
                        <Box sx={{mr: 20,alignItems: "center", marginTop: 3, flexGrow: 0, display: {xs: 'none', md:'block'}}}>
                                <Typography sx={{color: currentPwdError, marginTop: 1}} align='left' variant="h6">Aktuelles Passwort</Typography>
                                <Typography sx={{marginTop: 5.5}} align='left' variant="h6">Neues Passwort</Typography>
                                <Typography sx={{color: confirmPwdError,marginTop: 6.5}} align='left' variant="h6">Neues Passwort bestätigen</Typography>
                        </Box>
                        {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                        <Box  sx={{alignItems: "center", marginTop: 2.5, flexGrow: 0.5}}>
                            <TextField  fullWidth id="currentPwd" variant="filled" type="password"></TextField><br/>
                            <TextField fullWidth sx={{marginTop: 3}} id="newPwd" variant="filled" type={passwordShown ? "text" : "password"}></TextField><br/>
                            <TextField sx={{ marginTop: 3}} fullWidth  id="confirmPwd" variant="filled" type="password"></TextField><br/><br/>
                            <Button  size= "small" onClick={() => {postSavePwd(document.getElementById("currentPwd").value,document.getElementById("newPwd").value,document.getElementById("confirmPwd").value, document.getElementById("userName").value, document.getElementById("email").value, document.getElementById("firstName").value, document.getElementById("lastName").value)}} variant="contained">Speichern</Button>
                        </Box>
    
                    </Grid>
                    </Box>
                    </Item>
                </Grid>
            </Grid>
        </Box>
      );
}
