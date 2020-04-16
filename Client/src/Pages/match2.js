import React, { Component } from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, TextField, Grid } from '@material-ui/core';
import {Rating, Autocomplete} from '@material-ui/lab';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Menu from "../Navigation/appbar.js";
import SupporterCard from "../components/supporterCards.js"
import SimpleCard from "../components/test.js"
import SupporterList from "../Data/match2consts.js"
import topicsList from "../components/topics.js"
import tagsList from "../components/tags.js"
const drawerWidth = "25%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  inputs: {
    marginLeft: "5%",
    width:"90%"
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  dayselect: {
    marginLeft: "40%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  rating: {
   marginLeft: "34%"
  },
}));

const ResponsiveDrawer = (props) => {
  const { container } = props;
  const [date,setDate]=React.useState(15);
  const [stateTopics, setStateTopics]=React.useState([]);
  const [start,setStart]=React.useState("00:00");
  const [stateTags, setStateTags]=React.useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [name,setName]=React.useState("");
  const [rating,setRating]=React.useState(0);

  const updateList = (val) => {
    setName(val);
  };
  var newList = (SupporterList.filter(
    x => String(x.name.toLowerCase()).includes(name.toLowerCase()))).filter(
    x => x.rating>=rating).filter(
    x => stateTopics.every(val => x.topics.includes(val))).filter(
    x => stateTags.every(val => x.tags.includes(val)))
    //.filter(x => x.start<=start);

  const getSupporterCard = supporterObj => {
    return <SupporterCard {...supporterObj}/>;
  };

  const handleBack = () => {
    setDate(date-1);
  };

  const handleNext = () => {
    setDate(date+1);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Menu/>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Typography align="center" variant="h5">Filters</Typography>
        <br/>
        <TextField
          variant="outlined"
          margin="normal"
          className={classes.inputs}
          align="center"
          placeholder="Search Supporter"
          onChange={e => setName(e.target.value)}
        />
        <br/>
        <br/>
        <Autocomplete
          multiple
          className={classes.inputs}
          id="tags-outlined"
          options={topicsList}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Help Needed Topics"
              placeholder="Favorites"
            />
          )}
          onChange={(e,v) => setStateTopics(v)}
        />
        <br/>
        <Autocomplete
          multiple
          className={classes.inputs}
          id="tags-outlined"
          options={tagsList}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Supporter Tags"
              placeholder="Favorites"
            />
          )}
          onChange={(e,v) => setStateTags(v)}
        />
        <br/>
        <form align="center" noValidate>
          <TextField
            id="time"
            label="Start Time"
            type="time"
            fullWidth
            onChange={e => setStart(e.target.value)}
            defaultValue="00:00"
            className={classes.inputs}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <br/>
          <br/>
          </form>
          <Typography align="center">Minimum Required Rating</Typography>
          <Rating 
            align="center"
            className={classes.rating} 
            name="Supporter Rating" 
            precision={0.5} 
            value={rating} 
            onChange={e => setRating(e.target.value)}
            size="large"
          />
          <br/>

      </div>
      </Drawer>
      <main className={classes.content}>
        <br/>
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
      {newList.map(supporterObj => getSupporterCard(supporterObj))}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
