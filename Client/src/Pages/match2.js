import React, { Component } from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, TextField, Grid, Slider, Box } from '@material-ui/core';
import {Rating, Autocomplete} from '@material-ui/lab';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Menu from "../Navigation/appbar.js";
import SupporterCard from "../components/supporterCards.js"
import SimpleCard from "../components/test.js"
import SupporterList from "../Data/match2consts.js"
import topicsList from "../components/topics.js"
import tagsList from "../components/tags.js"
import convertTime from "../components/convertTime.js"
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
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

function getList(event) {
    fetch(
      "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/supporters?start_date=2020-04-01&end_date=2020-04-28",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      }
    )
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        alert("No Supporters Found");
        console.log(error);
      });
  }

const ResponsiveDrawer = (props) => {
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

  //add a day to the date
  //var lambdaList=getList()

  //This is temporary, will eventually be gotten from lambda
  const blockTime=30;
  
  const updateList = (val) => {
    setName(val);
  };
  var newList = (SupporterList.filter(
    supporter => String(supporter.name.toLowerCase()).includes(name.toLowerCase()))).filter(
    supporter => supporter.rating>=rating).filter(
    supporter => stateTopics.every(val => supporter.topics.includes(val))).filter(
    supporter => stateTags.every(val => supporter.tags.includes(val))).filter(
    supporter => checkTimeInRange(sliderTime[0],sliderTime[1],supporter.timeBlocks)).filter(
    supporter => supporter.day.substring(6,10)===selectedDate.getFullYear().toString() && supporter.day.substring(3,5)===selectedDate.getDate().toString() && supporter.day.substring(0,2)===getTheMonth(selectedDate.getMonth()+1));

  const getSupporterCard = supporterObj => {
    return <SupporterCard {...supporterObj}/>;
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
      if(start<(convertToMin(timeBlockArray[i]["end"]+blockTime)) && end>(convertToMin(timeBlockArray[i]["start"]+blockTime))){
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
        <br/>
        <TextField
          variant="outlined"
          margin="normal"
          className={classes.inputs}
          align="center"
          placeholder="Search Supporter"
          onChange={e => setName(e.target.value)}
        />
        <br/>
        <br/>
        <Autocomplete
          multiple
          className={classes.inputs}
          id="tags-outlined"
          options={topicsList}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Help Needed Topics"
              placeholder="Favorites"
            />
          )}
          onChange={(e,v) => setStateTopics(v)}
        />
        <br/>
        <Autocomplete
          multiple
          className={classes.inputs}
          id="tags-outlined"
          options={tagsList}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Supporter Tags"
              placeholder="Favorites"
            />
          )}
          onChange={(e,v) => setStateTags(v)}
        />
        <br/>
        <Typography align="center">What day would you like an appointment on?</Typography>
        <br/>
        <Box align="center">
          <DatePicker
            align="center"
            variant="inline"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Box>
        <br/>
        <br/>
        <Typography align="center" className={classes.inputs} id="range-slider" gutterBottom>
          What is your availability on {selectedDate.toDateString()}?
        </Typography>
        <Slider
          value={sliderTime}
          onChange={handleSliderChange}
          step={30}
          min={420}
          max={1140}
          defaultValue={[540, 1020]}
          valueLabelDisplay="off"
          aria-labelledby="range-slider"
          className={classes.inputs}
          getAriaValueText={convertTime}
        />
        <Typography align="center" className={classes.inputs} id="range-slider" gutterBottom>
          {convertTime(sliderTime[0])}: {convertTime(sliderTime[1])}
        </Typography>
        <br/>
        <Typography align="center">Minimum Required Rating</Typography>
        <br/>
        <Box align="center">
        <Rating 
          className={classes.rating} 
          name="Supporter Rating" 
          precision={0.5} 
          value={rating} 
          onChange={e => setRating(e.target.value)}
          size="large"
        />
        </Box>
      </div>
      </Drawer>
      <main className={classes.content}>
        
        <Typography align="center" variant="h4">Recommended Supporters</Typography>
        <br/>
        <br/>
        {newList.map(supporterObj => getSupporterCard(supporterObj))}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
