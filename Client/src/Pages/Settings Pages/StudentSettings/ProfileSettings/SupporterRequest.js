import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {FormHelperText, FormControl} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Autocomplete} from '@material-ui/lab';
import { Auth } from "aws-amplify";
import { Redirect } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/david-fisher/320-S20-Track1/"
      >
        CS 320 Track 1
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function hasLowerCase(str) {
    return str.toUpperCase() !== str;
}
function hasUpperCase(str) {
  return str.toLowerCase() !== str
}

function containsSpecial(str){
 return /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(str);
}

  function validatePass(pass){
    return pass.length>=8 && hasUpperCase(pass) && hasLowerCase(pass) && containsSpecial(pass);
  }


export default function SignUp(props) {
    const {settings} = props
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [supporterType, setSupporterType] = useState("");
  const [employer, setEmployer] = useState("");
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("");
  const id = sessionStorage.getItem("id")

  const [open, setOpen] =useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  // const handleClose = () => {
  //   setOpen(false);
  //   window.location.reload();
  // };

  function validateForm() {
    return password===password2 && email.length > 0
    && password.length > 0 && password2.length > 0
    && fname.length > 0 && lname.length > 0
    && validEmail(email) && supporterType.length >0
    && employer.length > 0 && title.length > 0
    && validatePass(password);
  }

  function samePass(pass, pass2){
    return password===password2;
  }

  function validEmail(address) {
    return !! address.match(/.+@.+/);
  }

  function handleSubmitButton(){
    console.log(JSON.stringify({
        id: id,
        employer: employer,
        title: title,
        team: team,
        supporter_types: supporterType
    }))
    fetch('https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/supporters',
    {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            employer: employer,
            title: title,
            team: team,
            supporter_types: supporterType
        })
     
      })
      .then(res => res.json())
      .then(json => {
          console.log(json)
      })
  }





  const handleClose = () => {
   setOpen(false);
 };


  const supporterTypes = [
    "Professional Staff",
    'Student Staff',
    'Alumni',
    'Faculty',
    'Other',
  ];

  const teams = [
    'CICS Careers',
    'Ventures'
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const formStyle = {
    minWidth: '100%'
  };

  console.log(settings)

  function handleSupporterType(e){
    if(e === "Professional Staff"){
        setSupporterType("professional_staff")
    }
    else if(e === "Student Staff"){
        setSupporterType("student_staff")
    }
    else if(e === "Faculty"){
        setSupporterType("faculty")
    }
    else if(e === "Alumni"){
        setSupporterType("alumni")
    }
    else if(e === "Other"){
        setSupporterType("other")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Request a supporter account
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            
            fullWidth
            disabled
            defaultValue={settings.first_name}
            id="fname"
            label="First Name"
            name="fname"
            autoComplete="fname"
            autoFocus
            onChange={e => setFname(e.target.value)}
          />
         
          <TextField
            variant="outlined"
            margin="normal"
            
            fullWidth
            disabled
            defaultValue={settings.last_name}
            id="lname"
            label="Last Name"
            name="lname"
            autoComplete="lname"
            onChange={e => setLname(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            
            fullWidth
            defaultValue={settings.email}
            disabled
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
          />

          <br/><br/>
          <Autocomplete
            //multiple
            id="supporter-types"
            options= {supporterTypes}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Supporter Types *"
              />
            )}
            onChange={(e,v) => handleSupporterType(v)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="employer"
            label="Current Employer"
            name="employer"
            autoComplete="employer"
            onChange={e => setEmployer(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            onChange={e => setTitle(e.target.value)}
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Team (Optional)"
            name="team"
            
            onChange={e => setTeam(e.target.value)}
          />
          <br/>
         
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitButton}
            
          >
            Create Account
          </Button>

          
          
        </form>
      </div>
      
    </Container>
  );
}