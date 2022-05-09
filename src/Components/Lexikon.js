import React from "react";
import {Card, Typography} from "@mui/material";
import LexikonSort from "./LexikonComponents/Lexikon.Sort";
import style from "./LexikonComponents/Lexikon.module.css";
import LexikonList from "./LexikonComponents/Lexikon.List";

export default function Lexikon(){
    return(
        <div className={style.containerMain}>
            <Typography variant={"h4"}>Lexikon</Typography>
            <LexikonSort />
            <LexikonList />
        </div>
    )


}