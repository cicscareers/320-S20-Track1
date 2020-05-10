import React from "react";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, ListItem, ListItemText, List} from '@material-ui/core';
import Menu from "../../../../Navigation/appbar.js";
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
  const btns ={one: "#d3d3d3", two: "#ffffff", three: "#ffffff", four: "#ffffff", five: "#ffffff",
              six: "#ffffff", seven: "#d3d3d3", eight: "#ffffff", nine: "#ffffff", ten: "#ffffff",
              elev: "#ffffff", twelve: "#ffffff", thirteen: "#ffffff"}
    
    const classes = useStyles();
    const [page, setPage]=React.useState("Supporter Approval")
    const [buttons, setBtns] = React.useState(btns)

    console.log(buttons.one)
    function highLightButton(btn){
      const cols ={one: "#ffffff", two: "#ffffff", three: "#ffffff", four: "#ffffff", five: "#ffffff",
        six: "#ffffff", seven: "#ffffff", eight: "#ffffff", nine: "#ffffff", ten: "#ffffff",
        elev: "#ffffff", twelve: "#ffffff", thirteen: "#ffffff"}
      cols[btn] = "#d3d3d3"
      setBtns(cols)
      
    }
    
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
              {/* <ListItem button style={{backgroundColor: buttons.one}} onClick={() => {
                highLightButton("one")
                setPage("Field Defaults")}} key={1}>
                <ListItemText primary={"Field Defaults"} />
              </ListItem>
              <ListItem button style={{backgroundColor: buttons.two}} onClick={() => {
                highLightButton("two")
                setPage("View Blocked Accounts")}} key={2}>
                <ListItemText primary={"View Blocked Accounts"} />
              </ListItem>
              <ListItem button style={{backgroundColor: buttons.three}} onClick={() => {
                highLightButton("three")
                setPage("Download Data")}} key={3}>
                <ListItemText primary={"Download Data"} />
              </ListItem> */}
              
              <ListItem button style={{backgroundColor: buttons.six}} onClick={() => {
                highLightButton("six")
                setPage("Admin Approval")}} key={6}>
                <ListItemText primary={"Admin Approval"} />
              </ListItem>
              <ListItem button style={{backgroundColor: buttons.seven}} onClick={() => {
                highLightButton("seven")
                setPage("Supporter Approval")}} key={7}>
                <ListItemText primary={"Supporter Approval"} />
              </ListItem>
              <ListItem button style={{backgroundColor: buttons.eight}} onClick={() => {
                highLightButton("eight")
                setPage("FAQ Settings")}} key={8}>
                <ListItemText primary={"FAQ Settings"} />
              </ListItem>
              <ListItem button style={{backgroundColor: buttons.four}} onClick={() => {
                highLightButton("four")
                setPage("Edit Tags")}} key={4}>
                <ListItemText primary={"Edit Tags"} />
              </ListItem>
              <ListItem button style={{backgroundColor: buttons.five}} onClick={() => {
                highLightButton("five")
                setPage("Edit Topics")}} key={5}>
                <ListItemText primary={"Edit Topics"} />
              </ListItem>
              <ListItem button style={{backgroundColor: buttons.nine}} onClick={() => {
                highLightButton("nine")
                setPage("Edit Colleges")}} key={9}>
                <ListItemText primary={"Edit Colleges"} />
              </ListItem>
              <ListItem button style={{backgroundColor: buttons.ten}} onClick={() => {
                highLightButton("ten")
                setPage("Edit Majors")}} key={10}>
                <ListItemText primary={"Edit Majors"} />
              </ListItem>
              <ListItem button style={{backgroundColor: buttons.elev}} onClick={() => {
                highLightButton("elev")
                setPage("Edit Minors")}} key={11}>
                <ListItemText primary={"Edit Minors"} />
              </ListItem>
              <ListItem button style={{backgroundColor: buttons.twelve}} onClick={() => {
                highLightButton("twelve")
                setPage("Edit Links")}} key={12}>
                <ListItemText primary={"Edit Links"} />
              </ListItem>
              <ListItem button style={{backgroundColor: buttons.thirteen}} onClick={() => {
                highLightButton("thirteen")
                setPage("Edit Mediums")}} key={13}>
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
