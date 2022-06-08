import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from "./themes.js";
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Container, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { sizeHeight } from '@mui/system';
import { Navigate, Route } from 'react-router';
import { useLocation } from 'react-router';
import { decodeToken } from "react-jwt";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));




const SearchResult= () => {
    const location = useLocation();
    const [businessObjectName, setBusinessObjectName] = useState();
    const [synonyms, setSynonyms] = useState([]);
    const [description, setDescription] = useState("");
    const [labels, setLabels] = useState([]);
    const [contextList, setContextList] = useState([]);
    const [boId, setBoId] = useState("");
    const [clicked, setClicked] = useState();

    const navigate = useNavigate();
    
    function changeFavorite(clicked){
        setClicked(!clicked)
        
    }
    
    useEffect(() => {
                getResult()
            }, [])
    const getResult = () => {
        var userId = decodeToken(localStorage.getItem("userID")).id;
        const server = process.env.REACT_APP_API_BACKEND;
        fetch(server+'/businessobject/' + location.hash.replace('#', "") + '?userId='+userId+'', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
          })
              .then(response => {
              response.text().then(value => {
                  var responseJSON = JSON.parse(value);
                  setBusinessObjectName(responseJSON["name"])
                  setSynonyms(responseJSON["synonyms"])
                  setDescription(responseJSON["description"])
                  setLabels(responseJSON["labels"])
                  setContextList(responseJSON["contextList"])
                  setBoId(responseJSON["id"])
                  }).catch(err => {
                  console.log(err);
                  });
              });

    }
   


    return (
        <Container maxWidth="auto">
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    <Item
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 1
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}>
                            <Typography align='left' variant="h5" component="h3"
                                sx={{
                                    mt: 1
                                }}> <b>{businessObjectName}</b> </Typography>
                            <IconButton onClick={() => changeFavorite(clicked)} >
                                {clicked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                            }}>
                             {labels.map((chip) => (
                                <Chip label={chip.name} key={chip.id} sx={{
                                    marginRight: 1,
                                    marginY: 'auto'
                                }} />
                            ))}
                            <Button variant="contained" sx={{
                                marginLeft: 1,
                                marginY: 'auto',
                                sizeHeight: 20,
                            }} component={Link} to={{pathname: "/objekt_bearbeiten", hash: String(boId)}}
                            >
                                <EditIcon />
                            </Button>
                        </Box>
                    </Item >



                    <Item>
                        <Box>
                            <Typography align='left' variant="h6" component="h3"> <b>Synonym: </b> </Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignContent: 'center',
                            }}>
                                {synonyms.map((row) => (
                                    <Button variant="contained"
                                        key= {row.id}
                                        sx={{ marginRight: 2 }}
                                        onClick = {() => {navigate("/result#" + row.id); getResult()}}>
                                        {row.name}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Item>
                    <Item>
                        <Box>
                            <Typography align='left' variant="h6" component="h3"> <b>Begriffsabgrenzung: </b> </Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Box>
                                <Typography align='left' fontSize={14} component="h3">
                                   {description}</Typography>
                                   </Box>
                        </Box>

                    </Item>
                    <Item>
                        <Box>
                            <Typography align='left' variant="h6" component="h3"> <b>Kontext: </b> </Typography>
                            <Divider sx={{ marginBottom: 1 }} />
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignContent: 'center',
                            }}>
                                {contextList.map((row) => (
                                    <Button variant="contained"
                                        key= {row.id}
                                        sx={{ marginRight: 2 }}
                                        onClick = {() => {navigate("/result#" + row.id); getResult()}}>
                                        {row.name}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Item>
                </Stack>
            </Box>
        </Container>


    )


}
export default SearchResult;