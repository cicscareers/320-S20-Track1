import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";
import {FormHelperText, FormControl, Dialog, withStyles} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Auth, Amplify} from 'aws-amplify';

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
  },
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

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };


   function  handleSubmitButton(event){
    Auth.forgotPasswordSubmit(email, code, password)
    .then(data => handleClickOpen())
    .catch(err => handleError(err));

  }

  function handleError(error){
    console.log(error)
    if (error.code == "ExpiredCodeException"){
        alert("This code has expired")
    }
    else{
      alert(error.message)
    }
  }


  function validateForm() {
    return password===password2 && password.length > 0 && password2.length > 0 && code.length > 0 & email.length > 0 && validEmail(email);
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
  function samePass(pass, pass2){
    return password===password2;
  }

  function validEmail(address) {
    return !! address.match(/.+@.+/);
  }

  function handleKeyPress(event){
    if(event.key === 'Enter'){
    handleSubmitButton()
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="verification code"
            label="Enter verification code"
            type="code"
            id="code"
            onChange={e => setCode(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Email address"
            label="Email address"
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new password"
            label="New Password"
            type="password"
            id="New_password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
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
            name="confirm password"
            label="Confirm Password"
            type="password"
            id="Confirmpassword"
            autoComplete="current-password"
            onChange={e => setPassword2(e.target.value)}
          />
          {!samePass(password, password2) && password.length > 0 && password2.length > 0 && (
            <FormControl className={classes.error} error>
              <FormHelperText>
                Passwords do not match
              </FormHelperText>
            </FormControl>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitButton}
            disabled={!validateForm()}
          >
            Reset My Password
          </Button>
          <Grid container>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title">
              Password Changed
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
              Your password has been successfully changed.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus href="/login" color="primary">
                Back to Sign in
              </Button>
            </DialogActions>
          </Dialog>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Back to sign in"}
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
