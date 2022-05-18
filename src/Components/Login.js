import React, { useState } from 'react'
import {Grid} from '@material-ui/core'
import {Card, Checkbox, FormControlLabel, Link, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {purple} from "@mui/material/colors";
import {styled} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";


const Login = ({setUserID}) => {
    const [userName, setUserName] = useState(localStorage.getItem("userName"));
    const [password, setPassword] = useState("");
    const [saveUsername, setSaveUsername] = useState(false);
    const gridStyle = {height: "100%", width: "100%"}
    const paperStyle = {padding: 20, height: '65vh', width: "25vw", margin: "80px auto"}
    const logoStyle = {display: "flex", justifyContent: "center", alignItems: "center",}
    const textfieldStyle = {margin: "5px"}
    const divloginbtn = {width: "100%", display: "flex", alignItems: "center", flexDirection: "column",}
    const loginbtn = {marginBottom: "15px"}
    const linksStyle = {display: "flex", justifyContent: "space-between", width: "100%"}
    const ColorButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
        marginBottom: "15px"
    }));

    function postLogin(){
        var loginMethod;
        var loginBody;
        if(userName.includes("@") && userName.includes(".")){
            loginMethod = "mail"
            loginBody = JSON.stringify({
                "email": userName,
                "password": password
            })
        }
        else{
            loginMethod = "user"
            loginBody = JSON.stringify({
                "username": userName,
                "password": password
            })
        }
    
        const server = process.env.REACT_APP_API_BACKEND;
        fetch(server+'/auth/login/' + loginMethod, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
            body: loginBody
            })
            .then(response => {
            response.text().then(value => {
                console.log(value)
                if(response.status === 200){
                    setUserID(value)
                    localStorage.setItem("userID", value)
                    if(saveUsername === true){
                        localStorage.setItem("userName", userName)
                    }
                    else{
                        localStorage.removeItem("userName")
                    }
                    navigate("/startseite")
                }
                
                }).catch(err => {
                console.log(err);
                });
            });
        }
        
    const navigate = useNavigate();
        
    return (
        <Card style={paperStyle}>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                style={gridStyle}
            >
                <Grid item direction="row" alignContent="center">
                    <div style={logoStyle}>
                        <img src="logo-lila.png" alt="logo" width="50px" height="50px"/>
                        <Typography variant="h4" paddingLeft="5px">Projekt 23</Typography>
                    </div>
                </Grid>
                <Grid item>
                    <Typography variant="h5" secondary>Anmeldung</Typography>
                    <TextField variant="standard" fullWidth style={textfieldStyle} label='username' defaultValue={localStorage.getItem("userName")}
                               placeholder='Enter Username ...' onChange={(event) => setUserName(event.target.value)}/>
                    <TextField variant="standard" fullWidth style={textfieldStyle} type="password" label='password'
                               placeholder='Enter Password ...' onChange={(event) => setPassword(event.target.value)}/>
                    <FormControlLabel control={<Checkbox onChange={(event) => {setSaveUsername(event.target.checked)}} size="small"/>} label="Benutzername merken"/>
                </Grid>
                <Grid item style={divloginbtn}>
                    <Button
                        type="submit"
                        //color="primary"
                        variant="contained"
                        fullWidth
                        onClick={() => postLogin(userName, password)}
                        style={loginbtn}
                    >
                        Login
                    </Button>
                    <div style={linksStyle}>
                        <Typography variant="caption">
                            <Link href="#">Passwort vergessen?</Link>
                        </Typography>
                        <Typography variant="caption">
                            Neu hier?
                            <Link href="/register"> Anmeldelink anfordern</Link>
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Login