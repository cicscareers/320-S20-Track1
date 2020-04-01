import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import appointments from './appointments.json'

const useStyles = makeStyles({
  table: {
    //minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const MyApp = () => {

  
  return (
    <Container component='main' >
      <Typography style = {{fontSize: 30, textAlign: 'center', paddingTop: 50, paddingBottom: 50}}>Upcoming Appointments</Typography>
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow style={{backgroundColor: '#D3D3D3' }}>
              <TableCell ><strong>Advisor</strong></TableCell>
              <TableCell align="left"><strong>Subject</strong></TableCell>
              <TableCell align="left"><strong>Date</strong></TableCell>
              <TableCell align="left"><strong>Time</strong></TableCell>
              <TableCell align="left"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((row) => (
              <TableRow key={row.time}>
                <TableCell component="th" scope="row">
                  {row.advisor}
                </TableCell>
                <TableCell align="left">{row.subject}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">{row.time}</TableCell>
                <TableCell align="left"><a href='#'>{row.actions}</a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    
  );
}

export default MyApp;
