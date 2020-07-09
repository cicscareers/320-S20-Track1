import React, {useState} from 'react';
import { Typography, Button, Card, CardActions, CardContent, Grid, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import classes from './CardStyles';
import convertTime from '../../../../FindSupporter/convertTime';
import deleteAppointmentBlock from './deleteAppointmentBlock';
import moment from 'moment';

const BlockCard = (props) => {
  //Initialize all the constants
  const {appointment_block_id, recurring_id,start_date,end_date,max_appointments, specializations} = props;

  const Block_Date = moment(start_date);
  console.log(Block_Date.toISOString());
  const id = sessionStorage.getItem("id");
  const [openRecurringDeleteDialog, setOpenRecurringDeleteDialog] = useState(false);

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
            {recurring_id && ( <Typography><b>Occurs every: </b>{Block_Date.format('dddd')}</Typography>)}
            {!recurring_id && ( <Typography><b>Occurs on: </b>{Block_Date.format('dddd, MMM DDD')}</Typography>)}
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