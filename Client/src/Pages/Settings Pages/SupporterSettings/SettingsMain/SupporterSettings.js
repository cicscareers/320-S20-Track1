import React, { useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ListItem, ListItemText, List} from '@material-ui/core';
import Menu from "../../../../Navigation/appbar.js";
import Cookies from "universal-cookie";
import Blocks from "../AppointmentBlocks/Main/BlockCreation.js"
import Profile from "../ProfileSettings/ProfileSettings.js"
import SupporterInfo from "../SupporterInformation/SupporterInformation.js"

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
              <ListItem button onClick={() => setPage("Appointment Blocks")} key={4}>
                <ListItemText primary={"Appointment Blocks"} />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
            {page==="Appointment Blocks" && (<Blocks/>)}
            {page==="Profile Information" && (<Profile/>)}
            {page==="Supporter Information" && (<SupporterInfo/>)}
        </main>
      </div>
      );
  }

  export default SupporterSettings