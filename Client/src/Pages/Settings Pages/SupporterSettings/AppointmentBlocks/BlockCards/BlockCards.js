import React, {useState} from 'react';
import { Typography, Button, Card, CardActions, CardContent, Grid, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import classes from './CardStyles';
import deleteAppointmentBlock from './deleteAppointmentBlock';
import moment from 'moment-timezone';

const BlockCard = (props) => {
  //Initialize all the constants
  const {appointment_block_id, recurring_id, start_date, end_date, max_appointments, specializations} = props;

  var start_date_moment = moment.tz(start_date, 'America/New_York');
  var end_date_moment = moment.tz(end_date, 'America/New_York');

  const id = sessionStorage.getItem("id");
  const [openRecurringDeleteDialog, setOpenRecurringDeleteDialog] = useState(false);

  function specializationArrayToString(array){
    return [array.slice(0, -1).join('', ''), array.slice(-1)[0]].join(array.length < 2 ? '' : ' and ')
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
                        <b>Start Time: </b>{start_date_moment.format("hh:mm A")}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" className={classes.title} gutterBottom component="h2">
                    <b>End Time: </b>{end_date_moment.format("hh:mm A")}
                    </Typography>
                </Grid>
            </Grid>
            {recurring_id && ( <Typography><b>Occurs every: </b>{start_date_moment.format('dddd')}</Typography>)}
            {!recurring_id && ( <Typography><b>Occurs on: </b>{start_date_moment.format('dddd, MMM DDD')}</Typography>)}
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