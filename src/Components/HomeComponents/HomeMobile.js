import React from "react"
import { Box } from "@mui/system"
import Greet from './Greet';
import DidYouKnow from "./DidYouKnow";
import Bookmarks from './Bookmarks';
import ChangeHistory from './ChangeHistory'
import { styled } from '@mui/material/styles';
import { Grid, Paper, Container, Typography, Divider } from "@mui/material";
import Button from '@mui/material/Button';
import History from './History';


export default function HomeMobile({boName,boDescription,boID,username}) {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Container maxWidth="auto">

            <Item
                sx={{
                    mb: 1,
                }}>   <Greet username={username}/>
            </Item>
            <Item sx={{
                    mb: 1,
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        m: 1,
                    }}>
                    <Typography align='left' variant="h5" component="h3"> <b>Merkliste:</b> </Typography>
                    <Button variant="contained">Alle anzeigen</Button>
                </Box>
                <Divider sx={{ marginBottom: 2 }} />
                <Bookmarks />
            </Item>

            <Item sx={{
                    mb: 1,
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        m: 1,
                    }}>
                    <Typography align='left' variant="h5" component="h3"> <b>Zuletzt angesehen:</b> </Typography>
                </Box>
                <Divider sx={{ marginBottom: 2 }} />
                <History />
            </Item>

            <Item sx={{
                    mb: 1,
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        m: 1,
                    }}>
                    <Typography align='left' variant="h5" component="h3"> <b>Änderungshistorie:</b> </Typography>
                </Box>
                <Divider sx={{ marginBottom: 2 }} />
                <ChangeHistory /></Item>
            <Item sx={{
                    mb: 1,
                }} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', mb: 1 }}>
                            <Typography  marginTop={1} align='left' variant="h5" component="h3" sx={{ fontWeight: 'bold' }}> Wussten Sie schon? </Typography>
                            <Button to={{pathname: "/result", hash: String(boID)}} variant="contained">zur Detailseite</Button>
                        </Box>
                    <DidYouKnow boName = {boName} boDescription = {boDescription}/></Item>
        </Container >
    )
}