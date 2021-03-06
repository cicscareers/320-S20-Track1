import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  ListItem,
  ListItemText,
  List,
  CircularProgress,
} from "@material-ui/core";
import Menu from "../../../../Navigation/appbar.js";
import StudentProfileSettings from "../ProfileSettings/StudentProfileSettings";
import StudentAcademicSettings from "../ProfileSettings/StudentAcademicSettings";
import SupporterApplication from '../ProfileSettings/SupporterRequest'

const drawerWidth = "25%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  inputs: {
    marginLeft: "5%",
    marginRight: "5%",
    width: "90%",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  dayselect: {
    marginLeft: "40%",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
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

const StudentSettings = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState("Profile Information");
  const [settings, setSettings] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [btns, setBtns] = React.useState({one: "#d3d3d3", two: "#ffffff", three:'#ffffff'})
  const id = sessionStorage.getItem("id")
  const url =
    "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/students/"+id;

  useEffect(() => {
    fetchStudentSettings(url);
  }, []);

  function fetchStudentSettings(url) {
    myFetch(url)
      .then((json) => {
        console.log(json);
        if (json !== undefined) {
          setSettings(json);
          setLoaded(true);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        setError(true);
        setLoaded(true);
      });
  }

  function handleHighlight(e){
    const tmp = {one: "#ffffff", two: "#ffffff", three:'#ffffff'}
    tmp[e] = "#d3d3d3"
    setBtns(tmp)
  }

  async function myFetch(url) {
    let response = await fetch(url);
    let json = await response.json();
    return json;
  }

  if (error) {
    return (
      <div align="center">
        <br />
        <br />
        <br />
        <Typography variant="h4">
          There was an error fetching your settings. The server may be down at
          the moment
        </Typography>
      </div>
    );
  } else if (!loaded) {
    return (
      <div align="center">
        <br></br>
        <Typography variant="h4">Loading...</Typography>
        <br></br>
        <CircularProgress />
      </div>
    );
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
        }}
      >
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <List>
            <ListItem
              button
              style={{backgroundColor: btns.one}}
              onClick={() => {
                handleHighlight("one")
                setPage("Profile Information")}}
              key={1}
            >
              <ListItemText primary={"Profile Information"} />
            </ListItem>
            <ListItem button style={{backgroundColor: btns.two}}
              onClick={() => {
                handleHighlight("two")
                setPage("Academics")}} key={2}>
              <ListItemText primary={"Academics"} />
            </ListItem>
            <ListItem button style={{backgroundColor: btns.three}}
              onClick={() => {
                handleHighlight("three")
                setPage("Request to be a Supporter")}} key={3}>
              <ListItemText primary={"Request to be a Supporter"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        {page === "Profile Information" && (
          <StudentProfileSettings settings={settings} />
        )}
        {page === "Academics" && (
          <StudentAcademicSettings settings={settings} />
        )}
        {page === 'Request to be a Supporter' && (
          <SupporterApplication settings={settings} />
        )}
      </main>
    </div>
  );
};

export default StudentSettings;
