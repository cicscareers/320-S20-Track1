import React, { useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ListItem, ListItemText, List} from '@material-ui/core';
import Menu from "../../../../Navigation/appbar.js";
import Cookies from "universal-cookie";
import ChangeTopics from "../TopicsTags/topics.js";
import ChangeTags from "../TopicsTags/tags.js";
import ViewBlocked from "../BlockUnblock/blockUnblock.js";
import DownloadData from "../DownloadData/downloadData.js";
import FieldDefaults from "../FieldDefaults/fieldDefaults.js";

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
    const [page, setPage]=React.useState("Field Defaults")
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
              <ListItem button onClick={() => setPage("Field Defaults")} key={1}>
                <ListItemText primary={"Field Defaults"} />
              </ListItem>
              <ListItem button onClick={() => setPage("View Blocked Accounts")} key={2}>
                <ListItemText primary={"View Blocked Accounts"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Download Data")} key={4}>
                <ListItemText primary={"Download Data"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Edit Tags")} key={4}>
                <ListItemText primary={"Edit Tags"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Edit Topics")} key={4}>
                <ListItemText primary={"Edit Topics"} />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
            {page==="Field Defaults" && (<FieldDefaults/>)}
            {page==="View Blocked Accounts" && (<ViewBlocked/>)}
            {page==="Download Data" && (<DownloadData/>)}
            {page==="Edit Tags" && (<ChangeTags/>)}
            {page==="Edit Topics" && (<ChangeTopics/>)}
        </main>
      </div>
      );
  }

  export default SupporterSettings