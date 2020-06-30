import React, {useState} from 'react';
import { Typography, Button, Card, CardActions, CardContent, Grid, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import classes from './CardStyles';
import convertTime from '../../../../FindSupporter/convertTime';
import deleteAppointmentBlock from './deleteAppointmentBlock';

const BlockCard = (props) => {
  //Initialize all the constants
  const {appointment_block_id, recurring_id,start_date,end_date,max_appointments, specializations} = props;

  const days_of_week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  const Block_Date=new Date()
  const date_strings=init_datetimes()
  const week_day= date_strings[0]
  const month_name = date_strings[1]
  const day = date_strings[2]
  const id = sessionStorage.getItem("id");
  const [openRecurringDeleteDialog, setOpenRecurringDeleteDialog] = useState(false);

  function  init_datetimes(){
    Block_Date.setYear(parseInt(start_date.substring(0,4)))
    Block_Date.setMonth(parseInt(start_date.substring(5,7))-1)
    Block_Date.setDate(parseInt(start_date.substring(8,10)))
    const year = parseInt(start_date.substring(0,4))
    const month = parseInt(start_date.substring(5,7))-1
    const day = parseInt(start_date.substring(8,10))
    Block_Date.setYear(year)
    Block_Date.setMonth(month)
    Block_Date.setDate(day)
    const week_day= days_of_week[Block_Date.getDay()].toString()
    const month_name = months[Block_Date.getMonth()].toString()
    return [week_day, month_name, day]
  }

  function specializationArrayToString(array){
    var str=""
    for(let i=0;i<array.length;i++){
        if(i===array.length-1){
            str+="and " + array[i]
        }else{
            str+=array[i]+", "
        }
    }
    return str
  }

  function convertToCorrectTimeString(t){
    var minutes=parseInt(t.substring(0, 2))*60+parseInt(t.substring(3,5));
    return convertTime(minutes)
  }

  function deleteAppointmentOrSurfaceDialog(id, appointment_block_id, recurring_id) {
    if(recurring_id !== null) {
      setOpenRecurringDeleteDialog(true);
    } else {
      deleteAppointmentBlock(id, appointment_block_id, recurring_id, false);
    }
  }

  return (
    <div>
        <Card className={classes.root}>
        <CardContent>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h6" className={classes.title}gutterBottom component="h2">
                        <b>Start Time: </b>{convertToCorrectTimeString(start_date.substring(11,16))}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" className={classes.title} gutterBottom component="h2">
                    <b>End Time: </b>{convertToCorrectTimeString(end_date.substring(11,16))}
                    </Typography>
                </Grid>
            </Grid>
            {recurring_id && ( <Typography><b>Occurs every: </b>{week_day}</Typography>)}
            {!recurring_id && ( <Typography><b>Occurs on: </b>{week_day}, {month_name} {day}</Typography>)}
            <Typography>
                <b>Maximum Appointments: </b>{max_appointments}
            </Typography>
            <Typography>
                <b>Specializations: </b>{specializationArrayToString(specializations)}
            </Typography>
        </CardContent>
        <Grid container>
        <Grid item xs={5}/>
        <Grid item xs={2}>
        <CardActions alignSelf="right">
            <Button size="small"
              color="primary" 
              variant="contained"
              onClick={() => deleteAppointmentOrSurfaceDialog(id, appointment_block_id, recurring_id)}
            >
              Delete Block
            </Button>
        </CardActions>
        </Grid>
        <Grid item xs={5}/>
        </Grid>
        <Dialog onClose={()=>setOpenRecurringDeleteDialog(false)} aria-labelledby="customized-dialog-title" open={openRecurringDeleteDialog}>
            <DialogTitle id="customized-dialog-title" align="center" onClose={() => ()=>setOpenRecurringDeleteDialog(false)}>
                Delete Recurring Block
            </DialogTitle>
            <DialogContent dividers>
              <DialogActions>
                <Grid container>
                <Grid item xs={6}>
                  <Button 
                    size="small" 
                    color="primary" 
                    variant="contained" 
                    onClick={() => deleteAppointmentBlock(id, appointment_block_id, recurring_id, false)}
                  >
                    This Block
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    size="small" 
                    color="primary"
                    variant="contained" 
                    onClick={() => deleteAppointmentBlock(id, appointment_block_id, recurring_id, true)}
                  >
                    All Blocks
                  </Button>
                </Grid>
                </Grid>
              </DialogActions>
            </DialogContent>
        </Dialog>
        </Card>
        <br/>
    </div>
    
    );
}
	
export default BlockCard;