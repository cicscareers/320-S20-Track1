import React, { useEffect } from "react";
import {Typography, CircularProgress, Grid, Slider, Fab, Dialog, DialogActions, DialogContent, DialogTitle, Button, Checkbox, TextField, FormControlLabel, FormControl,
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
import moment from 'moment-timezone';

const ResponsiveDrawer = (props) => {
  //Initialize all of the constants
  const classes = useStyles();
  const [open, setOpen]=React.useState(false);
  const [isLoaded, setLoaded] = React.useState(true);
  const [sliderTime, setSliderTime] = React.useState([540, 1020]);
  const [createBlockSelectedDate, handleCreateBlockDateChange] = React.useState(moment().startOf('day'));
  const [currentViewSelectedDate, handleCurrentViewDateChange] = React.useState(moment().startOf('day'));
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

  const typeArray = props.typesList.map((type) => type.specialization_type)

  function fetchSupporterList(url) {
    setLoaded(false);
    asyncFetch(url).then((json) => {
      if(json.body !== undefined) {
        setBlockListFromEndPoint(json.body);
        blockList = json.body;
        setLoaded(true);
      } else {
        setLoaded(true);
        throw new Error(); 
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

  // Filters blockList by date.
  function updateCurrentViewDateBlockList() {
    let currBlockList = [];
    for(let i = 0; i < blockListFromEndPoint.length; i++){
      if(moment.tz(blockListFromEndPoint[i].start_date, 'America/New_York').isSame(currentViewSelectedDate, 'day')) {
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

  // Increments day by one
  function nextDay(){
    handleCurrentViewDateChange(moment(currentViewSelectedDate.add(1, 'days')))
  }

  // Decrements day by one
  function previousDay(){
    handleCurrentViewDateChange(moment(currentViewSelectedDate.subtract(1, 'days')))
  }

  populateUniqueBlocks(updateCurrentViewDateBlockList());

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
              onChange={(date) => moment(handleCurrentViewDateChange)}
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
                    onChange={(date) => moment(handleCreateBlockDateChange)}
                  />
                </Grid>
              </Grid>
              <br/>
              <Typography align="center" gutterBottom>
                Block Time: {moment(createBlockSelectedDate).minutes(sliderTime[0]).format("hh:mm A")} - {moment(createBlockSelectedDate).minutes(sliderTime[1]).format("hh:mm A")}
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
                    onClick={()=> {
                      createAppointmentBlock(
                        id,
                        moment(createBlockSelectedDate).minutes(sliderTime[0]),
                        moment(createBlockSelectedDate).minutes(sliderTime[1]),
                        numberOfWeeks,
                        maxAppointents,
                        isRecurring
                      )

                    }}>
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
