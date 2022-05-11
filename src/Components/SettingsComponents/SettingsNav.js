import React from "react" 
import { Box,sizing } from "@mui/system"
import { styled } from '@mui/material/styles';
import { Grid, Paper, Card, Container, Typography, Divider } from "@mui/material";

import {Link} from 'react-router-dom';
import {ListItem, ListItemText, ListItemButton} from "@mui/material"
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
export default function SettingsNav() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'primary' : 'primary',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '100%'
      }));
return(
<Item  sx={{backgroundColor: '#004ea5', color: 'white', flexGrow: 1, display: {xs: 'none', md:'block'}}}>
                    
    <Typography color="white" align='left' variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>&nbsp; Einstellungen </Typography>
    <Divider sx={{  marginBottom: 2, borderBottomWidth: 3,  color: 'white' }}/>
        
    <ListItemButton component={Link} to="/profile">
        <ManageAccountsIcon />&nbsp;<ListItemText  primary="Profil verwalten" />
    </ListItemButton>
    <ListItemButton component={Link} to="/invite">
        <PersonAddAlt1Icon/>&nbsp;<ListItemText  primary="Nutzer einladen" />
    </ListItemButton>

</Item>
)
}
