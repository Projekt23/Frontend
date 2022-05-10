import React from "react" 
import { Box,sizing } from "@mui/system"
import { styled } from '@mui/material/styles';
import { Grid, Paper, Card, Container, Typography, Divider, Button } from "@mui/material";
import {ListItem, ListItemText, ListItemButton} from "@mui/material"
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Invite from "./Invite";
import SettingsNav from "./SettingsNav";
import { TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Profil() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'primary' : 'primary',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '450%'
      }));
     
  return (
    
    <Box sx={{ m: 2}}>

        <Grid container rowSpacing={1}  columnSpacing={{ xs: 0, sm: 0, md: 0 }} >
            <Grid  sx={{ml: 2, display: {xs: 'none', md:'block'}}} item xs={1.5}>
                <SettingsNav />   
            </Grid>
            <Grid item xs={10} maxWidth>
                <Item>
                <Typography align='left' variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>Profil </Typography>
                <Divider sx={{  marginBottom: 2, borderBottomWidth: 3,  color: 'primary' }}/>
                <Grid container rowSpacing={1}  columnSpacing={{ xs: 0, sm: 0, md: 0 }} >
                    <Box sx={{mr: 15, marginTop: 3, flexGrow: 0, display: {xs: 'none', md:'block'}} }>
                        <Typography align='left' variant="h6">Benutzername</Typography>
                        <Typography sx={{marginTop: 2.5}} align='left' variant="h6">E-Mail Adresse</Typography>
                        <Typography sx={{marginTop: 2.5}} align='left' variant="h6">Vorname</Typography>
                        <Typography sx={{marginTop: 2.5}} align='left' variant="h6">Nachname</Typography>
                    </Box>
                    <Box sx={{marginTop: 3, ml: 14, flexGrow: 0.3, display: {xs: 'none', md:'block'}}}>
                        <Typography align='left' variant="h6">Benutzername</Typography>
                        <TextField fullWidth id="email" label="E-Mail-Adresse" variant="standard"></TextField><br/>
                        <TextField fullWidth id="firstName" label="Vorname" variant="standard" ></TextField><br/>
                        <TextField fullWidth id="lastName" label="Nachname" variant="standard"></TextField><br/><br/>
                        <Button size= "small" variant="contained">Bearbeiten</Button>&nbsp;<Button size= "small" disabled variant="contained">Speichern</Button>
                    </Box>
                    <Box sx={{marginTop: 3, flexGrow: 0.3, display: { md: 'none'}}}>
                        <Typography align='left' variant="h6">Benutzername</Typography>
                        <TextField fullWidth id="email" label="E-Mail-Adresse" variant="standard"></TextField><br/>
                        <TextField fullWidth id="firstName" label="Vorname" variant="standard" ></TextField><br/>
                        <TextField fullWidth id="lastName" label="Nachname" variant="standard"></TextField><br/><br/>
                        <Button size= "small" variant="contained">Bearbeiten</Button>&nbsp;<Button size= "small" disabled variant="contained">Speichern</Button>
                    </Box>
                    
                </Grid>
                <Box sx={{marginTop: 5}}>
                <Typography align='left' variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>Passwort ändern </Typography>
                <Divider sx={{  marginBottom: 2, borderBottomWidth: 3,  color: 'primary' }}/>
                <Grid container rowSpacing={1}  columnSpacing={{ xs: 0, sm: 0, md: 0 }} >
                    <Box sx={{mr: 15, marginTop: 3, flexGrow: 0, display: {xs: 'none', md:'block'}}}>
                            <Typography align='left' variant="h6">Aktuelles Passwort</Typography>
                            <Typography sx={{marginTop: 2.5}} align='left' variant="h6">Neues Passwort</Typography>
                            <Typography sx={{marginTop: 2.5}} align='left' variant="h6">Neues Passwort bestätigen</Typography>
                    </Box>
                    <Box  sx={{marginTop: 2.5, flexGrow: 0.3, display: {xs: 'none', md:'block'}}}>
                        <TextField fullWidth id="email" variant="standard" type="password"></TextField><br/>
                        <TextField sx={{marginTop: 2.5}} fullWidth id="email"  variant="standard" type="password"></TextField><br/>
                        <TextField sx={{marginTop: 2.5}} fullWidth id="firstName" variant="standard" type="password"></TextField><br/><br/>
                        <Button  size= "small"  variant="contained">Speichern</Button>
                    </Box>
                    <Box  sx={{marginTop: 2.5, flexGrow: 0.3, display: {md: 'none'}}}>
                        <TextField fullWidth label="Aktuelles Passwort" id="email" variant="standard" type="password"></TextField><br/>
                        <TextField sx={{marginTop: 2.5}} label="Neues Passwort" fullWidth id="email"  variant="standard" type="password"></TextField><br/>
                        <TextField sx={{marginTop: 2.5}} label="Neues Passwort bestätigen" fullWidth id="firstName" variant="standard" type="password"></TextField><br/><br/>
                        <Button  size= "small"  variant="contained">Speichern</Button>
                    </Box>
                </Grid>
                </Box>
                </Item>
            </Grid>
        </Grid>
    </Box>
  );
}