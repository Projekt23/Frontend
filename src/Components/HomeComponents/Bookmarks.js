import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { makeStyles } from "@material-ui/core/styles";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

const useStyles = makeStyles({
  ellipsis: {
    maxWidth: 200, // percentage also works
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
});

// Hier muss noch aufruf backend stattfinden. // String, String, Bool


export default function Bookmarks({bookmarkRows}) {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Bezeichnung:</TableCell>
            <TableCell>Beschreibung:</TableCell>
            {/* <TableCell align="right">Favorit</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookmarkRows.map((row) => (
            <TableRow
              key={row["businessObjectId"]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row["businessObjectName"]}<Button onClick={() => navigate("/result#"+row["businessObjectId"])}><LaunchIcon></LaunchIcon></Button>
              </TableCell>
              <TableCell className={classes.ellipsis} >{row["businessObjectDescription"]}</TableCell>
              {/* <TableCell align="right">
                <IconButton aria-label="delete">
                  {/* <FavoriteIcon /> */}
                {/* </IconButton></TableCell> */} 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



