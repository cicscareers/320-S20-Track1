import React, { useEffect } from "react";
import {TextField, Slider, Box, AppBar, Drawer, Typography, CssBaseline, CircularProgress, Button, Grid, Icon, FormControlLabel, Checkbox} from '@material-ui/core';
import Menu from "../../../../Navigation/appbar.js";
//import SupporterCard from "../SupporterPanels/supporterCards.js"
//import topicsList from "../topics.js"
//import tagsList from "../tags.js"
import convertTime from "../../../FindSupporter/convertTime.js"
import { DatePicker} from "@material-ui/pickers";
import useStyles from "./BlockStyles.js"



const ResponsiveDrawer = (props) => {
  //Initialize all of the constants
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [sliderTime, setSliderTime] = React.useState([540, 1020]);
  const [repeat, setRepeat] = React.useState(false);
  const classes = useStyles();
  const [isLoaded, setLoaded] = React.useState(true);
  const today = new Date()
  const today_year=today.getFullYear().toString()
  const today_month=getTheMonth(today.getMonth())
  const today_day=today.getDate().toString()
  const next_year=(today.getFullYear()+1).toString()
  //Calls the API to get the list of supporters
  useEffect(() => {
    
    }, [])

  
  //Creates a new supporter card a supporter
  /*
  const getSupporterCard = (supporterObj, s) => {
    return <SupporterCard {...supporterObj} score={s} filtered_tags={stateTags}/>;
  };*/

  //Increments day by one
  function nextDay(){
    var newDate = new Date()
    newDate.setMonth(selectedDate.getMonth())
    newDate.setDate(selectedDate.getDate() + 1);
    handleDateChange(newDate)
  }

  //Decrements day by one
  function previousDay(){
    var newDate = new Date()
    newDate.setMonth(selectedDate.getMonth())
    newDate.setDate(selectedDate.getDate() - 1);
    handleDateChange(newDate)
  }

  //Sets time based on the slider
  const handleSliderChange = (event, newValue) => {
    setSliderTime(newValue);
  };

  function changeRecurring(){
    setRepeat(!repeat)
  }

  //Converts a string to minutes
  function convertToMin(t){
    return parseInt(t.substring(0, 2))*60+parseInt(t.substring(3,5));
  }

  //Adds a 0 to month when month<10 because js dates are dumb
  function getTheMonth(month){
    if (parseInt(month)>10){
      return month.toString();
    }
    else{
      return "0".concat(month.toString());
    }
  }

  //Checks if the supporter has a slot that fits in to the slider times
  /*
  function checkTimeInRange(start,end, timeBlockArray){
    for(let i=0;i<timeBlockArray.length;i++){
      if(start<(convertToMin(timeBlockArray[i]["end"]+blockTime)) && end>(convertToMin(timeBlockArray[i]["start"]+blockTime)) && start!==end){
        return true
      }
    }
    return false
  }*/

  if(!isLoaded){
    return (
      <div align="center">
        <br></br>
        <Typography variant="h4">Loading...</Typography>
        <br></br>
        <CircularProgress />
      </div>
    )
  }

  //If the API is loaded, show the matching page
  else{
    return (
      <div className={classes.root}>
        {/*Handles the appbar sizing*/}
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
          {/*All of the filters*/}
          <div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Typography align="center" variant="h5">Create a new appointment block</Typography>
          <br/>
          <br/>
          <Typography align="center">Select day for block:</Typography>
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
            When will this block take place?
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
          <FormControlLabel
            control={
              <Checkbox
                className={classes.Checkbox}
                checked={repeat}
                onChange={changeRecurring}
                name="checkedB"
                color="primary"
              />
            }
            label="Occur Weekly?"
          />
        </div>
        </Drawer>
        <main className={classes.content}>
        </main>
      </div>
    );
  }
}

export default ResponsiveDrawer;
