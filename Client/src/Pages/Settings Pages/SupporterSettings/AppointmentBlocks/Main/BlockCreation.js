import React, { useEffect } from "react";
import {Typography, CircularProgress, Grid, Slider, Fab, Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import useStyles from "./BlockStyles.js"
import BlockCard from '../BlockCards/BlockCards.js'
import BlockList from '../Blocks.js'
import AddIcon from '@material-ui/icons/Add';
import convertTime from "../../../../FindSupporter/convertTime.js"
import { DatePicker} from "@material-ui/pickers";
import AppointmentTypesList from '../../SupporterInformation/Specializations'
import {Autocomplete} from '@material-ui/lab'



const ResponsiveDrawer = (props) => {
  //Initialize all of the constants
  const classes = useStyles();
  const [open, setOpen]=React.useState(false);
  const [isLoaded, setLoaded] = React.useState(true);
  const [sliderTime, setSliderTime] = React.useState([540, 1020]);
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [isRecurring, setIsRecurring]=React.useState(false);
  const [maxAppointents, setMaxAppointents]=React.useState(1);
  const [numberOfWeeks, setNumberOfWeeks]=React.useState(1)
  const [appointmentTypes, setAppointmentTypes]=React.useState([])

  useEffect(() => {
    
    }, [])

  
  //Creates a new supporter card a supporter
  
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
              <Typography align="center">What day should the block be created on?</Typography>
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
              <Typography align="center" gutterBottom>
                What time should the block be created at?
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
              <Typography align="center" className={classes.content} id="range-slider" gutterBottom>
                {convertTime(sliderTime[0])} - {convertTime(sliderTime[1])} EST
              </Typography>
              <Typography align="center" className={classes.content} id="range-slider" gutterBottom>
                Maximum number of appointments during this block: {maxAppointents}
              </Typography>
              <Slider
                value={typeof maxAppointents === 'number' ? maxAppointents : 0}
                onChange={(event, newValue) => setMaxAppointents(newValue)}
                step={1}
                min={1}
                max={10}
              />
              <br/>
              <br/>
              <Autocomplete
                multiple
                className={classes.form}
                options={AppointmentTypesList}
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
              <FormControlLabel
                control={<Checkbox checked={isRecurring} color="primary" onChange={() => setIsRecurring(!isRecurring)} />}
                label="Repeat Weekly?"
              />
              {isRecurring && (
                <Typography align="center" className={classes.content} id="range-slider" gutterBottom>
                  Times this block will repeat: {numberOfWeeks}
                </Typography>
              )}
              {isRecurring && (<Slider
                value={typeof numberOfWeeks === 'number' ? numberOfWeeks : 0}
                onChange={(event, newValue) => setNumberOfWeeks(newValue)}
                step={1}
                min={1}
                max={16}
              />)}
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
