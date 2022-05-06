import React from "react"
import * as Mui from '@material-ui/core';
import {Typography} from '@mui/material';

function getUserName(){
    return localStorage.getItem('UserName');
}

const Greet = () => <div ><Typography variant="h6" component="h2"> Willkommen {getUserName()} </Typography></div>;

export default Greet