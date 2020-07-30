import React, { useState } from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Auth, Interactions } from "aws-amplify";
import Cookies from "universal-cookie";
import { withTranslation } from "react-i18next";
import Copyright from "./Copyright";

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
    alignItems: "center",
  },
  eyeIcon: {
    height: "52px",
    Box: "none",
    border: "none",
    boxShadow: "none",
    position: "absolute",
    left: "59.7%",
    top: "46.7%",
    alignItems: "center",
  },
  rad: {},
}));

function SignIn({ t, i18n }) {
  console.log(i18n.t("email"));

  //sets styling
  const classes = useStyles();

  //Email and password from the textbox
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = React.useState("Student");
  const [validInfo, setValidInfo] = useState(true);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  function fetchPicture() {
    fetch(
      "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/" +
        sessionStorage.getItem("id").toString() +
        "/picture",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.picture);
        sessionStorage.setItem("image", json.picture);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Gets run when submit is pressed and handles authentication.
  const handleSubmit = async (event) => {
    event.preventDefault();
    var username = email;
    try {
      const user = await Auth.signIn(email, password);
      console.log(user);
      if (user.signInUserSession.accessToken !== undefined) {
        var authToken = user.signInUserSession.idToken.jwtToken;
        var base64Url = authToken.split(".")[1];
        var json = JSON.parse(window.atob(base64Url));
        const cookies = new Cookies();
        sessionStorage.setItem("token", user.signInUserSession.accessToken, {
          path: "/",
        });
        sessionStorage.setItem("email", json.email);
        sessionStorage.setItem("firstName", json.given_name);
        sessionStorage.setItem("lastName", json.family_name);
        sessionStorage.setItem("role", "Student");
        sessionStorage.setItem("id", json.preferred_username);
        cookies.set("role", "Student", { path: "/" });
        fetchPicture();
      }
    } catch (error) {
      if (error.code == "NotAuthorizedException") {
        setValidInfo(false);
      } else {
        alert(error.message);
      }
      console.log(error);
    }
  };

  //checks if they put in an email and password
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  //hides and shows password
  const togglePasswordVisiblity = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  //Notably here the button is disabled if the form isn't validated
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img height="175" width="175" src="cicscareers_logo_3.png"></img>
        <br />

        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("email")}
            name="email"
            autoComplete="email"
            autoFocus
            form
            className={classes.form}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("password")}
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            form
            className={classes.form}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className={classes.eyeIcon} onClick={togglePasswordVisiblity}>
            {isPasswordVisible ? (
              <VisibilityOffIcon />
            ) : (
              //onClick so the user doesn't accidentally trigger it
              <VisibilityIcon />
            )}
          </Button>
          <Button
            type="submit" //logs in on enter
            margin="normal"
            fullWidth
            form
            className={classes.form}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!validateForm()}
          >
            {t("sign-in")}
          </Button>
          {!validInfo && (
            <FormControl className={classes.error} error>
              <FormHelperText>{t("invalid-credentials")}</FormHelperText>
            </FormControl>
          )}
          <Grid container form className={classes.form}>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                {t("forgot-password")}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {t("sign-up")}
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

export default withTranslation("auth")(SignIn);
