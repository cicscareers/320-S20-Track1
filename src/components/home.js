import React from 'react';
import Calendar from 'react-calendar';
import { Grid, AppBar, Toolbar, Typography,TextField, Button, createMuiTheme, makeStyles, Box} from '@material-ui/core';
import 'react-calendar/dist/Calendar.css';
import Container from "@material-ui/core/Container";

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
  	//<html>
  	<Container component="main" maxWidth="xs" align="center">
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
        
          <Grid contains lg={4}>
          
            <Typography primary>Scheduled Appointments:</Typography>
            <Box border={1} borderColor='#881c1c'>
              <Typography >Dhru Gala     CS207    March 5    2:30PM</Typography>
            </Box>
            <Box border = {1} borderColor='#881c1c'>
              <Typography >Chinmay Patil CS201    March 6    10:00AM</Typography>
            </Box>
            
            <Button variant='contained' className = {classes.selection}>Schedule New Appointment</Button>
          </Grid>
          <Grid container lg={12} justify='center'>
            <Button variant='contained'>Community News</Button>
          </Grid>
        
      </Grid>
     </Container>
     //</html>
    
    
    
  );
}

const style = {
  
};

const btn = {
  alignItems: 'center',
}

const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
  
});

export default App;