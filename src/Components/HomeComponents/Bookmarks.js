import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

function createData(designation, describtion, favorite) {
  return { designation, describtion, favorite };
}



// Hier muss noch aufruf backend stattfinden. // String, String, Bool

const rows = [
  createData('Auftrag', 'Der Auftrag ist in der Rechtswissenschaft ein Vertrag zwischen einem Auftraggeber...', true),
  createData('Rechnung', 'Unter Rechung wird jedes Dokument verstanden, das die Abrechnung über eine Lief...', true),
  createData('Kunde', 'Ein Kunde ist allgemein in der Wirtschaft und speziell im Marketing ein Person, ...', true),
  createData('Skonto', 'Der oder das Skonto ist im Handel ein Preisnachlass auf den Kaufpreis, den der Verk..', true),
];

export default function Bookmarks() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Bezeichnung:</TableCell>
            <TableCell>Beschreibung:</TableCell>
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
              <TableCell >{row.describtion}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete">
                  <FavoriteIcon />
                </IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




