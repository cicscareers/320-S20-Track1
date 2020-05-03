import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Button,
  Avatar,
  Container,
  TextField,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import Cookies from "universal-cookie";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
    align: "center",
    padding: 4,
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(2),
    align: "center",
  },
  avatar: {
    marginLeft: "42%",
    marginRight: "50%",
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
}));

function handleSubmit() {
  //TODO
}

const ProfileInformation = (props) => {
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState("");
  const [prefName, setPrefName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [pronouns, setPronouns] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [linkedIn, setLinkedIn] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [picture, setPicture] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);

  const cookies = new Cookies();
  const id = cookies.get("id");
  const url =
    "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/students/" +
    id;

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        setFirstName(json.first_name);
        setPrefName(json.preferred_name);
        setLastName(json.last_name);
        setPronouns(json.pronouns);
        setPhoneNumber(json.phone);
        setEmail(json.email);
        setBio(json.bio);
        setLinkedIn(json.link);
        setPicture(json.picture);
        setLoaded(true);
      });
  }, []);

  if (!loaded) {
    return (
      <div align="center">
        <br></br>
        <Typography variant="h4">Loading...</Typography>
        <br></br>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Profile Information
        </Typography>
        <form className={classes.form}>
          <Avatar className={classes.avatar} src={picture} />
          <br />
          <Grid container>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="First Name"
                autoFocus
                required
                multiline
                defaultValue={firstName}
                form
                className={classes.form}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid xs={3}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Preferred Name"
                autoFocus
                multiline
                defaultValue={prefName}
                form
                className={classes.form}
                onChange={(e) => setPrefName(e.target.value)}
              />
            </Grid>
            <Grid xs={4}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                label="Last Name"
                autoFocus
                multiline
                defaultValue={lastName}
                form
                className={classes.form}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Pronouns"
                autoFocus
                multiline
                defaultValue={pronouns}
                form
                className={classes.form}
                onChange={(e) => setPronouns(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                label="Email Address"
                autoFocus
                multiline
                defaultValue={email}
                form
                className={classes.form}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Phone Number"
                autoFocus
                multiline
                defaultValue={phoneNumber}
                form
                className={classes.form}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="LinkedIn"
            autoFocus
            multiline
            defaultValue={linkedIn}
            form
            className={classes.form}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Personal Biography"
            autoFocus
            multiline
            rows={4}
            defaultValue={bio}
            form
            className={classes.form}
            onChange={(e) => setBio(e.target.value)}
          />
          <Button
            margin="normal"
            form
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ProfileInformation;
