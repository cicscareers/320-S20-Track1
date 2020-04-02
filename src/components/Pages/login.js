import React, { useState } from "react";
import { Button, TextField, FormControlLabel, Link, Grid, Box, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import users from "../Data/users.json";
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
 }));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var bcrypt = require('bcryptjs');

  function handleSubmit(event) {
    var count=0;
    for (var i = 0; i < users.length; i++){
      if (users[i].email === email){
        count++;
        var dbpass=users[i].password
        var verify = bcrypt.compareSync(password, dbpass);
        if (!verify){
          alert("Invalid Password");
        }
        else if (verify){
          alert("User authenticated");
          console.log("hooray! we have json!");
          const timestamp = new Date().getTime();
          const expire = timestamp + (60 * 30 * 1000);
          const expireDate = new Date(expire);

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
          window.location.reload();
        }
        break;
      
      }
    }
    if(count===0){
      alert("User not found");
    }
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleKeyPress(event){
    if(event.key === 'Enter'){
      handleSubmit(event)
    }
  }

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
            //href="/match"
          >
            Sign In
          </Button>
          <Grid container form className={classes.form}>
            <Grid item xs>
              <Link href="/forgot_password" variant="body2">
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

