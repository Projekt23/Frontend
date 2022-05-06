import React from 'react'
import { Grid } from '@material-ui/core'
import {Card, Checkbox, FormControlLabel, Link, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {purple} from "@mui/material/colors";
import { styled } from '@mui/material/styles';


const Registierung= () => {
    const gridStyle = {height : "100%", width: "100%"}
    const paperStyle = {padding : 20, height: '65vh', width: "25vw", margin: "80px auto"}
    const logoStyle = {display:"flex", justifyContent:"center", alignItems:"center",}
    const textfieldStyle = {margin: "5px"}
    const divloginbtn = {width: "100%", display:"flex", alignItems:"center", flexDirection:"column",}
    const linksStyle = {display:"flex", justifyContent:"space-between", width: "100%"}
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
        marginBottom: "15px"
    }));

    return(
        <Card style={paperStyle}>
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
                    <TextField variant="standard" fullWidth style = {textfieldStyle} label='Benutzername' placeholder='Enter Username ...'/>
                    <TextField variant="standard" fullWidth style = {textfieldStyle} type="password" label='Passwort' placeholder='Enter Password ...'/>
                    <TextField variant="standard" fullWidth style = {textfieldStyle} type="password" label='Passwort wiederholen' placeholder='Confirm Password ...'/>
                    <FormControlLabel control={<Checkbox size="small"/>} label="Benutzername merken"/>
                </Grid>
                <Grid item style={divloginbtn}>
                    <ColorButton type="submit" color="primary" variant="contained" fullWidth>Login</ColorButton>
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
    )
}

export default Registierung