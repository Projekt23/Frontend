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
    const [clicked, setClicked] = useState(100);
    const [favourites, setFavourites] = useState([]);

    const navigate = useNavigate();
   
    
    useEffect(() => {
        getResult()
        getAllFavourites()



    }, [])
    useEffect(() => {
        getResult()
        getAllFavourites()



    }, [clicked])
    
    //get all favorites 
    function getAllFavourites(){
        var id = decodeToken(localStorage.getItem("userID")).id;
        const server = process.env.REACT_APP_API_BACKEND;
        fetch(server+'/favourite/all/'+id+'', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        })
        .then(res => res.json())
        .then(
            (data) => {
                var favouritesArr = []
                data.forEach(element => {
                    favouritesArr.push(element["businessObjectId"])
                });
                setFavourites(favouritesArr)
            },
        )
    }

    //if button favorite is clicked to defavor a BO -> Delete
    function deleteFavorite(){
        const server = process.env.REACT_APP_API_BACKEND;
        var userId = decodeToken(localStorage.getItem("userID")).id;
        fetch(server + '/favourite/' + userId +'/'+boId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        })
        .then(response => {
        response.text().then(value => {
            getResult()
        getAllFavourites()
            }).catch(err => {
            console.log(err);
            });
        });
    }

    //if button favorite is clicked to favor-> Post
    function setFavorite(){
        const server = process.env.REACT_APP_API_BACKEND;
        var userId = decodeToken(localStorage.getItem("userID")).id;
        fetch(server + '/favourite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
        body: JSON.stringify({
            "userId": userId,
            "businessObjectId": boId
        })
        })
        .then(response => {
            getResult()
        getAllFavourites()
        response.text().then(value => {
            }).catch(err => {
            console.log(err);
            });
        });
    }

    function checkFavorite() {
        var favorite = false
        if (favourites.includes(boId)){
            favorite = true
        }
        else{
            favorite = false
        }

        if (favorite === true) {
            return (
                <IconButton onClick={() => {
                    deleteFavorite()
                    getAllFavourites()
                    }}>
                    <FavoriteIcon />
                </IconButton>
            )
        } else {
            return (
                <IconButton  onClick={() => {
                    setFavorite()
                    getAllFavourites()}}>
                    <FavoriteBorderIcon />
                </IconButton>
            )
        }
    }

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
                            {checkFavorite()}
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
                                }} color={"primary"}/>
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
                                    <Button variant="outlined"
                                        key= {row.id}
                                        sx={{ marginRight: 2 }}
                                        onClick = {() => {setClicked(clicked + 1); navigate("/result#" + row.id); getResult()}}>
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
                                        onClick = {() => {setClicked(clicked + 1);navigate("/result#" + row.id); getResult()}}>
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