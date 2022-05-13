import React, {useEffect, useState} from "react";
import {Stack, Typography} from "@mui/material";
import LexikonSort from "./LexikonComponents/Lexikon.Sort";
import style from "./LexikonComponents/Lexikon.module.css";
import LexikonList from "./LexikonComponents/Lexikon.List";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link} from "react-router-dom";

export default function Lexikon(props) {

    const [lexikonData, setLexikonData] = useState([])

    useEffect(() => {
        setLexikonData(props.lexikonData)
    }, [])

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

    const listData = lexikonData.map((object) => {

        return <LexikonList
            key={object.id}
            title={object.title}
            description={object.description}
            details={object.details}
            systems={object.system}
            favorite={object.favorite}
        />
    })

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
            <LexikonSort handleSort={handleSort} handleSort2={handleSort2}/>
            <Stack spacing={1} direction={"column"}>
                {listData}
            </Stack>

        </div>)
}