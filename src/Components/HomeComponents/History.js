import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



function createData(designation, date, favorite) {
  return {designation, date, favorite};
}



// Hier muss noch aufruf backend stattfinden. // String, String, Bool

const rows = [
  createData('Abrechnungsbelegarten', 'vor 20 Minuten', true),
  createData('Debitorenkonditionen', 'vor 23 Minuten', false),
  createData('Reparaturschema', 'gestern', false),
  createData('Skonto', '02.05.', true),
];

export default function History() {
  return (
<TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Bezeichnung:</TableCell>
            <TableCell>Datum:</TableCell>
            <TableCell align="right">Favorit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.designation}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.designation}
              </TableCell>
              <TableCell >{timeCalculator(row.date)}</TableCell>
              <TableCell align="right">{checkFavorite(row.favorite)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function checkFavorite(favorite) {
    if (favorite === true){
        return(<FavoriteIcon/>)
    }else{
        return(<FavoriteBorderIcon/>)
    }
}

function timeCalculator(date){
   return(date);
}


