import React from "react";
import {Typography} from "@mui/material";
import LexikonSort from "./LexikonComponents/Lexikon.Sort";
import style from "./LexikonComponents/Lexikon.module.css";
import LexikonList from "./LexikonComponents/Lexikon.List";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link} from "react-router-dom";




export default function Lexikon(){
    return(
        <div className={style.containerMain}>
            <div className={style.headerRow}>
                <Typography variant={"h4"}>Lexikon</Typography>
                <Button className = {style.headerButton} variant={"contained"} size={"small"} component={Link} to="/objekt_anlegen"><AddCircleOutlineIcon />Eintrag hinzufügen</Button>
            </div>

            <LexikonSort />
            <LexikonList />
        </div>
    )


}