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
  console.log(Block_Date.getDay())

  return (
    <div>
        <Card className={classes.root}>
        <CardContent>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h6" className={classes.title} color="textSecondary" gutterBottom component="h2">
                        Start Time: {start_date}
                    </Typography>
                    <Typography variant="h6" className={classes.title} color="textSecondary" gutterBottom component="h2">
                        End Time: {end_date}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="h2">
                    {recurring_id && "This block is recurring"}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        The maximum number of appointments in this block is {max_appointments}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
        </Card>
        <br/>
    </div>
    
    );
}
	
export default BlockCard;