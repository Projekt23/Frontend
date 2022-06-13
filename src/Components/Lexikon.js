import React, {useEffect, useState} from "react";
import {Stack, Typography} from "@mui/material";
import LexikonSort from "./LexikonComponents/Lexikon.Sort";
import style from "./LexikonComponents/Lexikon.module.css";
import LexikonList from "./LexikonComponents/Lexikon.List";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { decodeToken } from "react-jwt";
import { useLocation } from 'react-router';
import { ReactiveList, ResultList } from "@appbaseio/reactivesearch";
import { Container, Accordion, AccordionSummary,   Chip, AccordionDetails,  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import styled from 'styled-components';

export default function Lexikon({setReload}) {

    const [lexikonData, setLexikonData] = useState([])
    const [ansicht, setAnsicht] = useState("all")
    const[startLetter, setStartLetter] = useState(null);
    const [favourites, setFavourites] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)
    const location = useLocation()

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
    useEffect(() => {
        if(location.hash.match("favourites")){
            setAnsicht("favorites")
        }
        
        getAllFavourites()
       
    }, [])

    useEffect(() => {
        getAllFavourites()
    }, [])
    

    function startsWith(str, word) {
        return str.toUpperCase().lastIndexOf(word, 0) === 0;
    }

    function handleSort() {
        const sortedData = [...lexikonData].sort((a, b) => {
            return a.title > b.title ? 1 : -1
        })
        setLexikonData(sortedData)
    }

    function handleSort2() {
        const sortedData = [...lexikonData].sort((a, b) => {
            return a.title < b.title ? 1 : -1
        })
        setLexikonData(sortedData)
    }
    
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
                        favouritesArr.push(element["businessObjectId"])
                    });
                    setFavourites(data)
                },
            )
        }

        function favouriteCheck(){
            
            if(ansicht !=="favorites"){
                return(
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
                    render={({ data, value }) => (
                       
                        data.map(item => (
                            
                            <Accordion key={item._id} >
                                <AccordionSummary
                                    
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    {/* {setsearchValue(value)} */}
                                    {console.log(value)}
                                    <Typography sx={{ width: '33%', flexShrink: 0 }} >
                                        {item.name}
                                    </Typography>
                                    <div style={AccordionSummaryText}>
                                        <div>
                                            <Stack direction={"row"} spacing={1} alignItems="center">
                                                <Typography>
                                                    Synonyme:
                                                </Typography>

                                            </Stack>
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Divider />
                                    <div style={AccordionDetailsText}>
                                        <Typography variant={"h5"}>Begriffsabgrenzung</Typography>
                                        <br />
                                        <Typography key={item._id}> {item.description} </Typography>
                                    </div>
                                    <Divider />
                                    <div style={AccordionFooter}>
                                        <Button variant={"contained"} component={Link} to={{ pathname: "/result", hash: String(item._id) }}>Zur Detailseite</Button>
                                        <div>
                                          <Stack direction={"row"} spacing={1}>
                                                <Chip label={item.label}></Chip>
                                            </Stack> 
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    )}
                />)
        }
        else{
            listData = favourites.map((object) => {
                return <LexikonList
                    id = {object["businessObjectId"]}
                    key={object["businessObjectId"]}
                    name={object["businessObjectName"]}
                    details={object["businessObjectDescription"]}
                    favorite= {true}
                    expand = {isExpanded}
                />}
            ) 
        }
    }
    var listData;
    

    return (<div className={style.containerMain}>
            <div className={style.headerRow}>
                <Typography color= "textPrimary" variant={"h4"}>Lexikon</Typography>
                <Button className={style.headerButton}
                        variant={"contained"}
                        size={"small"}
                        component={Link}
                        to="/objekt_anlegen"
                >

                    <AddCircleOutlineIcon/>
                    Eintrag hinzufügen

                </Button>
            </div>
            <LexikonSort handleSort={handleSort} handleSort2={handleSort2} ansicht={ansicht} setAnsicht={setAnsicht} startLetter = {startLetter} setStartLetter ={setStartLetter} getAllFavourites = {getAllFavourites} setIsExpanded = {setIsExpanded} setReload = {setReload}/>
            {favouriteCheck()}
            {listData}
        </div>)
}