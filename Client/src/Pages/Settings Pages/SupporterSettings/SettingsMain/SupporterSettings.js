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
    const [appointmentTypesList, setAppointmentTypesList]=React.useState([])
    const id = sessionStorage.getItem("id");
    const [btns, setBtns] = React.useState({one: "#d3d3d3", two: "#ffffff", three:'#ffffff', four: '#ffffff'})

    useEffect(() => {

      setLoaded(false);
      Promise.all([fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/prod/users/supporters/" + id), 
      fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/prod/table/specialization-types")])

      .then(([res1, res2]) => { 
         return Promise.all([res1.json(), res2.json()]) 
      })
      .then(([res1, res2, res3]) => {
        if(res1.statusCode >= 200 && res1.statusCode <400 && res2.specialization_types !== undefined){
          setSettings(res1.body);
          setAppointmentTypesList(res2.specialization_types);
          setLoaded(true);
        }else{
          throw new Error()
        }
      })
      .catch(error => {
        setError(true)
        setLoaded(true);
        console.log("Error Connectting to API")
      });
    }, [])

    function handleHighlight(e){
      const tmp = {one: "#ffffff", two: "#ffffff", three:'#ffffff', four: '#ffffff'}
      tmp[e] = '#d3d3d3'
      setBtns(tmp)
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
        <AppBar position="fixed" className={classes.appBar}>
          <Menu />
        </AppBar>
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
              <ListItem button style={{backgroundColor: btns.one}}
              onClick={() => {
                handleHighlight("one")
                setPage("Profile Information")}} key={1}>
                <ListItemText primary={"Profile Information"} />
              </ListItem>
              <ListItem button style={{backgroundColor: btns.two}}
              onClick={() => {
                handleHighlight("two")
                setPage("Supporter Information")}} key={2}>
                <ListItemText primary={"Supporter Information"} />
              </ListItem>
              <ListItem button style={{backgroundColor: btns.three}}
              onClick={() => {
                handleHighlight("three")
                setPage("Appointment Settings")}} key={3}>
                <ListItemText primary={"Appointment Blocks Settings"} />
              </ListItem>
              <ListItem button style={{backgroundColor: btns.four}}
              onClick={() => {
                handleHighlight("four")
                setPage("Create Appointment Blocks")}} key={4}>
                <ListItemText primary={"Create Appointment Blocks"} />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
            {page==="Create Appointment Blocks" && (<Blocks typesList = {appointmentTypesList} settings={settings}/>)}
            {page==="Profile Information" && (<Profile settings={settings}/>)}
            {page==="Supporter Information" && (<SupporterInfo settings={settings}/>)}
            {page==="Appointment Settings" && (<BlockSettings settings={settings}/>)}
        </main>
      </div>
      );
}

export default SupporterSettings
