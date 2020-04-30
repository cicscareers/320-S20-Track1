import React from 'react';
import { Typography, Button, Card, CardActions, CardContent } from '@material-ui/core';
import classes from './CardStyles'

const BlockCard = (props) => {
  //Initialize all the constants
  const {appointment_id, recurring_id,start_date,end_date,max_appointments} = props;

  return (
    <div>
        <Card className={classes.root}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Start Date: {start_date} End Date: {end_date}
            </Typography>
            <Typography variant="h5" component="h2">
                {recurring_id && "This block is recurring"}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                adjective
            </Typography>
            <Typography variant="body2" component="p">
                well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
            </Typography>
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