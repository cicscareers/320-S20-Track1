import React, { useState, useEffect} from "react";
import {Button, Typography, TextField, Grid, Card, Dialog, DialogTitle,
        DialogContent, DialogContentText, DialogActions, Input} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Topics from "../../../FindSupporter/topics"
import { InputLabel } from '@material-ui/core';


export default function ChangeTags() {
    const [selectedMedium, setSelectedMedium] = useState("");
    const [addMedium, setAddMedium] = useState("");
    const [mediums, setMediums] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    function handleDeleteClose(){
      setDeleteOpen(false);
    }

    function handleDeleteConfirm(){
      fetch(
        "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/mediums",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              medium_id: selectedMedium.medium_id
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
      setDeleteOpen(false)
    }

    function handleDeleteOpen(){
      setDeleteOpen(true)
    }

    function handleAddClose(){
      setAddOpen(false);
    }

    function handleAddConfirm(){
      fetch(
        "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/mediums",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              medium: addMedium
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
      setAddOpen(false)
    }

    function handleAddOpen(){
      setAddOpen(true)
    }

    useEffect(() => {
      fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/mediums")
      .then(res => res.json())
      .then(json => {
        setMediums(json.mediums)
        setLoaded(true)
      })
    },[])

    if(!isLoaded){
      return <Typography>Loading.....</Typography>
    }
    else{
      return(
        <div>
              <Card style={{width: '100%', height: 350}}>
              
              <Grid container style={{display: 'flex'}} lg={12} spacing={1}>
                <Grid item lg={12} style={{display: 'flex', paddingTop: 20}} justify='center'>
                      <Typography style={{fontSize: 20}}>
                      Mediums
                    </Typography>
                </Grid>
                <Grid container item lg={12} justify='center' style={{display: 'flex', padding: 10, marginTop: 20}}>
                  <Grid item lg={6} justify='flex-end' style={{display: 'flex', padding: 10}}>
                  <Autocomplete
                    id="supporter-topics"
                    options= {mediums}
                    style={{width: 300}}
                    getOptionLabel= {option => option.medium}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Mediums"
                      />
                    )}
                    onChange={(e,T) => setSelectedMedium(T)}
                  />
                  </Grid>
                  <Grid item lg={6} justify='flex-start' style={{display: 'flex', padding: 10}}>
                    <Button variant='contained' color='primary' size='large' onClick={handleDeleteOpen}>
                      Delete Medium
                    </Button>
                  </Grid>
                </Grid>
                <Grid container item lg={12} justify='center' style={{display: 'flex', padding: 10}}>
                  <Grid item lg={6} justify='flex-end' style={{display: 'flex', padding: 10}}>
                    <TextField
                      variant="outlined"
                      id="add-topic"
                      style={{width: 300}}
                      label="Medium to add:"
                      name="add-topic"
                      onChange={e => setAddMedium(e.target.value)}
                    />
                  </Grid>
                <Grid item lg={6} justify='flex-start' style={{display: 'flex', padding: 10}}>
                  <Button variant='contained' color='primary' size='large' onClick={handleAddOpen}>
                    Add Medium
                  </Button>
                </Grid>
                </Grid>
              </Grid>
              
              </Card>

              <Dialog
                    open={deleteOpen}
                    onClose={handleDeleteClose}
                    aria-labelledby="draggable-dialog-title"
                    >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Delete Medium
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to Delete this Medium?
                        </DialogContentText>
                        <DialogContentText>
                            {selectedMedium.medium}
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
              <Dialog
                    open={addOpen}
                    onClose={handleAddClose}
                    aria-labelledby="draggable-dialog-title"
                    >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Add Medium
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to add this Medium?
                        </DialogContentText>
                        <DialogContentText>
                          {addMedium}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleAddConfirm} color="primary">
                            Add
                        </Button>
                        <Button onClick={handleAddClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
              </Dialog>
              
        </div>
            );
    }
	

	}