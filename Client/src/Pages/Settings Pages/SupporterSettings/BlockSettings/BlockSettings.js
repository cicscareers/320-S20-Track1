import React from 'react';
import {Card, Typography, makeStyles, Grid, Select, Input, MenuItem, FormControl, InputLabel} from '@material-ui/core';

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
    },
    leftInput: {
      paddingRight: theme.spacing(6),
    }
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
            <Typography align="center"><b>Appointment Block Type: </b>{specialization_type}</Typography>
            <br/>
            <Grid container>
              <Grid item xs={6} className={classes.leftInput}>
                
                <FormControl fullWidth>
                  <InputLabel fullWidth>Appointment Duration</InputLabel>
                  <Select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    input={<Input />}
                    fullWidth
                  >
                    {["15","30","45","60","75","90","105","120"].map((number) => (
                      <MenuItem value={number}>{number}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth>
                  <InputLabel fullWidth>Maximum Number of Students</InputLabel>
                  <Select
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    input={<Input />}
                    fullWidth
                  >
                    {["1","2","3","4","5","6","7","8","9","10"].map((number) => (
                      <MenuItem value={number}>{number}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
        </Card>
        <br/>
    </div>
    );
}
	
export default BlockCard;