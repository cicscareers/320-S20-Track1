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
import AdminApproval from "../AdminApproval/adminApproval.js";
import SupporterApproval from "../SupporterApproval/SupporterApproval";
import FaqSettings from "../FAQ/faqPage.js";
import ChangeColleges from "../Academics/EditColleges"
import ChangeMajors from "../Academics/EditMajors"
import ChangeMinors from "../Academics/EditMinors"
import ChangeLinks from "../Edits/EditLinks"
import ChangeMediums from "../Edits/EditMedium"


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
              <ListItem button onClick={() => setPage("Download Data")} key={3}>
                <ListItemText primary={"Download Data"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Edit Tags")} key={4}>
                <ListItemText primary={"Edit Tags"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Edit Topics")} key={5}>
                <ListItemText primary={"Edit Topics"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Admin Approval")} key={6}>
                <ListItemText primary={"Admin Approval"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Supporter Approval")} key={7}>
                <ListItemText primary={"Supporter Approval"} />
              </ListItem>
              <ListItem button onClick={() => setPage("FAQ Settings")} key={8}>
                <ListItemText primary={"FAQ Settings"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Edit Colleges")} key={8}>
                <ListItemText primary={"Edit Colleges"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Edit Majors")} key={8}>
                <ListItemText primary={"Edit Majors"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Edit Minors")} key={8}>
                <ListItemText primary={"Edit Minors"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Edit Links")} key={8}>
                <ListItemText primary={"Edit Links"} />
              </ListItem>
              <ListItem button onClick={() => setPage("Edit Mediums")} key={8}>
                <ListItemText primary={"Edit Mediums"} />
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
            {page==="Admin Approval" && (<AdminApproval/>)}
            {page==="Supporter Approval" && (<SupporterApproval/>)}
            {page==="FAQ Settings" && (<FaqSettings/>)}
            {page==="Edit Colleges" && (<ChangeColleges/>)}
            {page==="Edit Majors" && (<ChangeMajors/>)}
            {page==="Edit Minors" && (<ChangeMinors/>)}
            {page==="Edit Links" && (<ChangeLinks/>)}
            {page==="Edit Mediums" && (<ChangeMediums/>)}
        </main>
      </div>
      );
  }

  export default SupporterSettings;
