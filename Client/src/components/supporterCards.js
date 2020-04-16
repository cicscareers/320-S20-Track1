import React from 'react';
import { makeStyles, Paper, IconButton, Chip, Button, Grid, Container, Box, Card, CardContent, CardActions, Avatar } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import blue from '@material-ui/core/colors/blue';
import smileRate from "../components/ratings"
import DoneIcon from '@material-ui/icons/Done';

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

const SupporterCard = (props) => {
  const {name, rating, employer, title, location, topics, tags, imgsrc, start, panel} = props;
  const classes = useStyles();
  const [apptTopic, setApptTopic] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const chipFilter = (item) => { 
    setApptTopic(item);
  }
  const handleClick = (e) => {
    console.info(e.target.getAttribute('color'));
  };
  
  return (

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{name}</Typography>
          {tags.map(tag => <Chip label={tag} size="small" className={classes.tagChip} />)}
          <Typography className={classes.secondaryHeading}>Match Score: Great</Typography>
          <Rating className={classes.rating} name="Supporter Rating" precision={0.5} value={rating} readOnly />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
                <Typography>{employer}, {title}</Typography>
                <Typography>{location}</Typography>
                <br/>
                <Typography>Helps With:</Typography>
                {topics.map(topic => <Chip 
                  clickable 
                  value={topic}
                  variant="outlined" 
                  deleteIcon={apptTopic===topic && <DoneIcon />} 
                  color="primary" 
                  label={topic} 
                  className={classes.tagChip}
                  onClick={ () => chipFilter(topic) }
                />)}
                <Typography>Time Blocks:</Typography>
                <Chip variant="outlined" color="primary" clickable label="2:30 PM" className={classes.tagChip}/>
                <Chip variant="outlined" color="primary" label="5:30 PM" className={classes.tagChip}/>
                <Chip variant="outlined" color="primary" label="7:30 PM" className={classes.tagChip}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              
                <Avatar alt={name} src={imgsrc}
                 className={classes.large} />
             
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                  margin="normal"
                  variant="contained"
                  color="primary"
                >
                  Create Appointment
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  );
}

export default SupporterCard;