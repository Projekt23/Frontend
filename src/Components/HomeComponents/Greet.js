import React from "react"
import { useState } from "react";
import {Typography} from '@mui/material';



export default function Greet() {
    const [username, setusername] = useState();
    getUsername();
    return (
        <Typography align='left' variant="h4" component="h2"> Willkommen {username} </Typography>
    )


    function getUsername(){
        var id = "3";

    const server = "http://88.214.57.111:8081/api";
    fetch(server+'/user/'+id+'', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' },
    })
        .then(response => {
        response.text().then(value => {
            var responseJSON = JSON.parse(value);
            
            setusername(responseJSON["username"]);
            }).catch(err => {
            console.log(err);
            });
        });
    }
}



