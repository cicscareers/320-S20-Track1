import React, {useState} from 'react';
import { makeStyles,Button, Grid} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Dialog, DialogContent, DialogContentText,
    DialogActions, DialogTitle,} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    gridpic: {
      marginLeft: "80%"
    },
    picture: {
      marginLeft: "55%",
      height: "100%",
    },
    paper: {
      height: "100%",
      width: "130%",
    },
    rating: {
      marginLeft: "20%"
    },
    dayselect: {
      marginLeft: "40%"
    },
    tagChip: {
        margin: theme.spacing(0.5),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    large: {
      marginLeft: "55%",
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  }));

const ApprovalCard = (props) => {
    const classes = useStyles();
    const [approveDialog, setApproveDialog] = useState(false)
    const [denyDialog, setDenyDialog] = useState(false)

    function handleApprove(){
        setApproveDialog(true);
    }

    function handleDeny(){
        setDenyDialog(true);
    }

    function handleApproveClose(){
        setApproveDialog(false);
    }

    function handleDenyClose(){
        setDenyDialog(false);
    }

    function handleApproveOpen(){
        setApproveDialog(true);
    }

    function handleDenyOpen(){
        setDenyDialog(true);
    }

    function handleApprove(){
        fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/register/supporters/approve",
            {
              method: "PATCH",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  supporter_id: props.id
              })
           
            }
          )
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
              console.log(response)
              return response.json();
            } else {
              throw new Error("Server can't be reached!");
            }
          })
          .then(json => {
            //setOpen(false);
            //setOpenCreated(true);
          })
          .catch(error => {
            console.log(error);
          });
          
        setApproveDialog(false);
    }

    function handleDeny(){
        setDenyDialog(false);
    }

    return (
        <ExpansionPanel >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid lg = {12} style={{display: 'flex'}}>
                <Grid lg = {5} style={{display: 'flex'}}>
                    <Typography className={classes.heading}>{props.name}</Typography>
                </Grid>
                <Grid lg = {3} style={{display: 'flex'}}>
                    <Typography className={classes.secondaryHeading}>Office: {props.office}</Typography>
                </Grid>
                <Grid lg = {4} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Typography className={classes.secondaryHeading}>{props.supporterType}</Typography> 
                </Grid>
            </Grid>
            
            
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                  <Typography>Current Employer: {props.employer}</Typography>
                  <Typography>Title: {props.title}</Typography>
                  <Typography>Email: {props.email}</Typography>
                  <Typography>Team: {props.team}</Typography>
                  
              </Grid>
              <Grid item container lg={12}  style={{display: 'flex'}}>
                <Grid item lg={6} justify='flex-end' style={{display: 'flex', padding: 30}}>
                    <Button
                        margin="normal"
                        variant="contained"
                        color="primary"
                        onClick={handleApproveOpen}
                        
                    >
                        Approve
                    </Button>
                </Grid>
                <Grid item lg={6} justify='flex-start' style={{display: 'flex', padding: 30}}>
                    <Button
                        margin="normal"
                        variant="contained"
                        color="primary"
                        onClick={handleDenyOpen}
                    >
                        Deny
                    </Button>
                </Grid>

              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <Dialog
            open={approveDialog}
            onClose={handleApproveClose}
            aria-labelledby="draggable-dialog-title"
        >
             <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                 Approve
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to approve this user as a Supporter?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleApprove} color="primary">
                    Approve
                </Button>
                <Button onClick={handleApproveClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
        open={denyDialog}
        onClose={handleDenyClose}
        aria-labelledby="draggable-dialog-title"
         >
         <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Deny
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to deny this user to be a Supporter?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleDeny} color="primary">
                Deny
            </Button>
            <Button onClick={handleDenyClose} color="primary">
                Cancel
            </Button>
        </DialogActions>
        </Dialog>
        
        </ExpansionPanel>



    );
}

export default ApprovalCard;