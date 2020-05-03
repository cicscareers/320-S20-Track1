import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import {Button, withStyles, Dialog} from "@material-ui/core";
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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {FormHelperText, FormControl} from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Auth} from 'aws-amplify';
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

export default function ResetPass() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const classes = useStyles();
   function handleSubmitButton(event){

    return handleSubmit
  }

  function handleKeyPress(event){
    if(event.key == 'Enter'){
      return handleSubmit
    }
  }
  const handleSubmit = async event =>{
    event.preventDefault()
    try {
      console.log("Email Sent to ", email)
      await Auth.forgotPassword(email)
      handleClickOpen()
    }catch(error){
      console.log(error)
      alert(error.message)
    }
  }

  function validateForm() {
   return email.length > 0 && validEmail(email);
  }

  function validEmail(address) {
    return !! address.match(/.+@.+/);
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {!validEmail(email) && email.length > 0 && (
            <FormControl className={classes.error} error>
              <FormHelperText>
                Please enter a valid email
              </FormHelperText>
            </FormControl>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
            onClick={handleSubmitButton()}
          >
            Request Password Reset
          </Button>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Password Reset Requested
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
              A code will be sent to {email} to reset your password
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus href="/forgot-password2" color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container>
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
