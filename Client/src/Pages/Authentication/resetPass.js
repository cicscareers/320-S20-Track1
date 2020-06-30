import React, { useState } from "react";
import {Button, Container, withStyles, Dialog, Avatar, CssBaseline, TextField, Link, Grid, Box, Typography, makeStyles, IconButton, FormHelperText, FormControl} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
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
        CICS Careers
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
          <Dialog aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" >
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
