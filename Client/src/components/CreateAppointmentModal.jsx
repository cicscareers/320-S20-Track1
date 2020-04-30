import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import {Grid, Button, Box, TextField} from '@material-ui/core';
import { DatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    inputs: {
      marginLeft: "5%",
      marginRight: "5%",
      width:"50%"
    },
}));

const CreateAppointmentModal = (props) => {
  const [name,setName]=React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));

  function roundTime(date) {
    var minutes = date.getMinutes();
    var hours = date.getHours();

    var roundedMinutes = (parseInt((minutes + 7.5)/15) * 15) % 60;
    var roundedHours = minutes > 52 ? (hours === 23 ? 0 : ++hours) : hours;

    return date;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const classes = useStyles();

  return (
    <Container component = 'main'>
      <Card style={{padding: 20, margin: 30}}>
        <Grid lg = {12} style={{marginLeft: 18, marginTop: 30}}>
        <div align="center">
          <TextField
            variant="outlined"
            margin="normal"
            className={classes.inputs}
            align="center"
            placeholder="Student Email"
            onChange={e => setName(e.target.value)}
          />
          </div>
        </Grid>
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
        <div align="center">
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </div>
        <Grid lg = {12} style = {{display: 'flex', justifyContent: 'marginLeft'}}>
          <Button href='/appointments' style={{width: 150, color: '#FFFFFF', backgroundColor: '#881c1c', marginTop: 50}}>Create Appointment</Button>
        </Grid>
      </Card>
    </Container>
  );
}

export default CreateAppointmentModal;



