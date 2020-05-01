import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, Grid} from '@material-ui/core';
import classes from './CardStyles'
import convertTime from '../../../../FindSupporter/convertTime'

const BlockCard = (props) => {
  //Initialize all the constants
  const {appointment_id, recurring_id,start_date,end_date,max_appointments, specializations} = props;

  const days_of_week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  const Block_Date=new Date()
  const date_strings=init_datetimes()
  const week_day= date_strings[0]
  const month_name = date_strings[1]
  const day = date_strings[2]

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
        <CardActions>
            <Button size="small">Delete Block</Button>
        </CardActions>
        </Card>
        <br/>
    </div>
    
    );
}
	
export default BlockCard;