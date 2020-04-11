import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import appointments from '../Data/appointments.json';
import Cookies from 'universal-cookie';


const MyApp = () => {
  const cookies = new Cookies();
  const eml = cookies.get("email");
  for(var i = 0; i < appointments.length; i++){
    if (appointments[i].email == eml)
      break;
  }
  var aptmnt = []
  if(i != appointments.length){
    aptmnt = appointments[i].appointments;
  }

  
  return (
    <Container component='main' >
      <Typography style = {{fontSize: 30, textAlign: 'center', paddingTop: 50, paddingBottom: 50}}>Upcoming Appointments</Typography>
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow style={{backgroundColor: '#D3D3D3' }}>
              <TableCell ><strong>Supporter</strong></TableCell>
              <TableCell align="left"><strong>Subject</strong></TableCell>
              <TableCell align="left"><strong>Date</strong></TableCell>
              <TableCell align="left"><strong>Time</strong></TableCell>
              <TableCell align="left"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {aptmnt.map((row) => (
              <TableRow key={row.time} >
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