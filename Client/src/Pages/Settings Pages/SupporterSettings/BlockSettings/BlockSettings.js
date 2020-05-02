import React from 'react';
import {Card, Typography, makeStyles, Slider} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(2),
      align: "center",
      padding: 4
    },
    button: {
      width: "100%",
      marginTop: theme.spacing(2),
      align: "center",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingRight: theme.spacing(100),
    },
}));

function assertInt(num){
    return Number.isInteger(num)
}

const BlockCard = (props) => {
  const classes = useStyles()
  const {specialization_type, duration, max_students, settings} = props
  const [length, setLength]=React.useState(duration)
  const [max, setMax]=React.useState(max_students)
  return (
    <div>
        <Card className={classes.content}>
            <Typography variant="h6">Appointment Block Type: {specialization_type}</Typography>
            <br/>
            <Typography variant="h6">Appointment Duration: {length} minutes</Typography>
            <Slider
                value={typeof length === 'number' ? length : 0}
                onChange={(event, newValue) => setLength(newValue)}
                step={15}
                min={15}
                max={120}
            />
            <Typography variant="h6">Maximum Number of Students: {max}</Typography>
            <Slider
                value={typeof max === 'number' ? max : 0}
                onChange={(event, newValue) => setMax(newValue)}
                step={1}
                min={1}
                max={10}
            />
        </Card>
        <br/>
    </div>
    );
}
	
export default BlockCard;