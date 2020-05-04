import React, { useState } from "react";
import { Button, MenuItem, TextField, Link, Grid, Box, Typography, Container, FormControl,FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import { Auth } from "aws-amplify";
import Cookies from "universal-cookie";




//Function that shows the copyright (will get updated to the appropiate one later)
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
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
    align: "center"
  },
  rad: {

  },
 }));


export default function SignIn() {
  //sets styling
  const classes = useStyles();

  //Email and password from the textbox
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = React.useState("Student");
  const [validInfo,setValidInfo] = useState(true)

  const handleChange = (event) => {
    setLoginType(event.target.value);
  };

  //sets up the encryption library
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);

  //Gets run when submit is pressed and handles authentication.
  const handleSubmit = async event =>{
    event.preventDefault();
    var username = email;
      try{
        const user = await Auth.signIn(email, password);
        console.log(user);
        if (user.signInUserSession.accessToken !== undefined) {
          console.log("hooray! we have json!");

          var authToken = user.signInUserSession.idToken.jwtToken;
          var base64Url = authToken.split('.')[1];
          var json = JSON.parse(window.atob(base64Url));
          const cookies = new Cookies();

          console.log(json)
          console.log("$$$$$$$$");

          sessionStorage.setItem("token", user.signInUserSession.accessToken, { path: "/" });
          sessionStorage.setItem("email", json.email);
          sessionStorage.setItem("firstName", json.given_name);
          sessionStorage.setItem("lastName", json.family_name);
          sessionStorage.setItem("role", "Student");
          sessionStorage.setItem("id", json.preferred_username);
          cookies.set("role", "Student", { path: "/" });

          window.location.reload();
        }
      }catch(error){
        //alert(error.message);
        if(error.code =="NotAuthorizedException"){
        setValidInfo(false);}
        else{
          alert(error.message)
        }
        console.log(error);
      }
    }

      // .then(response => {
      //   console.log(response);
      //   return response.json();
      // })
      // .then(json => {
      //   console.log(json);
      // else {
      //       throw new Error();
      //     }
      // })
      // .catch(error => {
      //   alert("Invalid credentials");
      //   console.log(error);
      // });



  //checks if they put in an email and password
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  //So the user can press enter rather than click the button
  function handleKeyPress(event){
    if(event.key === 'Enter' && validateForm()){
      return handleSubmit
    }
  }

  //Notably here the button is disabled if the form isn't validated
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            form className={classes.form}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            form className={classes.form}
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />


          <Button
            margin="normal"
            fullWidth
            form className={classes.form}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!validateForm()}
          >
            Sign In
          </Button>
          {!validInfo && (
            <FormControl className={classes.error} error>
              <FormHelperText>
                Incorrect username or password.
              </FormHelperText>
            </FormControl>
          )}
          <Grid container form className={classes.form}>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
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
