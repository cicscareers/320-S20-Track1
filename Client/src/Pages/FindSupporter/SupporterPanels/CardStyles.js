import {makeStyles} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '25%',
      flexShrink: 0,
    },
    gridpic: {
      marginLeft: "80%"
    },
    picture: {
      marginLeft: "55%",
      height: "100%",
    },
    paper: {
      height: "100%",
      width: "130%",
    },
    supporterCard: {
      '&:hover': {
        backgroundColor: '#F5F5F5',
        color: '#000'
      }
    },
    rating: {
      flexBasis: '15%',
      marginLeft: "30%"
    },
    tagChip: {
        margin: theme.spacing(0.5),
    },
    badgeButton: {
      borderRadius: "1em",
    },
    badge: {
      borderRadius: "1em",
      borderColor: '#FFF',
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
    filtered_tag: {
      backgroundColor: "#881c1c",
      color: "#FFFFFF"
    }
  }));

  export default useStyles;
  