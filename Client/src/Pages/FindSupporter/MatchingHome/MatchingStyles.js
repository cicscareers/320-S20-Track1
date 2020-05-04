import {makeStyles} from '@material-ui/core';

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
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    rating: {
     align: "center",
     alignItems: "center",
    },
  }));

  export default useStyles;