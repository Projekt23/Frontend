import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import LaunchIcon from '@mui/icons-material/Launch';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
//Intervall durch den am Backend neue Daten erfragt werden können
//setInterval(ChangeHistory, 1000);

function createData(designation, name, date) {
  return {designation, name , date};
}

const rows = [
  createData('Rechnung', 'Ines Kluge', '2022-05-06 4:30'),
  createData('Abrechnungsbelegarten', 'Thomas Engel', '2022-07-06 4:30'),
  createData('Einkaufsorganisation', 'Steffen Sanger', '2022-02-06 4:30'),
];

export default function ChangeHistory({changeHistory}) {
  const navigate = useNavigate();
  return (
<TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableBody>
          {changeHistory.slice(0, 3).map((row) => (
            <TableRow
              key={row["boId"]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell component="th" scope="row">
                {row["boName"]}<Button href={("/result#"+row["boId"])} ><LaunchIcon></LaunchIcon></Button>
              </TableCell>
              <TableCell >{row["userName"]}</TableCell>
              <TableCell align="right">{timeCalculator(row["timestamp"])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function timeCalculator(date){   
  return(moment(date, "YYYY-MM-DD HH:mm"). fromNow());
}