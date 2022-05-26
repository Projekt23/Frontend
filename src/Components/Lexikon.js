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
export default function Lexikon() {

    const [reload, setReload] = useState();
    const [lexikonData, setLexikonData] = useState([])
    const [ansicht, setAnsicht] = useState("all")
    const[startLetter, setStartLetter] = useState(null);
    const [favourites, setFavourites] = useState([])
    useEffect(() => {
        getAllFavourites()
        const server = process.env.REACT_APP_API_BACKEND;
        fetch(server + '/businessobject/all', {
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
                    setLexikonData(data);
                    console.log(data);
                },
            )
    }, [])

    useEffect(() => {
        getAllFavourites()
    }, [reload])
    

    function startsWith(str, word) {
        return str.toUpperCase().lastIndexOf(word, 0) === 0;
    }

    function handleSort() {
        console.log("Sorting ...")
        const sortedData = [...lexikonData].sort((a, b) => {
            return a.title > b.title ? 1 : -1
        })
        setLexikonData(sortedData)
    }

    function handleSort2() {
        console.log("Sorting 2 ...")
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
                    setFavourites(favouritesArr)
                },
            )
        
    
        }


    


    var listData;
    if (startLetter === null){
        if(ansicht === "all"){
            listData = lexikonData.map((object) => {
            return <LexikonList
                id = {object.id}
                key={object.id}
                name={object.name}
                synonyms={object.synonyms}
                details={object.description}
                labels={object.labels}
                favorite= {favourites.includes(object.id)}
            />
            
        })
        }
        else if(ansicht==="favorites"){
            listData = lexikonData.map((object) => {
                if (favourites.includes(object.id)){
                return <LexikonList
                    id = {object.id}
                    key={object.id}
                    name={object.name}
                    synonyms={object.synonyms}
                    details={object.description}
                    labels={object.labels}
                    favorite= {favourites.includes(object.id)}
                />}
            }) 
        }
    }
    else{
        if(ansicht === "all"){
            listData = lexikonData.map((object) => {
                if (startsWith(object.name, startLetter)){
                    return <LexikonList
                        id = {object.id}
                        key={object.id}
                        name={object.name}
                        synonyms={object.synonyms}
                        details={object.description}
                        labels={object.labels}
                        favorite= {favourites.includes(object.id)}
                    />}
        })
        }
        else if(ansicht==="favorites"){
            listData = lexikonData.map((object) => {
                if (favourites.includes(object.id) && startsWith(object.name, startLetter)){
                    return <LexikonList
                        id = {object.id}
                        key={object.id}
                        name={object.name}
                        synonyms={object.synonyms}
                        description={object.description}
                        labels={object.labels}
                        favorite={favourites.includes(object.id)}
                    />}
            }) 
        }
    }
    

    return (<div className={style.containerMain}>
            <div className={style.headerRow}>
                <Typography variant={"h4"}>Lexikon</Typography>
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
            <LexikonSort handleSort={handleSort} handleSort2={handleSort2} ansicht={ansicht} setAnsicht={setAnsicht} startLetter = {startLetter} setStartLetter ={setStartLetter} getAllFavourites = {getAllFavourites}/>
            <Stack spacing={1} direction={"column"}>
                {listData}
            </Stack>
            {/*<LexikonList/>*/}
        </div>)
}