import React, { useEffect } from "react";
import {Typography, CircularProgress, Grid, Slider, Fab, Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, } from '@material-ui/core';
import useStyles from "./BlockStyles.js"
import BlockCard from '../BlockCards/BlockCards.js'
import BlockList from '../Blocks.js'
import AddIcon from '@material-ui/icons/Add';
import convertTime from "../../../../FindSupporter/convertTime.js"
import { DatePicker} from "@material-ui/pickers";



const ResponsiveDrawer = (props) => {
  //Initialize all of the constants
  const classes = useStyles();
  const [open, setOpen]=React.useState(false);
  const [isLoaded, setLoaded] = React.useState(true);
  const [sliderTime, setSliderTime] = React.useState([540, 1020]);
  const [selectedDate, handleDateChange] = React.useState(new Date());

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
            <DialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
                Create a new appointment block
            </DialogTitle>
            <DialogContent dividers>
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
              <Typography gutterBottom>
                What Time?
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
