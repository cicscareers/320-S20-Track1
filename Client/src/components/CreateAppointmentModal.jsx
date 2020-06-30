import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import {Grid, Button, Box, TextField, CardContent} from '@material-ui/core';
import { DatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import {makeStyles} from '@material-ui/core';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const role = cookies.get("role");

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    inputs: {
    },
    createAppointmentdatePicker: {
      top: theme.spacing(4.1),
      marginLeft: "2%",
      marginRight: "2%",
    },
    createAppointmentButton: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
}));

const CreateAppointmentModal = (props) => {

  const [selectedDate, setSelectedDate] = useState(roundTime(new Date(Date.now())));
  const [medium, setMedium] = useState("In person");
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");
  console.log(sessionStorage.getItem("email"))
  const [supporterEmail, setSupporterEmail] = useState(sessionStorage.getItem("email"));
  const [studentEmail, setStudentEmail] = useState("");
  const [appointmentType, setappointmentType] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  //Creates an appointment
  //Calls the API
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  //TODO: always switches to confirmed modal no matter what, because lambda does not retrun status codes
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleCreateAppointment(){
    let year = selectedDate.getFullYear().toString();
    let month = getTheMonth((selectedDate.getMonth() + 1));
    let day = getTheMonth(selectedDate.getDate()).toString();
    let time = selectedDate.toString().substring(16,21);
    setDisableButton(true);
    fetch(
      "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/prod/appointments/students",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          student_email: studentEmail,
          supporter_email: supporterEmail,
          selected_tags: [],
          specialization: "Interviewing",
          time_of_appt: year+"-"+month+"-"+day+" "+time+":00",
          duration: 30,
          medium: "pigeon",
          location: location,
          comment: "",
          override: "true"
      })
      }
    )
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        throw new Error("Server can't be reached!");
      }
    })
    .then(json => {
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
    });

  }

  function setSupporterEmailForBothRoles(email, isAdmin) {
    if(isAdmin) {
      console.log('$$$$$$$$$$$$$$$$$$$$')
      setSupporterEmail(email);
    }
  }

  function getTheMonth(month){
    if (parseInt(month)>10){
      return month.toString();
    }
    else{
      return "0".concat(month.toString());
    }
  }

  function roundTime(date) {
    let minutes = date.getMinutes();
    let rem = minutes % 15;
    let hours = date.getHours();
    let roundedDate = date;
    if(minutes < 15) {
      if(rem < 15/2) {
        roundedDate = new Date(date.setMinutes(0));
      } else {
        roundedDate = new Date(date.setMinutes(15));
      }
    }
    else if(minutes < 30) {
      if(rem < 15/2) {
        roundedDate = new Date(date.setMinutes(15));
      } else {
        roundedDate = new Date(date.setMinutes(30));
      }
    }
    else if(minutes < 45) {
      if(rem < 15/2) {
        roundedDate = new Date(date.setMinutes(30));
      } else {
        roundedDate = new Date(date.setMinutes(45));
      }
    }
    else if(minutes < 60) {
      if(rem < 15/2) {
        roundedDate = new Date(date.setMinutes(45));
      } else {
        roundedDate = new Date(date.setMinutes(60));
      }
    }
    return roundedDate;
  }

  const handleDateChange = (date) => {
    setSelectedDate(roundTime(date));
  };

  const classes = useStyles();

  return (
    <Container>
        <Grid container lg = {12}>
          <Grid item xs={5}>
            <TextField
              variant="outlined"
              margin="normal"
              className={classes.inputs}
              align="center"
              placeholder="Student Email"
              onChange={e => setStudentEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            {role==="admin" && <TextField
              variant="outlined"
              margin="normal"
              className={classes.inputs}
              align="center"
              placeholder="Supporter Email"
              onChange={e => setSupporterEmailForBothRoles(e.target.value, role==="admin")}
              fullWidth
            >
            </TextField>}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={5}>
          <DatePicker
            autoOk
            align="center"
            variant="inline"
            value={selectedDate}
            onChange={handleDateChange}
            className={classes.createAppointmentdatePicker}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            fullWidth
          />
        </Grid>
      </Grid>
        
      <Grid container>
        <Grid item xs={5} className='location'>
          <TextField
            variant="outlined"
            margin="normal"
            className={classes.inputs}
            align="center"
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5} className='medium'>
          <TextField
            variant="outlined"
            margin="normal"
            className={classes.inputs}
            align="center"
            placeholder="Medium"
            onChange={e => setMedium(e.target.value)}
          />
        </Grid>
      </Grid>
      <TextField
        variant="outlined"
        margin="normal"
        className={classes.inputs}
        align="center"
        placeholder="Comments (Optional)"
        onChange={e => setComment(e.target.value)}
        fullWidth
        multiline
        rows="4"
      />
        <Grid className={classes.createAppointmentButton}>
          <Button 
            onClick={handleCreateAppointment}
            disabled={disableButton} 
            variant="contained"
            color="primary">Create Appointment
          </Button>
        </Grid>
    </Container>
  );
}

export default CreateAppointmentModal;



