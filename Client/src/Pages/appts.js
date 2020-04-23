import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppointmentCard from '../components/AppointmentCard';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, TextField, Grid} from '@material-ui/core';
import Menu from "../Navigation/appbar.js";
import appointments from "../Data/appointments2.js"
import Cookies from "universal-cookie";

const cookies = new Cookies();
const role = cookies.get("role");

const drawerWidth = "25%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  inputs: {
    marginLeft: "5%",
    marginRight: "5%",
    width:"90%"
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  dayselect: {
    marginLeft: "40%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  rating: {
   align: "center",
   alignItems: "center",
  },
}));

const ResponsiveDrawer = (props) => {
  //Gets info from the cookies
  //get users role
  console.log(appointments)
  const today = new Date();
  const { container } = props;
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [stateTopics, setStateTopics]=React.useState([]);
  const [stateTags, setStateTags]=React.useState([]);
  const [sliderTime, setSliderTime] = React.useState([540, 1020]);
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [name,setName]=React.useState("");
  const [rating,setRating]=React.useState(0);
  const [search,setSearch]=React.useState("");


  const blockTime=30;
  if(role == 'Student'){
    var filteredAppointmentList = (appointments.filter(
      appt => String(appt.supporter.toLowerCase()).includes(search.toLowerCase())))
  }
  if(role !== 'Student'){
    var filteredAppointmentList = []
  }
  const updateList = (val) => {
    setName(val);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSliderChange = (event, newValue) => {
    setSliderTime(newValue);
  };
  function convertToMin(t){
    return parseInt(t.substring(0, 2))*60+parseInt(t.substring(3,5));
  }
  function getTheMonth(month){
    if (parseInt(month)>10){
      console.log(month.toString())
      return month.toString();
    }
    else{
      console.log("0".concat(month.toString()))
      return "0".concat(month.toString());
    }
  }

  function checkTimeInRange(start,end, timeBlockArray){
    for(let i=0;i<timeBlockArray.length;i++){
      if(start<(convertToMin(timeBlockArray[i]["end"]+blockTime)) && end>(convertToMin(timeBlockArray[i]["start"]+blockTime)) && start!==end){
        return true
      }
    }
    return false
  }


  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Menu/>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Typography align="center" variant="h5">Filters</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          className={classes.inputs}
          align="center"
          placeholder="Search Supporter"
          onChange={e => setSearch(e.target.value)}
        />
        <br/>
        {}
      </div> 
      </Drawer>
      <main className={classes.content}>
        
        {filteredAppointmentList.length>0 && <Typography align="center" variant="h4">Upcoming Appointments</Typography>}
        {filteredAppointmentList.length===0 && <Typography align="center" variant="h4">We couldnt find an appointment with those attributes. Please try widening your search.</Typography>}
        <br/>
        <br/>
        {filteredAppointmentList.map((appointment) => (
                today < new Date(appointment.date) &&
                  <Grid lg = {12}>
                    <AppointmentCard 
                      upcoming = {true}
                      role = {role}
                      subject = {appointment.subject}
                      location = {appointment.location}
                      medium = {appointment.medium}
                      start = {appointment.start}
                      end = {appointment.end}
                      date = {appointment.date}
                      supporter = {appointment.supporter}
                      student = {appointment.student}
                      supporterProfilePic = {appointment.supporterProfilePic}
                      studentProfilePic = {appointment.studentProfilePic}
                    />
                  </Grid>
                
                  
                ))}
        <br/>
        <br/>
        <br/>
        <br/>
        {filteredAppointmentList.map((appointment) => (
                today > new Date(appointment.date) &&
                <Grid lg = {12}>
                  <AppointmentCard 
                    upcoming = {false}
                    role = {role}
                    subject = {appointment.subject}
                    location = {appointment.location}
                    medium = {appointment.medium}
                    start = {appointment.start}
                    end = {appointment.end}
                    date = {appointment.date}
                    supporter = {appointment.supporter}
                    student = {appointment.student}
                    supporterProfilePic = {appointment.supporterProfilePic}
                    studentProfilePic = {appointment.studentProfilePic}
                  />
                </Grid>
              ))}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;