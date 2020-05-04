import React, { useEffect } from "react";
import {Typography, CircularProgress, Grid, Slider, Fab, Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Checkbox, TextField, FormControlLabel, FormControl,
Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import useStyles from "./BlockStyles.js"
import BlockCard from '../BlockCards/BlockCards.js'
import AddIcon from '@material-ui/icons/Add';
import convertTime from "../../../../FindSupporter/convertTime.js"
import { DatePicker} from "@material-ui/pickers";
import {Autocomplete} from '@material-ui/lab';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import createAppointmentBlock from './CreateAppointmentBlock';

const ResponsiveDrawer = (props) => {
  //Initialize all of the constants
  const classes = useStyles();
  const [open, setOpen]=React.useState(false);
  const [error,setError]=React.useState(false);
  const [isLoaded, setLoaded] = React.useState(true);
  const [sliderTime, setSliderTime] = React.useState([540, 1020]);
  const today = new Date();
  const [createBlockSelectedDate, handleCreateBlockDateChange] = React.useState(new Date());
  const [currentViewSelectedDate, handleCurrentViewDateChange] = React.useState(new Date());
  const [isRecurring, setIsRecurring]=React.useState(false);
  const [maxAppointents, setMaxAppointents]=React.useState(1);
  const [numberOfWeeks, setNumberOfWeeks]=React.useState(1);
  const [appointmentTypes, setAppointmentTypes]=React.useState([]);
  const [blockListFromEndPoint, setBlockListFromEndPoint] = React.useState([]);
  var blockList = [];
  const id = sessionStorage.getItem("id");
  const get_blocks_url = "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/supporters/"+id+"/blocks";

  //Calls the API to get the list of supporters
  useEffect(() => {
    fetchSupporterList(get_blocks_url);
  }, [])

  // Refer to this: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
  async function asyncFetch(get_blocks_url) {
    let response = await fetch(get_blocks_url);
    let json = await response.json();
    return json;
  }

  function populateTypeArray(json){
    var arr = []
    for(let i=0;i<json.length;i++){
      arr.push(json[i].specialization_type)
    }
    return arr
  }

  const typeArray = populateTypeArray(props.typesList)

  function fetchSupporterList(url) {
    setLoaded(false);
    asyncFetch(url).then((json) => {
      if(json.body !== undefined) {
        setBlockListFromEndPoint(json.body);
        blockList = json.body;
        setLoaded(true);
      } else {
        throw new Error();
        setLoaded(true);
      }
    })
    .catch(error => {
        setLoaded(true);
        console.log("No Supporters Found")
      });
  }
  
  const getBlockCard = (blockObj, s) => {
    return <BlockCard {...blockObj}/>;
  };

  const handleSliderChange = (event, newValue) => {
    setSliderTime(newValue);
  };

  function updateCurrentViewDateBlockList() {
    let currBlockList = [];
    for(let i =0;i<blockListFromEndPoint.length;i++){
      let currStartDate = new Date(blockListFromEndPoint[i].start_date);
      let blockDate = new Date(currStartDate.getFullYear(), currStartDate.getMonth(), currStartDate.getDate());
      let currDateNoTime = new Date(currentViewSelectedDate.getFullYear(), currentViewSelectedDate.getMonth(), currentViewSelectedDate.getDate());
      if(currDateNoTime.getTime()===blockDate.getTime()) {
        currBlockList.push(blockListFromEndPoint[i]);
      }
    }
    return currBlockList;
  }
  
  function populateUniqueBlocks(currBlockList){
    let specializationList = getAllSupporterSpecializationsToBlocks();
    for(let i =0;i<currBlockList.length;i++){
      currBlockList[i].specializations = specializationList;
      if(currBlockList[i].recurring_id!==null){
        if(i !== currBlockList.length - 1){
          var j=i+1
          while(currBlockList[j].recurring_id===currBlockList[i].recurring_id){
            currBlockList.splice(j,j)
          }
        }
      }
    }
    blockList = currBlockList;
  }
  
  function getAllSupporterSpecializationsToBlocks() {
    let specializationList = [];
    for(let i = 0; i < props.settings.specialization_types.length; i++) {
      specializationList.push(props.settings.specialization_types[i].specialization_type)
    }
    return specializationList
  }

  function nextDay(){
    var newDate = new Date()
    newDate.setMonth(currentViewSelectedDate.getMonth())
    newDate.setDate(currentViewSelectedDate.getDate() + 1);
    handleCurrentViewDateChange(newDate)
  }

  //Decrements day by one
  function previousDay(){
    var newDate = new Date()
    newDate.setMonth(currentViewSelectedDate.getMonth())
    newDate.setDate(currentViewSelectedDate.getDate() - 1);
    handleCurrentViewDateChange(newDate)
  }

  populateUniqueBlocks(updateCurrentViewDateBlockList());

  if(error){
    return (
      <div align="center">
        <br></br>
        <Typography variant="h6">There was a connection error. We may be performing maintenance on the site.</Typography>
      </div>
    )
  }

  else if(!isLoaded){
    return (
      <div align="center">
        <br></br>
        <Typography variant="h4">Loading...</Typography>
        <br></br>
        <CircularProgress />
      </div>
    )
  }


  else{
    return (
      <div className={classes.root}>
      <Grid container>
        <Grid container item xs={12} alignItems="center" spacing={2} justify="center">
            <Grid item>
              <Button onClick={previousDay}>
                <NavigateBeforeIcon fontSize="large"></NavigateBeforeIcon>
              </Button>
            </Grid>
            <Grid item>
              <DatePicker
              autoOk
              align="center"
              variant="inline"
              value={currentViewSelectedDate}
              onChange={handleCurrentViewDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            </Grid>
            <Grid item>
              <Button onClick={nextDay}>
                <NavigateNextIcon fontSize="large"></NavigateNextIcon>
              </Button>
            </Grid>
          </Grid>
        <br/>
        <br/>
        <Grid container item xs={12} align="center" className={classes.blockList}>
          <main className={classes.content}>
            {blockList.map(blockObj => getBlockCard(blockObj))}
            <Fab onClick={() => setOpen(true)} color="primary" className={classes.fab}>
              <AddIcon />
            </Fab>

            <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
              <DialogTitle id="customized-dialog-title" align="center" onClose={() => setOpen(false)}>
                  Create a new appointment block
              </DialogTitle>
              <DialogContent dividers>
              <Grid container>
                <Grid item xs={5}>
                  <Typography className={classes.dateName} inline>Block Date: </Typography>
                </Grid>
                <Grid item xs={7}>
                  <DatePicker
                    autoOk
                    align="center"
                    variant="inline"
                    value={createBlockSelectedDate}
                    onChange={handleCreateBlockDateChange}
                  />
                </Grid>
              </Grid>
              <br/>
              <Typography align="center" gutterBottom>
                Block Time: {convertTime(sliderTime[0])} - {convertTime(sliderTime[1])} EST
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
                getAriaValueText={convertTime}
              />
              <br/>
              <br/>
              <Autocomplete
                multiple
                className={classes.form}
                options={typeArray}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Appointment Types"
                />
                )}
                onChange={(e,v) => setAppointmentTypes(v)}
                />
              <br/>
              <br/>
              <FormControl fullWidth>
                  <InputLabel fullWidth>Maximum number of appointments</InputLabel>
                  <Select
                    value={maxAppointents}
                    onChange={(e) => setMaxAppointents(e.target.value)}
                    input={<Input />}
                    fullWidth
                  >
                    {["1","2","3","4","5","6","7","8","9","10"].map((number) => (
                      <MenuItem value={number}>{number}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              <br/>
              <br/>
              <FormControlLabel
                control={<Checkbox checked={isRecurring} color="primary" onChange={() => setIsRecurring(!isRecurring)} />}
                label="Repeat Weekly?"
              />
              <br/>
              <br/>
              {isRecurring && (<FormControl fullWidth>
                  <InputLabel fullWidth>Times this block will repeat</InputLabel>
                  <Select
                    value={numberOfWeeks}
                    onChange={(e) => setNumberOfWeeks(e.target.value)}
                    input={<Input />}
                    fullWidth
                  >
                    {["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"].map((number) => (
                      <MenuItem value={number}>{number}</MenuItem>
                    ))}
                  </Select>
                </FormControl>)}
            </DialogContent>
              <DialogActions>
                  <Button
                    autoFocus
                    color="primary"
                    variant="contained"
                    onClick={()=>
                      createAppointmentBlock(
                        id, 
                        createBlockSelectedDate, 
                        sliderTime[0], 
                        sliderTime[1], 
                        numberOfWeeks, 
                        maxAppointents, 
                        isRecurring
                      )}>
                    Create block
                  </Button>
              </DialogActions>
            </Dialog>
          </main>
        </Grid>
        </Grid>
      </div>
    );
  }
}

export default ResponsiveDrawer;
