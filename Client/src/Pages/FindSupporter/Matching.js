import React, { useEffect } from "react";
import {TextField, Slider, Box, AppBar, Drawer, Typography, CssBaseline} from '@material-ui/core';
import {Rating, Autocomplete} from '@material-ui/lab';
import Menu from "../../Navigation/appbar.js";
import SupporterCard from "./supporterCards.js"
import topicsList from "./topics.js"
import tagsList from "./tags.js"
import convertTime from "./convertTime.js"
import { DatePicker} from "@material-ui/pickers";
import useStyles from "./MatchingStyles.js"
//import SupList from "./match2consts.js"

const ResponsiveDrawer = (props) => {
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [stateTopics, setStateTopics]=React.useState([]);
  const [stateTags, setStateTags]=React.useState([]);
  const [sliderTime, setSliderTime] = React.useState([540, 1020]);
  const classes = useStyles();
  const [name,setName]=React.useState("");
  const [rating,setRating]=React.useState(0);
  const [isLoaded, setLoaded] = React.useState(false);
  const [supporters, setSupporters] = React.useState([])
  useEffect(() => {
    fetch('https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/supporters?start_date=2020-01-01%2000%3A00%3A00&end_date=2021-01-01%2000%3A00%3A00')
            .then(res => res.json())
            .then(json => {
              if(json.body[0]!==undefined){
                console.log(json)
                setLoaded(true);
                setSupporters(json.body)
              }else{
                throw new Error();
              }
            })
            .catch(error => {
              console.log("No Supporters Found")
            });
    }, [])
  //This is temporary, will eventually be gotten from lambda
  const blockTime=30;

  const updateList = (val) => {
    setName(val);
  };

  //for hard filtering
  var newList = (supporters.filter(
    supporter => String(supporter.name.toLowerCase()).includes(name.toLowerCase()))).filter(
    supporter => supporter.rating>=rating).filter(
    supporter => stateTopics.every(val => supporter.topics.includes(val))).filter(
    supporter => stateTags.every(val => supporter.tags.includes(val))).filter(
    supporter => checkTimeInRange(sliderTime[0],sliderTime[1],supporter.timeBlocks)).filter(
      supporter => supporter.day.substring(0,4)===selectedDate.getFullYear().toString() && 
      supporter.day.substring(8,10)===selectedDate.getDate().toString() && supporter.day.substring(5,7)===getTheMonth(selectedDate.getMonth()+1) );

  const getSupporterCard = (supporterObj, s) => {
    //console.log("score"+s)
    return <SupporterCard {...supporterObj} score={s}/>;
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
  /*
  function score(supporter){
    var supporterScore=0
    var count=stateTopics.length+stateTags.length+3
    if(supporter.name.toLowerCase().includes(name.toLowerCase())){
      supporterScore++
    }
    if(supporter.rating>=rating){
      supporterScore++
    }
    for(let i=0;i<stateTags.length;i++){
      if(supporter.tags.includes(stateTags[i])){
        console.log("added tag to count")
        supporterScore++
      }
    }
    for(let i=0;i<stateTopics.length;i++){
      if(supporter.topics.includes(stateTopics[i])){
        supporterScore++
      }
    }
    if(checkTimeInRange(sliderTime[0],sliderTime[1],supporter.timeBlocks)){
      supporterScore++
    }
    return supporterScore/count
  }
  //{mapArray.map(supporterObj => getSupporterCard(supporterObj,scores[supporterObj.id]))}
  var max=1
  var scores = {}
  supporters.map(supporter => scores[supporter.id]=score(supporter))
  console.log(scores)
  var yourArr=[]
  for(let i=0;i<supporters.length;i++){
    yourArr.push(supporters[i].id)
  }
  function compare(a,b) {
    if (scores[a] < scores[b])
      return 1;
    if (scores[a] > scores[b])
      return -1;
    return 0;
  }
  yourArr.sort(compare)
  console.log("sorted array")
  console.log(yourArr)
  */
  function checkTimeInRange(start,end, timeBlockArray){
    for(let i=0;i<timeBlockArray.length;i++){
      if(start<(convertToMin(timeBlockArray[i]["end"]+blockTime)) && end>(convertToMin(timeBlockArray[i]["start"]+blockTime)) && start!==end){
        return true
      }
    }
    return false
  }
  /*var mapArray=[]
  function returnSupporters(array){
    for(let i=0;i<array.length;i++){
      for(let j=0;j<supporters.length;j++){
        if(supporters[j].id===array[i]){
          mapArray.push(supporters[j]);
        }
      }
    }
    return mapArray
  }
  console.log("sorted json")
  console.log(returnSupporters(yourArr))
  */
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
          What is your availability on {selectedDate.toDateString().substring(0,3)+selectedDate.toDateString().substring(3)}?
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
        
        {supporters.length>0 && <Typography align="center" variant="h4">Recommended Supporters</Typography>}
        {supporters.length===0 && <Typography align="center" variant="h4">We couldnt find a supporter with those attributes. Please try widening your search.</Typography>}
        <br/>
        <br/>
        {newList.map(supporterObj => getSupporterCard(supporterObj,[]))}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
