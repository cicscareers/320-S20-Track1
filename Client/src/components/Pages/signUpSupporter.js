import React, { useState } from "react";
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
import users from "../Data/users.json"
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

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

  function handleSubmitButton(event){
    handleSubmit(event)
    handleClickOpen()
  }

  function handleSubmit(event) {
    var error = false;
    if(password !== password2){
      alert("Passwords must match!");
      error=true;
    }
    for (var i = 0; i < users.length; i++){
      if (users[i].email === email){
        alert("User already exists!");
        error=true;
        break;
      }
    }
    if (!error){
      var bcrypt = require('bcryptjs');
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      setPassword(hash)
    }
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
          Request a supporter account
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
            onClick={handleSubmitButton}
            disabled={!validateForm()}
          >
            Create Account
          </Button>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Supporter Account Requested
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
              Your request for a supporter account has been submitted.
              </Typography>
              <Typography gutterBottom>
              Please wait for an admin to review your submission. You will get an email 
              when an admin makes a decision. 
              </Typography>
              <Typography gutterBottom>
              If you are accepted as a supporter, you can sign in using the credentials you 
              supplied. 
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
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

