import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, Grid} from '@material-ui/core';
import classes from './CardStyles'

const BlockCard = (props) => {
  //Initialize all the constants
  const {appointment_id, recurring_id,start_date,end_date,max_appointments} = props;

  const days_of_week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const Block_Date=new Date()
  Block_Date.setYear(parseInt(start_date.substring(0,4)))
  Block_Date.setMonth(parseInt(start_date.substring(5,7))-1)
  Block_Date.setDate(parseInt(start_date.substring(8,10)))
  const week_day= days_of_week[Block_Date.getDay()].toString()

  return (
    <div>
        <Card className={classes.root}>
        <CardContent>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h6" className={classes.title} color="textSecondary" gutterBottom component="h2">
                        Start Time: {start_date.substring(11,16)}
                    </Typography>
                    <Typography variant="h6" className={classes.title} color="textSecondary" gutterBottom component="h2">
                        End Time: {end_date.substring(11,16)}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    {recurring_id && (<Typography variant="h6" component="h2">This block occurs every {week_day}</Typography>)}
                    {!recurring_id && (<Typography variant="h6" component="h2">This block occurs on {week_day} , {start_date.substring(0,10)}</Typography>)}
                    <Typography className={classes.pos} color="textSecondary">
                        The maximum number of appointments in this block is {max_appointments}
                    </Typography>
                </Grid>
            </Grid>
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