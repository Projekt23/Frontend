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
    const [favouriteIds, setFavouriteIds] = useState([])
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
         getAllFavourites()

         if(location.hash.match("favourites")){
            setAnsicht("favorites")
        }
        
       
       
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
                        favouritesArr.push(String(element["businessObjectId"]))
                    });
                    setFavourites(data)
                    setFavouriteIds(favouritesArr)
                    console.log(favouritesArr)
                },
            )
        }

        function favouriteCheck(){
            if (startLetter !== null){
            if(ansicht !=="favorites"){
                listData = (
                    <ReactiveList
                    componentId="SearchResult"
                    dataField="name"
                    size={10}
                    className="result-list-container"
                    showResultStats={false}
                    pagination={true}
                    paginationAt="bottom"
                    
                    render={({ data, value }) => (
                       
                        data.map(item => {
                            if(startsWith(item.name, startLetter)){
                                console.log(item)
                                return(
                                <LexikonList
                                id = {item._id}
                                key={item._id}
                                name={item.name}
                                synonyms={[]}
                                details={item.description}
                                labels={item.label}
                                favorite= {favouriteIds.includes(item._id)}
                                expand = {isExpanded}
                            />)}})
                        )
                    }
                />)
        }
        else{
            
            listData = favourites.map((object) => {
                if(startsWith(object["businessObjectName"], startLetter)){
                return <LexikonList
                id = {object["businessObjectId"]}
                key={object["businessObjectId"]}
                name={object["businessObjectName"]}
                synonyms = {[]}
                details={object["businessObjectDescription"]}
                labels = {[]}
                favorite= {true}
                    expand = {isExpanded}
                />}}
            ) }
                }
            else{
                if(ansicht !=="favorites"){
                    listData = 
                        <ReactiveList
                        componentId="SearchResult"
                        dataField="name"
                        size={10}
                        className="result-list-container"
                        showResultStats={false}
                        pagination={true}
                        paginationAt="bottom"
                        
                        render={({ data, value }) => (
                            
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
                            ))
                        }
                    />
                
                }
                
            else{
                listData = favourites.map((object) => {
                    return <LexikonList
                    id = {object["businessObjectId"]}
                    key={object["businessObjectId"]}
                    name={object["businessObjectName"]}
                    synonyms = {[]}
                    details={object["businessObjectDescription"]}
                    labels = {[]}
                    favorite= {true}
                        expand = {isExpanded}
                    />}
                )
            }}
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