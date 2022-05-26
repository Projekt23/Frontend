import * as React from 'react';
import {Typography} from '@mui/material';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/system"
import { Link } from 'react-router-dom';

export default function DidYouKnow({boName,boDescription}) {

    return (
    

    <TableContainer>
        <Typography align='left' variant="h6" component="h3" sx={{ fontWeight: 'bold' }} > {boName} </Typography>
        <Divider sx={{  marginBottom: 2 }}/>
        <Typography align='center'  component="h3" > <b>Begriffsabgrenzung:</b> <br />  {boDescription} </Typography>
    </TableContainer>
   
    );
}



