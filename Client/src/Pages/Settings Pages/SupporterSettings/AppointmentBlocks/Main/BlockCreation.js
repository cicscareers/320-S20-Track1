import React, { useEffect } from "react";
import {Typography, CircularProgress, Grid, Slider, Fab, Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Checkbox, TextField, FormControlLabel, FormControl,
Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import useStyles from "./BlockStyles.js"
import BlockCard from '../BlockCards/BlockCards.js'
import BlockList from '../Blocks.js'
import AddIcon from '@material-ui/icons/Add';
import convertTime from "../../../../FindSupporter/convertTime.js"
import { DatePicker} from "@material-ui/pickers";
import {Autocomplete} from '@material-ui/lab'



const ResponsiveDrawer = (props) => {
  //Initialize all of the constants
  const classes = useStyles();
  const [open, setOpen]=React.useState(false);
  const [error,setError]=React.useState(false);
  const [isLoaded, setLoaded] = React.useState(true);
  const [sliderTime, setSliderTime] = React.useState([540, 1020]);
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [isRecurring, setIsRecurring]=React.useState(false);
  const [maxAppointents, setMaxAppointents]=React.useState(1);
  const [numberOfWeeks, setNumberOfWeeks]=React.useState(1)
  const [appointmentTypes, setAppointmentTypes]=React.useState([])
  const [appointmentTypesList, setAppointmentTypesList]=React.useState([])

  useEffect(() => {
    fetchSupporterList("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/prod/table/specialization-types");
  }, [])

  // Refer to this: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
  async function myFetch(url) {
    let response = await fetch(url);
    let json = await response.json();
    return json;
  }

  function fetchSupporterList(url) {
    setLoaded(false);
    myFetch(url).then((json) => {
      if(json.specialization_types !== undefined) {
        console.log(json.specialization_types[0].specialization_type)
        setAppointmentTypesList(json.specialization_types);
        setLoaded(true);
      } else {
        throw new Error();
      }
    })
    .catch(error => {
        setError(true)
        setLoaded(true);
        console.log("Error Connectting to API")
      });
  }

  function populateTypeArray(json){
    var arr = []
    for(let i=0;i<json.length;i++){
      arr.push(json[i].specialization_type)
    }
    console.log(arr)
    return arr
  }

  const typeArray = populateTypeArray(appointmentTypesList)
  
  const getBlockCard = (blockObj, s) => {
    return <BlockCard {...blockObj}/>;
  };

  const handleSliderChange = (event, newValue) => {
    setSliderTime(newValue);
  };
  
  function populateUniqueBlocks(){
    for(let i =0;i<BlockList.length;i++){
      if(BlockList[i].recurring_id!==null){
        var j=i+1
        while(BlockList[j].recurring_id===BlockList[i].recurring_id){
          BlockList.splice(j,j)
        }
      }
    }
  }

  populateUniqueBlocks()
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
        <main className={classes.content}>
          {BlockList.map(blockObj => getBlockCard(blockObj))}
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
                    value={selectedDate}
                    onChange={handleDateChange}
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
                <Button autoFocus color="primary" variant="contained">
                  Create block
                </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    );
  }
}

export default ResponsiveDrawer;
