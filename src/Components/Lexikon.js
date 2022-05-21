import React, {useEffect, useState} from "react";
import {Stack, Typography} from "@mui/material";
import LexikonSort from "./LexikonComponents/Lexikon.Sort";
import style from "./LexikonComponents/Lexikon.module.css";
import LexikonList from "./LexikonComponents/Lexikon.List";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link} from "react-router-dom";

export default function Lexikon() {

    const [lexikonData, setLexikonData] = useState([])
    const [ansicht, setAnsicht] = useState("all")
    const[startLetter, setStartLetter] = useState(null);
    useEffect(() => {
        const server = "http://88.214.57.111:8081/api";
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

    function startsWith(str, word) {
        return str.lastIndexOf(word, 0) === 0;
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
    
    var listData;
    if (startLetter === null){
        if(ansicht === "all"){
            listData = lexikonData.map((object) => {

            return <LexikonList
                id = {object.id}
                key={object.id}
                name={object.name}
                synonyms = {object.synonyms}
                description={object.description}
                labels={object.labels}
                favorite={object.favorite}
            />
        })
        }
        else if(ansicht==="favorites"){
            listData = lexikonData.map((object) => {
                if (object.favorite ===true){
                return <LexikonList
                    id = {object.id}
                    key={object.id}
                    name={object.name}
                    synonyms={object.synonyms}
                    details={object.description}
                    labels={object.labels}
                    favorite={object.favorite}
                />}
            }) 
        }
    }
    else{
        if(ansicht === "all"){
            listData = lexikonData.map((object) => {
                if (startsWith(object.title, startLetter)){
                    return <LexikonList
                        id = {object.id}
                        key={object.id}
                        name={object.name}
                        synonyms={object.synonyms}
                        details={object.description}
                        labels={object.labels}
                        favorite={object.favorite}
                    />}
        })
        }
        else if(ansicht==="favorites"){
            listData = lexikonData.map((object) => {
                if (object.favorite ===true && startsWith(object.title, startLetter)){
                    return <LexikonList
                        id = {object.id}
                        key={object.id}
                        name={object.name}
                        synonyms={object.synonyms}
                        description={object.description}
                        labels={object.labels}
                        favorite={object.favorite}
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
            <LexikonSort handleSort={handleSort} handleSort2={handleSort2} ansicht={ansicht} setAnsicht={setAnsicht} startLetter = {startLetter} setStartLetter ={setStartLetter}/>
            <Stack spacing={1} direction={"column"}>
                {listData}
            </Stack>
            {/*<LexikonList/>*/}
        </div>)
}