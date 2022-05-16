import React from "react" 
import { Box,sizing } from "@mui/system"
import { styled } from '@mui/material/styles';
import { Grid, Paper,  Typography, Divider, Button } from "@mui/material";
import SettingsNav from "./SettingsNav";
import { TextField } from "@mui/material";

export default function Invite() {
    var theme;
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'primary' : 'primary',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'right',
        height: '1000px',
        width: '100%'
      }));

  return (
    
    <Box sx={{ m: 2}}>

        <Grid container rowSpacing={1}  columnSpacing={{ xs: 0, sm: 0, md: 0 }} >
            {/* Display SettingsNav only in Desktop Version */}
            <Grid  sx={{ minWidth: 200, display: {xs: 'none', md:'block'}}} item xs={1.5}>
                <SettingsNav />   
            </Grid>
            <Grid item sx={{flexGrow: 2}}  >
                <Item >
                <Typography align='left' variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>Nutzer einladen </Typography>
                <Divider sx={{  marginBottom: 2, borderBottomWidth: 3,  color: 'primary' }}/>
                <Grid container rowSpacing={1}  columnSpacing={{ xs: 0, sm: 0, md: 0 }} >
                    {/* Display only in Desktop Version */}
                    <Box sx={{marginTop: 4, mr: 15, flexGrow: 0, display: {xs: 'none', md:'block'}} }>
                        <Typography  align='left' variant="h6">E-Mail Adresse</Typography>
                    </Box>
                    <Box sx={{marginTop: 3, ml: 14, flexGrow: 0.3, display: {xs: 'none', md:'block'}}}>
                        <TextField label="E-Mail-Adresse" fullWidth id="email" variant="filled"/><br/><br/>
                        <Button size= "small" variant="contained">Senden</Button>
                    </Box>
                    {/* Display only in Mobile Version */}
                    <Box sx={{marginTop: 3, flexGrow: 0.3, display: { md: 'none'}}}>
                        <TextField fullWidth id="email" label="E-Mail-Adresse" variant="standard"/><br/><br/>
                        <Button size= "small" variant="contained">Senden</Button>
                    </Box>
                    
                </Grid>
                
                </Item>
            </Grid>
        </Grid>
    </Box>
  );
}