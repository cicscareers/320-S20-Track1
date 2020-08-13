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
import {universalFetch, appointmentListFetch} from '../../../../Functions/UniversalFetch'

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
    const [settings, setSettings]=React.useState({
      data: [],
      loading: false,
      error: null
    })
    const [appointmentTypesList, setAppointmentTypesList]=React.useState({
      data: [],
      loading: false,
      error: null
    })
    const id = sessionStorage.getItem("id");
    const [btns, setBtns] = React.useState({one: "#d3d3d3", two: "#ffffff", three:'#ffffff', four: '#ffffff'})

    useEffect(() => {
      universalFetch(setSettings, "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/prod/users/supporters/" + id)
      appointmentListFetch(setAppointmentTypesList, "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/prod/table/specialization-types")
    }, [])

    function handleHighlight(e){
      const tmp = {one: "#ffffff", two: "#ffffff", three:'#ffffff', four: '#ffffff'}
      tmp[e] = '#d3d3d3'
      setBtns(tmp)
    }
    console.log(appointmentTypesList)
    if(settings.error!==null || appointmentTypesList.error!==null){
      return (
        <div align="center">
          <br/>
          <br/>
          <br/>
        <Typography variant="h4">There was an error fetching your settings.</Typography>
        </div>
      )
    }
  
    else if(settings.loading===true || appointmentTypesList.loading===true){
      return (
        <div align="center">
          <br></br>
          <Typography variant="h4">Loading...</Typography>
          <br></br>
          <CircularProgress />
        </div>
      )
    }

    else {return (
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
                <ListItemText primary={"Appointment Settings"} />
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
            {page==="Create Appointment Blocks" && (<Blocks typesList = {appointmentTypesList.data} settings={settings.data}/>)}
            {page==="Profile Information" && (<Profile settings={settings.data}/>)}
            {page==="Supporter Information" && (<SupporterInfo settings={settings.data}/>)}
            {page==="Appointment Settings" && (<BlockSettings settings={settings.data}/>)}
        </main>
      </div>
      );
}}

export default SupporterSettings
