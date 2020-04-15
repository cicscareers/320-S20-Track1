import React from 'react';
import { makeStyles, Paper, Chip, Button, Grid, Container, Box, Card, CardContent, CardActions, Avatar } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import blue from '@material-ui/core/colors/blue';
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
    color: 'blue',
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.dayselect} spacing={3}>
        <Grid item>
          <NavigateBeforeIcon/>
        </Grid>
        <Grid item>
          <Typography>April 15, 2020</Typography>
        </Grid>
        <Grid item>
          <NavigateNextIcon/>
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
                <Chip size="small" variant="outlined" color="primary" label="Interview Help" />
                <Chip size="small" variant="outlined" color="primary" label="Resume Review" />
                <Chip size="small" variant="outlined" label="React" />
                <Chip size="small" variant="outlined" label="Machine Learning" />
                <Chip size="small" variant="outlined" label="AWS" />
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
                <Chip size="small" variant="outlined" color="primary" label="Interview Help" />
                <Chip size="small" variant="outlined" color="primary" label="Resume Review" />
                <Chip size="small" variant="outlined" color="primary" label="Networking Strategies" />
                <Chip size="small" variant="outlined" label="Postgresql" />
                <Chip size="small" variant="outlined" label="Algorithms" />
                <Chip size="small" variant="outlined" label="AWS" />
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
          <Rating className={classes.rating} name="Supporter Rating" precision={0.5} value={4} readOnly />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography>CICS Careers, Career Developer</Typography>
                <Typography>A243 LGRC Lowrise</Typography>
                <br/>
                <Typography>Helps With:</Typography>
                <Chip size="small" variant="outlined" color="primary" label="Interview Help" />
                <Chip size="small" variant="outlined" color="primary" label="Resume Review" />
                <Chip size="small" variant="outlined" label="Industry" />
                <Chip size="small" variant="outlined" label="Career Development" />
                <Chip size="small" variant="outlined" label="Networking" />
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
                <Chip size="small" variant="outlined" color="primary" label="Sporting Events" />
                <Chip size="small" variant="outlined" color="primary" label="Hype" />
                <Chip size="small" variant="outlined" label="Football" />
                <Chip size="small" variant="outlined" label="Free Pizza" />
                <Chip size="small" variant="outlined" label="Selfies" />
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
