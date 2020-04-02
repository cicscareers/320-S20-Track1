import React from 'react';
import Calendar from 'react-calendar';
import { Grid, Typography, Button, makeStyles, Box} from '@material-ui/core';
import 'react-calendar/dist/Calendar.css';
import Container from "@material-ui/core/Container";
import Appointments from './appts';
import Cookies from "universal-cookie";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
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
  const cookies = new Cookies();
  const fname = cookies.get("firstName");
  const lname = cookies.get("lastName");
  const classes = useStyles();
  return (
  	<Container component='main'>
      <Typography component="h1" variant="h4" align="center" className={classes.paper}>
        Welcome to ReachOUT {fname} {lname}!
      </Typography>
      <Grid container  lg={12} className={classes.selection}>
      
      </Grid>
      
      <Grid container lg={12} className={classes.selection}>
        <Grid container lg={4}>
          
          <Calendar className = {classes.selection} />
        </Grid>
        <Grid container lg={2}></Grid>
        <Grid contains lg={6} justify='center'>
          
          {Appointments()}
            
          
        </Grid>
          <Grid container lg={10} justify='center'>
            <Button variant='contained'>Community News</Button>
          </Grid>
        
      </Grid>
    </Container>
      
     
    
    
    
  );
}

export default App;