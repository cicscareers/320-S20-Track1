import React, { useState } from "react";
import { Button, TextField, FormControlLabel, Link, Grid, Box, Typography, Container, Radio, RadioGroup, FormLabel, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import users from "../Data/users.json";
import Cookies from "universal-cookie";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


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

  const handleChange = (event) => {
    const name = event.target.name;
    setLoginType({
      ...loginType,
      [name]: event.target.value,
    });
  };

  //sets up the encryption library
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);

  //Gets run when submit is pressed and handles authentication.
  function handleSubmit(event) {
    event.preventDefault();

    fetch(
      "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/prod/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          UserEmail: email,
          Password: password
        })
      }
    )
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(json => {
        console.log(json);
        if (json.token !== undefined) {
          alert("Login Successful!");
          console.log("hooray! we have json!");
          console.log(json);
          const cookies = new Cookies();
          cookies.remove("email");
          cookies.remove("firstName");
          cookies.remove("lastName");
          cookies.remove("role");
          cookies.remove("token");
          cookies.set("email", json.email, {
            path: "/"
          });
          cookies.set("firstName", json.f_name, {
            path: "/"
          });
          cookies.set("lastName", json.l_name, {
            path: "/"
          });
          cookies.set("role", json.role, { path: "/" });
          cookies.set("token", json.token, { path: "/" });
          window.location.reload();
        }else {
            throw new Error();
          }
      })
      .catch(error => {
        alert("Invalid credentials");
        console.log(error);
      });
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
          <Typography align="center">What type of user are you?</Typography>
          <FormControl className={classes.formControl} align="center">
        <Select
          native
          value={loginType}
          onChange={handleChange}
          inputProps={{
            name: 'LoginType',
            id: 'LoginType-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Student">Student</option>
          <option value="Supporter">Supporter</option>
          <option value="Admin">Admin</option>
        </Select>
      </FormControl>
          
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

