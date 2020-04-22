import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {FormHelperText, FormControl} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, DialogActions, DialogTitle, DialogContent, Dialog } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import users from "../Data/users.json"
import Cookies from "universal-cookie";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/david-fisher/320-S20-Track1/"
      >
        King Codras
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
  error: {
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

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  }; 

  //to encrypt the password and token
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);
  var saltE = bcrypt.genSaltSync(10);

  function validateForm() {
    return password===password2 && email.length > 0 
    && password.length > 0 && password2.length > 0 
    && fname.length > 0 && lname.length > 0
    && validEmail(email);
  }

  function samePass(pass, pass2){
    return password===password2;
  }

  function validEmail(address) {
    return !! address.match(/.+@.+/);
  }

  function handleSubmit(event) {
    var hash=password

    event.preventDefault();

    //POST the user info to the database
    fetch(
      "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/prod/register/students",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: fname,
          last_name: lname,
          email: email,
          hashed_password: hash
        })
      }
    )
    //not sure why this is needed but it is
      .then(function(response) {
        console.log(response);
        return response.json();
      })

      //if the status code is good, set the cookies and authenicate
      .then(json => {
          console.log(json.statusCode);

          console.log(json);

          if (json.statusCode >= 200 && json.statusCode < 300) {
            handleClickOpen()
          } else {
            throw new Error();
          }
       })
      .catch(error => {
        alert("There is already a user with that email address. Please try again!");
      });
  }

  function handleKeyPress(event){
    if(event.key === 'Enter'){
      handleSubmit(event)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create a student account
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
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
            required
            fullWidth
            id="lname"
            label="Last Name"
            name="lname"
            autoComplete="lname"
            onChange={e => setLname(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
          />
          {!validEmail(email) && email.length > 0 && (
            <FormControl className={classes.error} error>
              <FormHelperText>
                Please enter a valid email
              </FormHelperText>
            </FormControl>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm password"
            label="Confirm Password"
            type="password"
            id="Confirmpassword"
            autoComplete="current-password"
            onChange={e => setPassword2(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {!samePass(password, password2) && password.length > 0 && password2.length > 0 && (
            <FormControl className={classes.error} error>
              <FormHelperText>
                Passwords do not match
              </FormHelperText>
            </FormControl>
          )}
          <Typography align="center" variant="body2">
            By requesing an account you agree to ReachOut's
          </Typography>
          <Grid container align="center">
            <Grid item xs>
              <Link href="/tos" variant="body2" justify="center">
                Terms and Condtitions
              </Link>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={!validateForm()}
          >
            Create Account
          </Button>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Account Created.
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
              Your student account has been created.
              </Typography>
              <Typography gutterBottom>
              You can now log in as a student and find the supporter that best fits your needs
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus href="/login" color="primary">
                Back to sign in
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Back to sign in
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup-supporter" variant="body2">
                Want to request a supporter account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

