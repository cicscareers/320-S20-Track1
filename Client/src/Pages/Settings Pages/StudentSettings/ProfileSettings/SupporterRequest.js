import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Autocomplete} from '@material-ui/lab';

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

function hasLowerCase(str) {
    return str.toUpperCase() !== str;
}
function hasUpperCase(str) {
  return str.toLowerCase() !== str
}

function containsSpecial(str){
 return /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(str);
}

export default function SignUp(props) {
  const classes = useStyles();
  const [supporterType, setSupporterType] = useState("");
  const [employer, setEmployer] = useState("");
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("");
  const id = sessionStorage.getItem("id")

  function handleSubmitButton(){
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
          alert('Please await Approval by Admin')
          console.log(json)
          window.location.reload(false)
          
      })
  }

  const supporterTypes = [
    "Professional Staff",
    'Student Staff',
    'Alumni',
    'Faculty',
    'Other',
  ];

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
          <br/>
          <Autocomplete
            margin="normal"
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
            Request Account
          </Button>

          
          
        </form>
      </div>
      
    </Container>
  );
}