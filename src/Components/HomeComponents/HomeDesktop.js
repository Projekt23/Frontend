import React from "react"
import { Box } from "@mui/system"
import { Link } from "react-router-dom";
import Greet from './Greet';
import DidYouKnow from "./DidYouKnow";
import Bookmarks from './Bookmarks';
import ChangeHistory from './ChangeHistory'
import { styled } from '@mui/material/styles';
import { Grid, Paper, Container, Typography, Divider } from "@mui/material";
import Button from '@mui/material/Button';
import History from './History';


export default function HomeDesktop({boName,boDescription,boID,username,bookmarkRows, lastSeen, changeHistory}) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Container maxWidth="auto">
            <Grid mt={0} mb={2} container spacing={2}>
                <Grid item xs={12} >
                    <Item ><Greet username={username}/></Item>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper>
                        <Item sx={{ minHeight: 360 }}>
                            <Box
                                sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', mb: 1 }}>
                                <Typography marginTop={1} align='left' variant="h5" component="h3"> <b>Merkliste:</b> </Typography>
                                <Button variant="contained" component={Link} to={{ pathname: "/lexikon", hash: "favourites" }}>Alle anzeigen</Button>
                            </Box>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Bookmarks bookmarkRows={bookmarkRows} />
                        </Item>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
       
                    <Item sx={{ minHeight: 360 }} >
                        <Box
                            sx={{ display: 'flex', justifyContent: 'space-between', m: 1 }}>
                            <Typography align='left' variant="h5" component="h3"> <b>Zuletzt angesehen:</b> </Typography>
                        </Box>
                        <Divider sx={{ marginBottom: 2 }} />
                        <History lastSeen = {lastSeen}/>
                    </Item>
           
                </Grid>
                <Grid item xs={6}>
          
                    <Item sx={{ minHeight: 240 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 1, }}>
                            <Typography align='left' variant="h5" component="h3"> <b>Änderungshistorie:</b> </Typography>
                        </Box>
                        <Divider sx={{ marginBottom: 2 }} />
                        <ChangeHistory changeHistory = {changeHistory}/>
                    </Item>
               
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Item sx={{ minHeight: 240 }} >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', mb: 1 }}>
                                <Typography marginTop={1} align='left' variant="h5" component="h3" sx={{ fontWeight: 'bold' }}> Wussten Sie schon? </Typography>
                                <Button component={Link} to={{ pathname: "/result", hash: String(boID) }} variant="contained">Zur Detailseite</Button>
                            </Box>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Item  >
                                <DidYouKnow boName={boName} boDescription={boDescription} />
                            </Item>
                        </Item>
                    </Paper>
                </Grid>
            </Grid >
        </Container >
    )
}