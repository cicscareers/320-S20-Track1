import React, { useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ListItem, ListItemText, List, CircularProgress} from '@material-ui/core';
import Menu from "../../../../Navigation/appbar.js";
import Cookies from "universal-cookie";
import Blocks from "../AppointmentBlocks/Main/BlockCreation.js"
import Profile from "../ProfileSettings/ProfileSettings.js"
import SupporterInfo from "../SupporterInformation/SupporterInformation.js"
import BlockSettings from '../BlockSettings/BlockSettingsMain.js'

const drawerWidth = "25%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  inputs: {
    marginLeft: "5%",
    marginRight: "5%",
    width:"90%"
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    zIndex: -1,
  },
  dayselect: {
    marginLeft: "40%"
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
   align: "center",
   alignItems: "center",
  },
}));


const SupporterSettings = (props) => {
    const classes = useStyles();
    const [page, setPage]=React.useState("Profile Information")
    const [loaded, setLoaded]=React.useState(false)
    const [settings, setSettings]=React.useState([])
    const [error, setError]=React.useState(false)

    const initial_fetch_url = formatFetchURL();

    //Calls the API
    useEffect(() => {
      fetchSupporterList(initial_fetch_url);
    }, [])

    // Refer to this: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
    async function myFetch(url) {
      let response = await fetch(url);
      let json = await response.json();
      return json;
    }

    function fetchSupporterList(url) {
      setLoaded(false);
      myFetch(url).then((json) => {
        if(json.statusCode >= 200 && json.statusCode <400) {
          setSettings(json.body);
          setLoaded(true);
        } else {
          throw new Error();
          setLoaded(true);
        }
      })
      .catch(error => {
          setError(true)
          setLoaded(true);
          console.log("Supporter settings could not be fetched")
        });
    }

    function formatFetchURL(startDate, endDate) {
      return "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/prod/users/supporters/" + sessionStorage.getItem("id");
    }

    if(error){
      return (
        <div align="center">
          <br/>
          <br/>
          <br/>
          <Typography variant="h4">There was an error fetching your settings</Typography>
        </div>
      )
    }
  
    else if(!loaded){
      return (
        <div align="center">
          <br></br>
          <Typography variant="h4">Loading...</Typography>
          <br></br>
          <CircularProgress />
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}> 
          <div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
            <List>
              <ListItem button onClick={() => setPage("Profile Information")} key={1}>
                <ListItemText primary={"Profile Information"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Supporter Information")} key={2}>
                <ListItemText primary={"Supporter Information"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Appointment Block Settings")} key={4}>
                <ListItemText primary={"Appointment Blocks Settings"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Create Appointment Blocks")} key={4}>
                <ListItemText primary={"Create Appointment Blocks"} />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
            {page==="Create Appointment Blocks" && (<Blocks/>)}
            {page==="Profile Information" && (<Profile settings={settings}/>)}
            {page==="Supporter Information" && (<SupporterInfo settings={settings}/>)}
            {page==="Appointment Block Settings" && (<BlockSettings settings={settings}/>)}
        </main>
      </div>
      );
}

export default SupporterSettings