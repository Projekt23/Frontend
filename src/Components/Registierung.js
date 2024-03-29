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
    const [saveUsername, setSaveUsername] = useState(false);
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
        window.addEventListener("resize", () => setWidth(window.innerWidth));
      }, []);


      //function to check what the window width is and depending on this set the styles
      function checkResponsive(){
        if(window.innerWidth > 1000){
        return paperStyle
        }
        else{
        return paperStyleMobile
        }
        }
        function checkToken(){
            console.log(window.location.hash)
            if(isExpired(window.location.hash) === false){
                return(
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
                    <TextField variant="standard" fullWidth style = {textfieldStyle} label='Benutzername * ' onChange={(event) => setUserName(event.target.value)}/>
                    <TextField variant="standard" fullWidth style = {textfieldStyle} label='Vorname' onChange={(event) => setFirstName(event.target.value)}/>
                    <TextField variant="standard" fullWidth style = {textfieldStyle} label='Nachname' onChange={(event) => setLastName(event.target.value)}/>
                    <TextField variant="standard" fullWidth style = {textfieldStyle} type="password" label='Passwort erstellen * ' placeholder='Passwort erstellen...' onChange={(event) => setPassword(event.target.value)}/>
                    <TextField variant="standard" fullWidth style = {textfieldStyle} type="password" label='Passwort wiederholen *' placeholder='Passwort wiederholen...' onChange={(event) => setConfirmPassword(event.target.value)}/>
                    <FormControlLabel control={<Checkbox size="small" onChange={(event) => {setSaveUsername(event.target.checked)}}/>} label="Benutzername merken"/>
                    
                    
                </Grid>
                <Typography id="errorTxt" color="red">{" "}</Typography>
                <Grid item style={divloginbtn}>
                    <ColorButton sx={{bgcolor: '#004ea5'}} type="submit" variant="contained" fullWidth onClick={postRegister}>Registrieren</ColorButton>
                    <div style={linksStyle}>
                        <Typography variant="caption">
                            <Link component="button" onClick={()=> navigate("/login")}> Zum Login wechseln</Link>
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Card>)
        }
        else if(window.location.hash === ""){
            return(
                <Card style={{padding : 20, width: "25%", margin: "80px auto", textAlign: 'center'}}>
                    <Typography>Sie benötigen eine Einladung</Typography>
                    <Typography variant="caption">
                        <Link component="button" onClick={()=> navigate("/login")}> Zum Login wechseln</Link>
                    </Typography>
                </Card>
            )
        }
        else{
            return(
            <Card style={{padding : 20, width: "25%", margin: "80px auto", textAlign: 'center'}}>
                    <Typography>Der Token ist ungültig</Typography>
                    <Typography variant="caption">
                        <Link component="button" onClick={()=> navigate("/login")}> Zum Login wechseln</Link>
                    </Typography>
                </Card>)
        }
    }
    function checkSaveUsername(){
            
        return !(localStorage.getItem("userName") === null || localStorage.getItem("userName") === "");
    }
    function postRegister(){
        var registerBody;
        //check that the userToken is not expired and is correct
        if(isExpired(window.location.hash) === false){
        if(firstName !== "" && lastName !== "" && userName !== "" && password !=="" && password === confirmPassword){
        var myDecodedToken = decodeToken(window.location.hash);
        console.log(myDecodedToken["email"])

        registerBody = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "username": userName,
            "password": password,
            "email": myDecodedToken["email"]
        })
    //POST for the Register
    const server = process.env.REACT_APP_API_BACKEND;
    fetch(server+'/auth/register/' , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        body: registerBody
        })
        .then(response => {
        response.text().then(value => {
            if(response.status === 200){
                //if it was successfull, log the user in
                setUserID(value)
                localStorage.setItem("userID", value)
                navigate("/startseite")
                if(saveUsername === true){
                    //if the user wants to save the username, save it in the localStorage
                    localStorage.setItem("userName", userName)
                }
                else{
                    localStorage.removeItem("userName")
                }
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
            document.getElementById("errorTxt").innerHTML = "Der Token ist bereits abgelaufen!"
        }
    }

        const navigate = useNavigate();


    return(
        <>
        {checkToken()}
       
        
    </>
    )
}

export default Registierung