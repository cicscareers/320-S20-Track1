import React from 'react';
import { makeStyles, Paper, IconButton, Chip, Button, Grid, Container, Box, Card, CardContent, CardActions, Avatar } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import blue from '@material-ui/core/colors/blue';
import smileRate from "../components/ratings"
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

export default function ControlledExpansionPanels() {
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

  return (
    <div className={classes.root}>
      <Grid container className={classes.dayselect} spacing={3}>
        <Grid item>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleBack}
            edge="start"
          >
            <NavigateBeforeIcon/>
          </IconButton>
        </Grid>
        <Grid item>
          <Typography>April {date}, 2020</Typography>
        </Grid>
        <Grid item>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleNext}
            edge="start"
          >
            <NavigateNextIcon/>
          </IconButton>
        </Grid>
      </Grid>
      <br/>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Chinmay Patil</Typography>
          <Typography className={classes.secondaryHeading}>Match Score: Great</Typography>
          <Rating className={classes.rating} name="Supporter Rating" precision={0.5} value={5} readOnly />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography>CICS Careers, Career Developer</Typography>
                <Typography>A243 LGRC Lowrise</Typography>
                <br/>
                <Typography>Helps With:</Typography>
                <Chip variant="outlined" color="primary" label="Interview Help" className={classes.tagChip}/>
                <Chip variant="outlined" color="primary" label="Resume Review" className={classes.tagChip}/>
                <Chip variant="outlined" label="React" className={classes.tagChip}/>
                <Chip variant="outlined" label="Machine Learning" className={classes.tagChip}/>
                <Chip variant="outlined" label="AWS" className={classes.tagChip}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              
                <Avatar alt="Chinmay Patil" src='https://www.cics.umass.edu/sites/default/files/styles/people_individual/public/headshots/img_4695_copy.jpg?itok=jwwJF0KP'
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
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Dhruvil Gala</Typography>
          <Typography className={classes.secondaryHeading}>
            Match Score: Great
          </Typography>
          <Rating className={classes.rating} name="Supporter Rating" precision={0.5} value={4.5} readOnly />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography>CICS Careers, Career Developer</Typography>
                <Typography>A243 LGRC Lowrise</Typography>
                <br/>
                <Typography>Helps With:</Typography>
                <Chip variant="outlined" color="primary" label="Interview Help" className={classes.tagChip}/>
                <Chip variant="outlined" color="primary" label="Resume Review" className={classes.tagChip}/>
                <Chip variant="outlined" color="primary" label="Networking Strategies" className={classes.tagChip}/>
                <Chip variant="outlined" label="Postgresql" className={classes.tagChip}/>
                <Chip variant="outlined" label="Algorithms" className={classes.tagChip}/>
                <Chip variant="outlined" label="AWS" className={classes.tagChip}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              
                <Avatar alt="Dhruvil Gala" src='https://www.cics.umass.edu/sites/default/files/styles/people_individual/public/headshots/image2_001.jpg?itok=ogGUoKuq'
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
      <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Brian Krusell</Typography>
          <Typography className={classes.secondaryHeading}>
            Match Score: Good
          </Typography>
          {smileRate()}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography>CICS Careers, Career Developer</Typography>
                <Typography>A243 LGRC Lowrise</Typography>
                <br/>
                <Typography>Helps With:</Typography>
                <Chip variant="outlined" color="primary" label="Interview Help" className={classes.tagChip}/>
                <Chip variant="outlined" color="primary" label="Resume Review" className={classes.tagChip}/>
                <Chip variant="outlined" label="Industry" className={classes.tagChip}/>
                <Chip variant="outlined" label="Career Development" className={classes.tagChip}/>
                <Chip variant="outlined" label="Networking" className={classes.tagChip}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              
                <Avatar alt="Brian Krusell" src='https://www.cics.umass.edu/sites/default/files/styles/people_individual/public/headshots/krusell.jpg?itok=tjD9O0Rp'
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
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Sam the Minuteman</Typography>
          <Typography className={classes.secondaryHeading}>
            Match Score: Poor
          </Typography>
          <Rating className={classes.rating} name="Supporter Rating" precision={0.5} value={5} readOnly />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography>UMass Amherst, Influencer</Typography>
                <Typography>Mullins Center</Typography>
                <br/>
                <Typography>Helps With:</Typography>
                <Chip variant="outlined" color="primary" label="Sporting Events" className={classes.tagChip}/>
                <Chip variant="outlined" color="primary" label="Hype" className={classes.tagChip}/>
                <Chip variant="outlined" label="Football" className={classes.tagChip}/>
                <Chip variant="outlined" label="Free Pizza" className={classes.tagChip}/>
                <Chip variant="outlined" label="Selfies" className={classes.tagChip}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              
                <Avatar alt="Sam the Minuteman" src='https://www.umass.edu/newsoffice/sites/default/files/styles/article_medium/public/Sam.jpg'
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
    </div>
  );
}
