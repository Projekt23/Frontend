import React from "react"
import { useState, useEffect } from "react";
import {Typography} from '@mui/material';
import { isExpired, decodeToken } from "react-jwt";


export default function Greet({username}) {
  
    return (
        <Typography align='left' variant="h4" component="h2"> Willkommen {username} </Typography>
    )
}



