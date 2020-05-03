import React, { useState, } from "react";
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
import { Auth } from "aws-amplify";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




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

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  // const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);


  //to encrypt the password and token
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);
  var saltE = bcrypt.genSaltSync(10);



  function validateForm() {
    return email.length > 0
    && fname.length > 0 && lname.length > 0
    && validEmail(email)
    && validatePass(password)
    && samePass(password,password2);
  }

  function samePass(pass, pass2){
    return password===password2;
  }

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



  function validEmail(address) {
    return !! address.match(/.+@.+/);
  }

  // useEffect(() => {
  //     console.log("@@@@@")
  //     return (
  //     <Redirect to='/login' />);
  //   }, [])

const handleSubmit = async event => {
  var username = email;
  {/*var attributeList = []
  var emailData = {
    Name : 'email',
    Value : email
  };
  var role = {
      Name : 'profile',
      Value : 'Student'
  };
  var first_name = {
      Name : 'given name',
      Value : fname
  };
  var last_name = {
      Name : 'pjdlfjlkj',
      Value : lname
  };
  attributeList.push(new CognitoUserAttribute(emailData));
  attributeList.push(new CognitoUserAttribute(role));
  attributeList.push(new CognitoUserAttribute(first_name));
attributeList.push(new CognitoUserAttribute(last_name));*/}
      event.preventDefault();


        try{
          const signUpResponse = await Auth.signUp({
            username,
            password,
            attributes:{
              email: email,
              given_name: fname,
              family_name: lname,
              profile: "Student",
              preferred_username: "default"
            },

          })
          // console.log('Redirect$$$$$$$$')
          // setRedirect(true);
          setOpen(true);

        }catch(error){
          console.log(error)
          alert(error.message)
        }
      }


  function handleKeyPress(event){
    if(event.key === 'Enter'){
    const press = handleSubmit
    }
  }

  const handleClose = () => {
   setOpen(false);
 };


  return (


    <Container component="main" maxWidth="xs">




      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create a student account
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
          {!validatePass(password) && password.length > 0 && (
            <FormControl className={classes.error} error>
              <FormHelperText>
              Your password should be at least 8 characters long and should include a lowercase, uppercase, and special character.
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
          {!samePass(password, password2) && password.length > 0 && password2.length > 0 && (
            <FormControl className={classes.error} error>
              <FormHelperText>
                Passwords do not match
              </FormHelperText>
            </FormControl>
          )}
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
          <Typography align="center" variant="body2">
            By requesting an account you agree to ReachOut's
          </Typography>
          <Grid container align="center">
            <Grid item xs>
              <Link href="/tos" variant="body2" justify="center">
                Terms and Conditions
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
          <Dialog alignItems= "center" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Confirm Your Email Address
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
              A confirmation email has been sent to {email}. Click on the confirmation link in the email to activate your account.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" align = "center" autoFocus href="/login" color="primary">
                Back to Sign In
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Back to Sign In
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup-supporter" variant="body2">
                Request Supporter Account
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