import React, { useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button,
  Divider
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import PropTypes from "prop-types";


const FaqCard = (props) => {

    const [editOpen, setEditDialog] = useState(false);
    const [deleteOpen, setDeleteDialog] = useState(false);
    const [editQuestion, setEditQuestion] = useState(props.question)
    const [editAnswer, setEditAnswer] = useState(props.answer)
   

    function handleEditOpen(){
        setEditDialog(true)
    }
    function handleEditClose(){
        setEditDialog(false)
    }

    function handleEditConfirm(){
        console.log(props.id)
        console.log(editQuestion)
        console.log(editAnswer)
        fetch(
            "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/faq",
            {
              method: "PATCH",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  faq_id: props.id,
                  question: editQuestion,
                  answer: editAnswer
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
        setEditDialog(false)
    }


    function handleDeleteOpen(){
        setDeleteDialog(true)
    }
    function handleDeleteClose(){
        setDeleteDialog(false)
    }

    function handleDeleteConfirm(){
        fetch(
            "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/faq",
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  faq_id: props.id
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
        setDeleteDialog(false)
    }
    return(
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Grid lg={12} style={{justifyContent: 'center', display: 'flex'}}>
                <Typography component="h1" variant="h5">
                {props.question}
                </Typography>
            </Grid>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container lg={12} style={{justifyContent: 'center', display: 'flex'}}>
                <Grid item lg={12} style={{justifyContent: 'center', display: 'flex'}}>
                    <Typography style={{fontSize: 20}}>
                        {props.answer}
                    </Typography>
                </Grid>
                <Divider/>
                <Grid item container lg={12} style={{justifyContent: 'center', marginTop: 50, display: 'flex'}}>
                    <Grid item lg = {6} style={{justifyContent: 'center', marginTop: 20, display: 'flex'}}>
                        <Button variant='contained' color='primary' size='medium' onClick={handleEditOpen}>
                            Edit Question <EditIcon fontSize="small" style={{marginLeft: 7}}></EditIcon>
                        </Button>
                    </Grid>
                    <Grid item lg = {6} style={{justifyContent: 'center', marginTop: 20, display: 'flex'}}>
                        <Button variant='contained' color='primary' size='medium' onClick={handleDeleteOpen}>
                            Delete Question <DeleteIcon fontSize="small" style={{marginLeft: 7}}></DeleteIcon>
                        </Button>
                    </Grid>
                    
                </Grid>
            </Grid>
          </ExpansionPanelDetails>
        <Dialog open={editOpen} onClose={handleEditClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit FAQ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change Question and Answer
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Question"
            defaultValue={props.question}
            onChange={(e) => {
                
                setEditQuestion(e.target.value)
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Answer"
            style={{marginTop: 20}}
            defaultValue={props.answer}
            onChange={(e) => {
                
                setEditAnswer(e.target.value)
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditConfirm} color="primary">
            Confirm Change
          </Button>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="draggable-dialog-title"
         >
         <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Delete FAQ
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to Delete this FAQ item?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleDeleteConfirm} color="primary">
                Delete
            </Button>
            <Button onClick={handleDeleteClose} color="primary">
                Cancel
            </Button>
        </DialogActions>
        </Dialog>
        </ExpansionPanel>
    );

}

export default FaqCard