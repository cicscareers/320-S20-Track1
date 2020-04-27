import React from 'react';
import { Chip, Button, Grid, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Badge, Typography  } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import Cookies from "universal-cookie";
import convertTime from "../convertTime.js"
import timeToString from '../timeToString.js'
import cardStyles from './CardStyles'

const SupporterCard = (props) => {
  //Initialize all the constants
  const {name, rating, employer, title, location, topics, tags, imgsrc, timeBlocks, day, linkedin, supporter_id, score, filtered_tags} = props;
  const classes = cardStyles()
  const cookies = new Cookies();
  const studentID = cookies.get("id")
  const IntID=parseInt(studentID)
  const email = cookies.get("email");
  const [apptTopic, setApptTopic] = React.useState("");
  const [time, setTime] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openCreated, setOpenCreated] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const has_tags=supporter_has_tags()
  const startTimes = [];
  
  //Creates a list of tags that were both filtered by and this supporter has
  function supporter_has_tags(){
    const tag_list=[]
    for(let i=0;i<filtered_tags.length;i++){
      if(tags.includes(filtered_tags[i])){
        console.log("added")
        tag_list.push(filtered_tags[i])
      }
    }
    return tag_list
  }

  //Handles the expansion panel being expanded to get rid of top 3 tags when expanded
  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //Sets the appointment topic based on selected chip
  const chipFilter = (item) => { 
    setApptTopic(item);
  }

  //Sets appointment time based on selected chip
  const chipFilterTime = (item) => { 
    setTime(item);
  }

  // Opens modal 1
  const handleButton = (event) => {
    setOpen(true);
  };

  // Closes modal 1
  const handleClose = () => {
    setOpen(false);
  };

  // Closes modal 2
  const handleCloseCreated = () => {
    setOpenCreated(false);
  };

  //Checks that a time and topic was selected
  function validateForm() {
    return apptTopic!="" && time!="";
  };

  //Converts a time string to minutes
  function convertToMin(t){
    return parseInt(t.substring(0, 2))*60+parseInt(t.substring(3,5))
  }

  //Creates an appointment
  //Calls the API
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  //TODO: always switches to confirmed modal no matter what, because lambda does not retrun status codes
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleCreateAppointment(){
    setOpen(false)
    setOpenCreated(true)
    fetch(
      "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/appointments/students",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          student_id: IntID,
          supporter_id: supporter_id,
          time_of_appt: day+" "+timeToString(time)+":00",
          appt_type: apptTopic,
          duration: 30,
          method: "In Person",
          location: "Amazon HQ, Seattle WA",
          comment: comment
        })
      }
    )
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response)
        return response.json();
      } else {
        throw new Error("Server can't be reached!");
      }
    })
    .then(json => {
      //setOpen(false);
      //setOpenCreated(true);
    })
    .catch(error => {
      console.log(error);
    });
  }

  //Creates a single chip given a start time
  function generateTimeChip(st){
    return <Chip
      clickable 
      value={st}
      variant={(time === st) ? 'default' : 'outlined'}
      color="primary" 
      label={convertTime(st)}
      className={classes.tagChip}
      onClick={ () => chipFilterTime(st) }
    />
  }

  //Pushes all possible start times to an array to be converted to chips
  function generateMultipleTimeChips(s,e){
    let st=convertToMin(s)
    let et=convertToMin(e)
    for(let i=st;i<et;i+=30){
       startTimes.push(i);
    }
  }

  //Maps match scores to strings
  function mapScore(s){
    if(s>.75){
      return "Great Match"
    }else if(s>0.5){
      return "Good Match"
    }else if(s>0.25){
      return "OK Match"
    }else{
      return "Poor Match"
    }
  }
  return (
    <ExpansionPanel className={classes.supporterCard} expanded={expanded === name} onChange={handleExpand(name)}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
        {////////////////////////////////////////////////
        //This is the header of the expansion panel
        ////////////////////////////////////////////////
        }
        <Grid container>
          <Grid item xs={2}>
            <Typography className={classes.heading}>{name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.heading}>{mapScore(score)}</Typography>
          </Grid>
          <Grid item xs={5}>
            {!expanded && has_tags[0] && <Chip label={has_tags[0]} size="small" className={classes.filtered_tag} /> || 
              !expanded && tags[0] && <Chip label={tags[0]} size="small" className={classes.tagChip} />}
            {!expanded && has_tags[1] && <Chip label={has_tags[1]} size="small" className={classes.filtered_tag} /> || 
              !expanded && tags[1] && <Chip label={tags[1]} size="small" className={classes.tagChip} />}
            {!expanded && has_tags[2] && <Chip label={has_tags[2]} size="small" className={classes.filtered_tag} /> || 
              !expanded && tags[2] && <Chip label={tags[2]} size="small" className={classes.tagChip} />}
          </Grid>
          <Grid item xs={3}>
            <Rating className={classes.rating} name="Supporter Rating" precision={0.5} value={rating} readOnly />
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {////////////////////////////////////////////////
        //This is the body of the expansion panel
        ////////////////////////////////////////////////
        }
        <Grid container spacing={3}>
          <Grid item xs={4}>
              <Typography>{employer}, {title}</Typography>
              <Typography>{location}</Typography>
              <br/>
              <Typography>Select Appointment Topic:</Typography>
              {topics.map(topic => <Chip 
                clickable 
                value={topic}
                variant={(apptTopic === topic) ? 'default' : 'outlined'}
                color="primary" 
                label={topic} 
                className={classes.tagChip}
                onClick={ () => chipFilter(topic) }
              />)}
              <br/>
              <br/>
              <Typography>Select Appointment Time:</Typography>
              {timeBlocks.map(block => generateMultipleTimeChips(block["start"],block["end"]))}
              {startTimes.map(st => generateTimeChip(st))}
          </Grid>
          <Grid item xs={1} align="center">
          </Grid>
          <Grid item xs={3} align="center">
          <Typography>Supporter Specialties:</Typography>
            {tags.map(tag => (filtered_tags.includes(tag) && <Chip label={tag} size="small" className={classes.filtered_tag} />) 
            || <Chip label={tag} size="small" className={classes.tagChip} />)}
          </Grid>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={2}>
          {linkedin !== "" && (
            <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={
                  <Button className={classes.badgeButton} href={linkedin}>
                    <img border={5}
                      src="https://1000logos.net/wp-content/uploads/2017/03/LinkedIn-Logo.png" 
                      className={classes.badge}/>
                  </Button>
                }
              >
              <Avatar alt={name} src={imgsrc} className={classes.large} />
            </Badge>
          )}
          {linkedin === "" && <Avatar alt={name} src={imgsrc} className={classes.large} />}
          </Grid>
          <Grid item xs={12} align="center">
            <Button
                margin="normal"
                variant="contained"
                color="primary"
                onClick={handleButton}
                disabled={!validateForm()}
              >
                Create Appointment
            </Button>
          </Grid>
        </Grid>
        
      </ExpansionPanelDetails>
      {////////////////////////////////////////////////
        //This is the confirm appointment dialog box
        ////////////////////////////////////////////////
      }
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create appointment with {name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Location: {location}
          </Typography>
          <Typography gutterBottom>
            Time: {convertTime(time)} for 30 minutes on {day}
          </Typography>
          <Typography gutterBottom>
            Appointment Type: {apptTopic}
          </Typography>
          <Typography gutterBottom>
            Additional Comments
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            fullWidth
            rows="4"
            variant="outlined"
            onChange={e => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCreateAppointment}color="primary">
            Create Appointment
          </Button>
        </DialogActions>
      </Dialog>
       {////////////////////////////////////////////////
        //This is the appointment created dialog box
        ////////////////////////////////////////////////
      }
      <Dialog onClose={handleCloseCreated} aria-labelledby="customized-dialog-title" open={openCreated}>
        <DialogTitle id="customized-dialog-title" onClose={handleCloseCreated}>
          Appointment Created
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Your appointment with {name} has been created
          </Typography>
          <Typography gutterBottom>
            You will receive a verification email at {email} to remind you of your appointment
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus href="/appointments" color="primary">
            View Appointments
          </Button>
        </DialogActions>
      </Dialog>
    </ExpansionPanel>
    
    );
	}
	
export default SupporterCard;