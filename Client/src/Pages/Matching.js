import React, { Component } from "react";
import PropTypes from 'prop-types';
import { makeStyles, useTheme, TextField, Grid, Slider, Box, AppBar, Divider, Drawer, Hidden, IconButton, Toolbar, Typography, CssBaseline} from '@material-ui/core';
import {Rating, Autocomplete} from '@material-ui/lab';
import Menu from "../Navigation/appbar.js";
import SupporterCard from "../components/supporterCards.js"
import SupporterList from "../Data/match2consts.js"
import topicsList from "../components/topics.js"
import tagsList from "../components/tags.js"
import convertTime from "../components/convertTime.js"
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

const drawerWidth = "25%";
var LambdaList=[];

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
      "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/supporters?start_date=2020-01-01%2000%3A00%3A00&end_date=2021-01-01%2000%3A00%3A00",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      }
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        for (let i=0;i<json["body"].length;i++){
          console.log(json["body"][i])
          LambdaList.push(json["body"][i]);
        }
        console.log(json["body"])
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
  //getList()
  //console.log(LambdaList)
  //console.log(LambdaList.length)

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
      return month.toString();
    }
    else{
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
              label="Supporter Specialties"
            />
          )}
          onChange={(e,v) => setStateTags(v)}
        />
        <br/>
        <Typography align="center">What day would you like an appointment on?</Typography>
        <br/>
        <Box align="center">
          <DatePicker
            autoOk
            align="center"
            variant="inline"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Box>
        <br/>
        <br/>
        <Typography align="center" className={classes.inputs} id="range-slider" gutterBottom>
          What is your availability on {selectedDate.toDateString().substring(0,3)+"day,"+selectedDate.toDateString().substring(3)}?
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
          {convertTime(sliderTime[0])} - {convertTime(sliderTime[1])} EST
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
        
        {newList.length>0 && <Typography align="center" variant="h4">Recommended Supporters</Typography>}
        {newList.length===0 && <Typography align="center" variant="h4">We couldnt find a supporter with those attributes. Please try widening your search.</Typography>}
        <br/>
        <br/>
        {newList.map(supporterObj => getSupporterCard(supporterObj))}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
