/*------------------------------------------------------------Necessary imports------------------------------------------------------------------------------------------------*/
import React, { useEffect } from 'react'
import { ReactiveList, ResultList } from "@appbaseio/reactivesearch";
import { Container, Accordion, AccordionSummary, Typography, Stack, Chip, AccordionDetails, Button, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import styled from 'styled-components';
import { Label } from '@material-ui/icons';
import SearchResult from './SearchResult';
import { func } from 'prop-types';
import { Subscriptions } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import LexikonList from './LexikonComponents/Lexikon.List';
import { decodeToken } from "react-jwt";
import { useState } from 'react';
/*------------------------------------------------------------Styles of UserDropDownSettings------------------------------------------------------------------------------------*/
const Styles = styled.div`


.test{
    margin-top: 5px;
    border-color: black;
    border: 1px solid #ccc;
    
}

.divider{
    color: #C4C4CC;
}

`;


//shows searchresults 
const Resultlist = (props) => {
    const navigate = useNavigate()
    const redirect = (e, id) => {
        e.preventDefault();
        navigate("/results#" + id);
    }
    const [favourites, setFavourites] = useState([])
    const [favouriteIds, setFavouriteIds] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [expand, setExpand] = React.useState(props.expand);
    const toggleAcordion = () => {
        setExpand((prev) => !prev);
    };

    // set all cards to expanded
    useEffect(() => {
        setExpand(props.expand)
        getAllFavourites()
    }, [props.expand])

    //state of the card which is expanded or not expanden 
    const [expanded, setExpanded] = React.useState(false);
    const [fav, setFav] = React.useState(props.favorite);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // get all favorites to set the favorite buttons
    function getAllFavourites(){
        const server = process.env.REACT_APP_API_BACKEND;
        
        var userId = decodeToken(localStorage.getItem("userID")).id;
        fetch(server + '/favourite/all/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
        })
            .then(res => res.json())
            .then(
                (data) => {
                    var favouritesArr = []
                    data.forEach(element => {
                        favouritesArr.push(String(element["businessObjectId"]))
                    });
                    setFavourites(data)
                    setFavouriteIds(favouritesArr)
                },
            )
        }
    const AccordionSummaryText = {
        width: "100%",
        display: "flex",
        justifyContent: "space-between"

    }

    const AccordionDetailsText = {
        marginTop: "30px",
        marginBottom: "30px"
    }

    const AccordionFooter = {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px",
    }

    return (
        <Styles>
            <Container sx={{ mt: 3 }} >

                <Typography sx={{ mb: 1 }} align='left' variant="h4" component="h2"> Suchergebnisse: {searchParams.get("q")}  </Typography>
                <Divider sx={{ mb: 3 }}></Divider> 
                <ReactiveList
                    componentId="SearchResult"
                    dataField="name"
                    size={10}
                    className="result-list-container"
                    showResultStats={false}
                    pagination={true}
                    paginationAt="bottom"
                    react={{
                        and: "q"
                    }}
                    render={({ data }) => (
                        data.map(item => {
                            return( <LexikonList
                                id = {item._id}
                                key={item._id}
                                name={item.name}
                                synonyms={[]}
                                details={item.description}
                                labels={item.label}
                                favorite= {favouriteIds.includes(item._id)}
                                expand = {isExpanded}
                         />)}
                         )
                    )}
                />
            </Container>
        </Styles>
    );
}


export default Resultlist



