import React from "react"
import {Typography} from '@mui/material';



const Greet = () => <Typography align='left' variant="h4" component="h2"> Willkommen {localStorage.getItem('username')} </Typography>;

export default Greet

