import React from 'react'
import { Grid } from '@material-ui/core'
import {Checkbox, FormControlLabel, Link, Paper, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {purple} from "@mui/material/colors";
import { styled } from '@mui/material/styles';

const Login= () => {

    const gridStyle = {display: 'block', marginLeft: 'auto', marginRight: 'auto'}
    const paperStyle = {padding : 20, height: '70vh', width: "25vw", margin: "20px auto"}
    const logoStyle = {display:"flex", justifyContent:"center",}
    const textfieldStyle = {margin: "5px"}
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
        marginTop: '30px',
        marginBottom: '170px'
    }));

    return(
       <Grid container style={gridStyle}>
           <Paper elevation={10} style={paperStyle}>
                <Grid item align="center">
                   <div style = {logoStyle}>
                       <img src="logo-lila.png" alt="logo" width="30" height="30"/>
                       <Typography variant="h5">Projekt 23</Typography>
                   </div>
                </Grid>
               <Grid item>
                   <TextField variant="standard" fullWidth style = {textfieldStyle} label='username' placeholder='Enter Username ...'/>
                   <TextField variant="standard" fullWidth style = {textfieldStyle} type="password" label='password' placeholder='Enter Password ...'/>
               </Grid>
               <Grid item>
                   <FormControlLabel control={<Checkbox size="small"/>} label="Benutzername merken"/>
               </Grid>
               <Grid item>
                   <ColorButton type="submit" color="primary" variant="contained" fullWidth>Login</ColorButton>
               </Grid>
               <Grid item align="center">
                   <Typography variant="caption">
                       <Link href="#">Passwort vergessen?</Link>
                   </Typography>
                   <br />
                   <Typography variant="caption">
                       Neu hier?
                       <Link href="#"> Anmeldelink anfordern</Link>
                   </Typography>
               </Grid>
           </Paper>
       </Grid>
    )
}

export default Login