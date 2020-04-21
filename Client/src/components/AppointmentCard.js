import React from 'react';
import { makeStyles, Modal, Paper, IconButton, Chip, Button, Grid, Container, Box, Card, CardContent, CardActions, Avatar } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import blue from '@material-ui/core/colors/blue';
import smileRate from "../components/ratings";
import Cancel from './cancelAppt'
import Feedback from './feedback'


const tagColor = blue.A300;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  gridpic: {
    marginLeft: "80%"
  },
  picture: {
    marginLeft: "55%",
    height: "100%",
  },
  paper: {
    height: "100%",
    width: "130%",
  },
  rating: {
    marginLeft: "20%"
  },
  dayselect: {
    marginLeft: "40%"
  },
  tagChip: {
      margin: theme.spacing(0.5),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  large: {
    marginLeft: "55%",
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));


const PreviousAppointmentCard = (props) => {
    console.log(props.role);
    console.log(props.student);
    const [cancelAppointmentModalOpen, setCancelAppointmentModalOpen] = React.useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = React.useState(false);

    const handleOpenAppointmentModal = () => {
        setCancelAppointmentModalOpen(true);
      };
    
    const handleCloseAppointmentModal = () => {
        setCancelAppointmentModalOpen(false);
      };
    const handleOpenFeedbackModal = () => {
        setFeedbackModalOpen(true);
      };
    
    const handleCloseFeedbackModal = () => {
        setFeedbackModalOpen(false);
      };
    
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [date,setDate]=React.useState(15);

    const handleBack = () => {
        setDate(date-1);
    };

    const handleNext = () => {
        setDate(date+1);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    function supporterViewAppointmentCard(){
            return (
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{props.student}</Typography>
            <Typography className={classes.secondaryHeading}>{props.date + ' from ' + props.start + ' to ' + props.end}</Typography>
            <Typography className={classes.secondaryHeading} style={{marginLeft: '20%'}}>{props.subject}</Typography> 
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                  <Typography>{props.location}</Typography>
                  <Typography>{props.medium}</Typography>
                  <br/>
                  <Typography className={classes.tagChip}>No Comments</Typography>
                  
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Avatar alt="c" src={props.studentProfilePic}
                   className={classes.large} />       
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                    margin="normal"
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAppointmentModal}
                  >
                    Cancel Appointment
                </Button>
                <Modal
                  open={cancelAppointmentModalOpen}
                  onClose={handleCloseAppointmentModal}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
              <Cancel></Cancel>
              </Modal>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        );
    }

    function studentViewAppointmentCard(){
      return (
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{props.supporter}</Typography>
            <Typography className={classes.secondaryHeading}>{props.date + ' from ' + props.start + ' to ' + props.end}</Typography>
            <Typography className={classes.secondaryHeading} style={{marginLeft: '20%'}}>{props.subject}</Typography> 
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                  <Typography>{props.location}</Typography>
                  <Typography>{props.medium}</Typography>
                  <br/>
                  <Typography className={classes.tagChip}>No Comments</Typography>
                  
              </Grid>
              <Grid item xs={12} sm={6}>
                
                  <Avatar src={props.supporterProfilePic}
                   className={classes.large} />
               
              </Grid>
              <Grid item xs={12} align="center">
              {props.upcoming ? (
                <Button
                    margin="normal"
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAppointmentModal}
                  >
                    Cancel Appointment
                </Button>
                ) :
                (
                  <Button
                    margin="normal"
                    variant="contained"
                    color="primary"
                    onClick={handleOpenFeedbackModal}
                  >
                    Submit Feedback
                  </Button>
                )}

                <Modal
                  open={cancelAppointmentModalOpen}
                  onClose={handleCloseAppointmentModal}
                >
                  <Cancel></Cancel>
                </Modal>

                <Modal
                  open={feedbackModalOpen}
                  onClose={handleCloseFeedbackModal}
                >
                <Feedback subject = {props.subject}
                    location = {props.location}
                    medium = {props.medium}
                    time = {props.time}
                    date = {props.date}
                    supporter = {props.supporter}
                    profilepic = {props.profilepic}></Feedback>
                </Modal>

              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        );
      }
    function adminViewAppointmentCard(){
      return null;
    }

    if(props.role == 'supporter'){
      return supporterViewAppointmentCard();
    }
    if(props.role == 'student'){
      return studentViewAppointmentCard();
    }
    if(props.role == 'admin'){
      return adminViewAppointmentCard();
    }
    else return null;
}

export default PreviousAppointmentCard;