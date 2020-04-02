import React from 'react';
import Calendar from 'react-calendar';
import { Grid, Typography, Button, makeStyles, Box} from '@material-ui/core';
import 'react-calendar/dist/Calendar.css';
import Container from "@material-ui/core/Container";
import Appointments from './appts';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    
    
    //border: 50,
    //borderBlockColor: '#000000'
  },
  selection: {
    //width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(10)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  appointments: {
    
  }
}));

function App() {
  const classes = useStyles();
  return (
  	<Container component='main'>
      <Typography component="h1" variant="h5" align="center">
        Welcome to ReachOUT!
      </Typography>
      <Grid container  lg={12} className={classes.selection}>
      <Grid container lg={4} justify='center'>
        <Button variant="contained">Search Supporters</Button>
      </Grid>
      <Grid container  lg={4} justify='center'>
        <Button variant="contained">My Profile</Button>
      </Grid>
      <Grid container  lg={4} justify='center'>
        <Button variant="contained">Settings</Button>
      </Grid>
      </Grid>
      
      <Grid container lg={12} className={classes.selection}>
        <Grid container lg={4}>
          <Typography >Upcoming Appointments: </Typography>
          <Calendar className = {classes.selection} />
        </Grid>
        <Grid container lg={4}></Grid>
        <Grid contains lg={4} justify='center'>
          
          {Appointments()}
            
          <Button variant='contained' className = {classes.selection}>Schedule New Appointment</Button>
        </Grid>
          <Grid container lg={12} justify='center'>
            <Button variant='contained'>Community News</Button>
          </Grid>
        
      </Grid>
    </Container>
      
     
    
    
    
  );
}

export default App;