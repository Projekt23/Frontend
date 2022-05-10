import React from "react" 
import { Box,sizing } from "@mui/system"
import { styled } from '@mui/material/styles';
import { Grid, Paper, Card, Container, Typography, Divider } from "@mui/material";
import {ListItem, ListItemText, ListItemButton} from "@mui/material"
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Invite from "./Invite";
import SettingsNav from "./SettingsNav";

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
            <Grid  sx={{ml: 2}} item xs={1.5}>
                
                <SettingsNav />
                    
                
            </Grid>
            <Grid item xs={10} maxWidth>
                <Item ></Item>
            </Grid>
        </Grid>
    </Box>
  );
}