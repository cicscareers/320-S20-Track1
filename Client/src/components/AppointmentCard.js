import React from 'react';
import { makeStyles, Modal, Paper, IconButton, Chip, Button, Grid, Container, Box, Card, CardContent, CardActions, Avatar } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Cancel from './cancelAppt'
import Feedback from './feedback'

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

    const [cancelAppointmentModalOpen, setCancelAppointmentModalOpen] = React.useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = React.useState(false);
    const [viewFeedbackModalOpen, setViewFeedbackModalOpen] = React.useState(false);


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

    const handleOpenViewFeedbackModal = () => {
        setViewFeedbackModalOpen(true);
      };
    
    const handleCloseViewFeedbackModal = () => {
        setViewFeedbackModalOpen(false);
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
    //Expansion panel for supporters view
    function supporterViewAppointmentCard(){
            
            return (
          
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
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
                  <Typography className={classes.tagChip}>{props.comments}</Typography>
                  
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Avatar alt="c" src={props.studentProfilePic}
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
    //Expansion panel for the student's view
    function studentViewAppointmentCard(){
      return (
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
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
                  <Typography className={classes.tagChip}>{props.comments}</Typography>
                  
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
                ) : props.feedbackLeft ? (
                      <Button
                        margin="normal"
                        variant="contained"
                        color="primary"
                        onClick={handleOpenViewFeedbackModal}
                      >
                        View Feedback
                      </Button>
                      ) : (
                      <Button
                        margin="normal"
                        variant="contained"
                        color="primary"
                        onClick={handleOpenFeedbackModal}
                      >
                        Submit Feedback
                      </Button>
                      ) 
              }

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

                <Modal 
                  open={viewFeedbackModalOpen}
                  onClose={handleCloseViewFeedbackModal}
                >
                Test
                </Modal>

              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        );
      }

    function adminViewAppointmentCard(){
          return (
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading}>Student: {props.student}</Typography>
            <Typography className={classes.secondaryHeading}>{props.date + ' from ' + props.start + ' to ' + props.end}</Typography>
            <Typography className={classes.secondaryHeading} style={{marginLeft: '20%'}}>{props.subject}</Typography> 
            <Typography className={classes.heading}>Supporter: {props.supporter}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid container justify="space-around" allignItems = "flex-start">
                <Grid item x6 = {0}>
                    <Avatar src={props.studentProfilePic}
                     className={classes.large} />
                </Grid>

                <Grid item x6 = {0}>
                    <Avatar src={props.supporterProfilePic}
                     className={classes.large} />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} justify="space-between">

                  <Typography>{props.location}</Typography>
                  <Typography>{props.medium}</Typography>
                  <br/>
                  <Typography className={classes.tagChip}>{props.comments}</Typography>
                  <Typography className={classes.secondaryHeading}>{props.date + ' from ' + props.start + ' to ' + props.end}</Typography>
                  <Typography className={classes.secondaryHeading} style={{marginLeft: '20%'}}>{props.subject}</Typography> 
              </Grid>
              <Grid item xs={12} sm={6}>
  
                  
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        );
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