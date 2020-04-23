import React from 'react';
import { makeStyles, Paper, IconButton, Chip, Button, Grid, Container, Box, Card, CardContent, CardActions, Avatar } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  
  tagChip: {
      margin: theme.spacing(0.5),
  },
  
}));

const TopicChip = (props) => {
  const {topic} = props;
  const classes = useStyles();

  return (
    <Chip variant="outlined" color="primary" label={topic} className={classes.tagChip}/>
  );
}

export default TopicChip;