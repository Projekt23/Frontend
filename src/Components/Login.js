import React, { useState } from 'react'
import {Grid} from '@material-ui/core'
import {Card, Checkbox, FormControlLabel, Link, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {purple, red} from "@mui/material/colors";
import {styled} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import { Box } from '@mui/system';

const Login = ({setUserID, password, setPassword}) => {
    const [userName, setUserName] = useState(localStorage.getItem("userName"));
    
    const [saveUsername, setSaveUsername] = useState(false);
    const gridStyle = {height: "100%", width: "100%"}
    const paperStyle = {padding: 20, height: '65vh', width: "25%", margin: "80px auto"}
    const paperStyleMobile = {padding: 20, height: '65vh', width: "50%", margin: "80px auto"}
    const logoStyle = {display: "flex", justifyContent: "center", alignItems: "center",}
    const textfieldStyle = {margin: "5px"}
    const divloginbtn = {width: "100%", alignItems: "center", flexDirection: "column",}
    const loginbtn = {marginBottom: "15px"}
    const linksStyle = {display: "flex", justifyContent: "space-between", width: "100%"}
    const [ERROR, setERROR] = useState(" ");
    const [width, setWidth] = React.useState(window.innerWidth);

    function setPasswordF(pwd){
        setPassword(pwd)
    }


    function checkResponsive(){
        if(window.innerWidth > 1590){
        return paperStyle
        }
        else{
        return paperStyleMobile
        }
        }
        React.useEffect(() => {
            /* Inside of a "useEffect" hook add an event listener that updates
               the "width" state variable when the window size changes */
            window.addEventListener("resize", () => setWidth(window.innerWidth));
          }, []);
    function postLogin(){
        var loginMethod;
        var loginBody;
        
        if(userName !== "" && password !== ""){
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
                        if(saveUsername === true ){
                            
                            localStorage.setItem("userName", userName)
                        }
                        else{
                            localStorage.removeItem("userName")
                        }
                        navigate("/startseite")
                    }
                    else if(response.status === 403){
                        setERROR("Passwort fehlerhaft")
                    }
                    else if(response.status === 404 && loginMethod === "user"){
                        setERROR("Benutzername fehlerhaft")
                    }
                    else if(response.status === 404 && loginMethod === "mail"){
                        setERROR("Email-Adresse fehlerhaft")
                    }
                    }).catch(err => {
                    console.log(err);
                    });
                });
            }
        }
        function checkSaveUsername(){
            
            return !(localStorage.getItem("userName") === null || localStorage.getItem("userName") === "");
        }
    const navigate = useNavigate();
        
    return (
        <div style={{ width: '100vw',
        height: '100vh', backgroundImage: "url(background.png)", backgroundRepeat: 'no-repeat', backgroundPosition:"center", backgroundSize:"100%"}}>
        <Card style={checkResponsive()} sx={{display: {xs: 'none', md: 'flex'}}} >
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                style={gridStyle}
            >
                <Grid item direction="row" alignContent="center">
                    <div style={logoStyle}>
                        <img src="logo-lila.png" alt="logo" width="50px" h
                        eight="50px"/>
                        <Typography variant="h4" paddingLeft="5px">Projekt 23</Typography>
                    </div>
                </Grid>
                <Grid item >
                    <Typography variant="h5" secondary>Anmeldung </Typography>
                    
                    <TextField
                        variant="standard"
                        fullWidth style={textfieldStyle}
                        label='Benutzername oder Email *'
                        defaultValue={localStorage.getItem("userName")}
                        placeholder='Benutzername oder Email eingeben ...'
                        onChange={(event) => setUserName(event.target.value)}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                postLogin(userName, password)
                            }
                          }}
                    />
                    <TextField
                        variant="standard"
                        fullWidth style={textfieldStyle}
                        type="password"
                        label='Passwort *'
                        placeholder='Passwort eingeben ...'
                        onChange={(event) => setPasswordF(event.target.value)}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                postLogin(userName, password)
                            }
                          }}
                    />
                    <FormControlLabel
                        control={<Checkbox defaultChecked={checkSaveUsername()}
                        onChange={(event) => {setSaveUsername(event.target.checked)}} size="small"/>} label="Benutzername oder Email merken" 
                    ></FormControlLabel><Typography  variant="caption">* Pflichtfeld </Typography><Typography color = "red" >{ERROR}</Typography>
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
                            <Link>Passwort vergessen?</Link>
                        </Typography>
                        
                        <Typography variant="caption">
                            Neu hier?
                            <Link> Anmeldelink anfordern</Link>
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Card>

        <Card style={{padding: 20, height: '65vh', width: "75%", margin: "80px auto"}} sx={{display: {xs: 'flex', md: 'none'}}} >
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                style={gridStyle}
            >
                <Grid item direction="row" alignContent="center">
                    <div style={logoStyle}>
                        <img src="logo-lila.png" alt="logo" width="50px" h
                        eight="50px"/>
                    </div>
                </Grid>
                <Grid item >
                    <Typography variant="h5" secondary>Anmeldung </Typography>
                    
                    <TextField
                        variant="standard"
                        fullWidth style={textfieldStyle}
                        label='Benutzername oder Email *'
                        defaultValue={localStorage.getItem("userName")}
                        placeholder='Benutzername oder Email eingeben ...'
                        onChange={(event) => setUserName(event.target.value)}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                postLogin(userName, password)
                            }
                          }}
                    />
                    <TextField
                        variant="standard"
                        fullWidth style={textfieldStyle}
                        type="password"
                        label='Passwort *'
                        placeholder='Passwort eingeben ...'
                        onChange={(event) => setPasswordF(event.target.value)}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                postLogin(userName, password)
                            }
                          }}
                    />
                    <FormControlLabel
                        control={<Checkbox defaultChecked={checkSaveUsername()}
                        onChange={(event) => {setSaveUsername(event.target.checked)}} size="small"/>} label="Nutzer merken" 
                    > </FormControlLabel><Typography  variant="caption">* Pflichtfeld </Typography><Typography color = "red" >{ERROR}</Typography>
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
                    
                        
                        
                        

                </Grid>
                <Typography variant="caption">
                            <Link>Passwort vergessen?</Link>
                        </Typography>
                <Typography variant="caption">
                            Neu hier?
                <Link> Anmeldelink anfordern</Link>
            </Typography>
            </Grid>
        </Card>
         </div>
        
    )
}

export default Login