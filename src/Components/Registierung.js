import React, {useState} from 'react'
import { Grid } from '@material-ui/core'
import {Card, Checkbox, Dialog, FormControlLabel, Link, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {purple} from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

const Registierung= ({setUserID}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [width, setWidth] = React.useState(window.innerWidth);
    const gridStyle = {height : "100%", width: "100%"}
    const paperStyle = {padding : 20, height: '65vh', width: "25%", margin: "80px auto"}
    const paperStyleMobile = {padding: 20, height: '65vh', width: "80%", margin: "80px auto"}
    const logoStyle = {display:"flex", justifyContent:"center", alignItems:"center",}
    const textfieldStyle = {margin: "5px"}
    const divloginbtn = {width: "100%", display:"flex", alignItems:"center", flexDirection:"column",}
    const linksStyle = {display:"flex", justifyContent:"space-between", width: "100%"}
    const ColorButton = styled(Button)(({ theme }) => ({
        marginBottom: "15px"
    }));
    React.useEffect(() => {
        /* Inside of a "useEffect" hook add an event listener that updates
           the "width" state variable when the window size changes */
        window.addEventListener("resize", () => setWidth(window.innerWidth));
      }, []);

      function checkResponsive(){
        if(window.innerWidth > 1000){
        return paperStyle
        }
        else{
        return paperStyleMobile
        }
        }

    function postRegister(){
        var registerBody;
        
        if(isExpired(window.location.hash) === false){
        if(userName !== "" && password !=="" && password === confirmPassword){
        var myDecodedToken = decodeToken(window.location.hash);
        console.log(myDecodedToken["email"])

        registerBody = JSON.stringify({
            "username": userName,
            "password": password,
            "name": myDecodedToken["email"],
            "email": myDecodedToken["email"]
        })
    
    const server = process.env.REACT_APP_API_BACKEND;
    fetch(server+'/auth/register/' , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        body: registerBody
        })
        .then(response => {
        response.text().then(value => {
            if(response.status === 200){
                setUserID(value)
                localStorage.setItem("userID", value)
                navigate("/startseite")
            }
            
            }).catch(err => {
            console.log(err);
            });
        });
    
    }
    else if(password !== confirmPassword){
        document.getElementById("errorTxt").innerHTML = "Passwort stimmt nicht überein!"
    }
    else{
        document.getElementById("errorTxt").innerHTML = "Es muss alles ausgefüllt sein!"
    }
    
    }
        else{
            document.getElementById("errorTxt").innerHTML = "Etwas ist schief gelaufen!"
        }
    }

        const navigate = useNavigate();


    return(
        <>
        <Card style={checkResponsive()}>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                style={gridStyle}
            >
                <Grid item direction="row" alignContent="center" >
                    <div style={logoStyle}>
                        <img src="logo-lila.png" alt="logo" width="50px" height="50px"/>
                        <Typography variant="h4" paddingLeft="5px">Projekt 23</Typography>
                    </div>
                </Grid>
                <Grid item>
                    <Typography variant="h5" secondary>Registrierung</Typography>
                    <TextField variant="standard" fullWidth style = {textfieldStyle} label='Benutzername' onChange={(event) => setUserName(event.target.value)} placeholder='Enter Username ...'/>
                    <TextField variant="standard" fullWidth style = {textfieldStyle} type="password" label='Passwort' placeholder='Enter Password ...' onChange={(event) => setPassword(event.target.value)}/>
                    <TextField variant="standard" fullWidth style = {textfieldStyle} type="password" label='Passwort wiederholen' placeholder='Confirm Password ...' onChange={(event) => setConfirmPassword(event.target.value)}/>
                    <FormControlLabel control={<Checkbox size="small"/>} label="Benutzername merken"/>
                    
                    
                </Grid>
                <Typography id="errorTxt" color="red">{" "}</Typography>
                <Grid item style={divloginbtn}>
                    <ColorButton sx={{bgcolor: '#004ea5'}} type="submit" variant="contained" fullWidth onClick={postRegister}>Login</ColorButton>
                    <div style={linksStyle}>
                        <Typography variant="caption">
                            <Link href="#">Passwort vergessen?</Link>
                        </Typography>
                        <Typography variant="caption">
                            <Link href="/login"> Zum Login wechseln</Link>
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Card>
        
    </>
    )
}

export default Registierung