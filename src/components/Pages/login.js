import React, { useState } from "react";
import { Button, TextField, FormControlLabel, Link, Grid, Box, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import users from "../Data/users.json";
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
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
 }));


export default function SignIn() {

  //sets styling
  const classes = useStyles();

  //Email and password from the textbox
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //sets up the encryption library
  var bcrypt = require('bcryptjs');

  //Gets run when submit is pressed and handles authentication.
  function handleSubmit(event) {

    //count tracks if the user has been found
    var count=0;
    for (var i = 0; i < users.length; i++){
      if (users[i].email === email){
        count++;

        //gets the password in the database (json file for now) and compares it to the inputted password
        var dbpass=users[i].password
        var verify = bcrypt.compareSync(password, dbpass);

        //If they put in the wrong password
        if (!verify){
          alert("Invalid Password");
        }

        //If the password is correct
        else if (verify){

          alert("User authenticated");

          //cookie gets set to 30 minutes
          const timestamp = new Date().getTime();
          const expire = timestamp + (60 * 30 * 1000);
          const expireDate = new Date(expire);

          //Sets all of the appropriate cookies
          const cookies = new Cookies();
          cookies.remove("email");
          cookies.remove("firstName");
          cookies.remove("lastName");
          cookies.remove("role");
          cookies.remove("token");
          cookies.set("email", email, {
            path: "/",
            expires: expireDate
          });
          cookies.set("firstName", users[i].fname, {
            path: "/",
            expires: expireDate
          });
          cookies.set("lastName", users[i].lname, {
            path: "/",
            expires: expireDate
          });
          cookies.set("role", users[i].role, { 
            path: "/" ,
            expires: expireDate
          });
          cookies.set("token", "token", { 
            path: "/" ,
            expires: expireDate
          });

          //reloads the window now that they are authenticated 
          window.location.reload();
        }
        break;
      
      }
    }

    //If the user wasnt in the database
    if(count===0){
      alert("User not found");
    }
  }


  //checks if they put in an email and password
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  //So the user can press enter rather than click the button
  function handleKeyPress(event){
    if(event.key === 'Enter' && validateForm()){
      handleSubmit(event)
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

