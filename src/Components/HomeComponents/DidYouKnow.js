import * as React from 'react';
import {Typography} from '@mui/material';
import { Divider } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

export default function DidYouKnow() {

    //Space for API call 
    
    //returns filler

    var name = "der Nummernkreis";
    var desc = "Der Nummernkreis beschreibt eine definierte Abfolge in einer Gruppe, in der Elemente zu ordnen sind. Er findet vor allem im Rechnungswesen bei Unternehmen seine Verwendung.";
    
    return (
    <>
    <Typography align='left' variant="h5" component="h3" sx={{ fontWeight: 'bold' }}> Wussten Sie schon? </Typography>

    <Divider sx={{  marginBottom: 2 }}/>
    <TableContainer component={Paper}>
    <Typography align='left' variant="h5" component="h3" sx={{ fontWeight: 'bold' }} > {name} </Typography>

    <Divider sx={{  marginBottom: 2 }}/>

    <Typography align='center' variant="h5" component="h3" > <b>Begriffsabgrenzung:</b> <br />  {desc} </Typography>
    </TableContainer>
    </>
    );
}



