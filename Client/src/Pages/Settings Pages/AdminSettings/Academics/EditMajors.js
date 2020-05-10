import React, { useState, useEffect} from "react";
import {Button, Typography, TextField, Grid, Card, Dialog, DialogTitle,
        DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ChangeTags() {
    const [selectedMajor, setSelectedMajor] = useState("");
    const [addMajor, setAddMajor] = useState("");
    const [majors, setMajors] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    function handleDeleteClose(){
      setDeleteOpen(false);
    }

    function handleDeleteConfirm(){
      fetch(
        "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/majors",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              major_id: selectedMajor.major_id
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
        setLoaded(false)
        reloadInfo()
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

    function reloadInfo(){
      fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/majors")
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setMajors(json.majors)
        setLoaded(true)
      })
    }

    function handleAddConfirm(){
      fetch(
        "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/majors",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              major: addMajor
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
        setLoaded(false)
        reloadInfo()
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
      fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/majors")
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setMajors(json.majors)
        setLoaded(true)
      })
    },[])

    // useEffect(() => {
    //   fetch('https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/tags')
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log(json)
    //     setTags(json.tags)
    //     setLoaded(true)
    //   })
    // },[])

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
                      Majors
                    </Typography>
                </Grid>
                <Grid container item lg={12} justify='center' style={{display: 'flex', padding: 10, marginTop: 20}}>
                  <Grid item lg={6} justify='flex-end' style={{display: 'flex', padding: 10}}>
                  <Autocomplete
                    id="supporter-topics"
                    options= {majors}
                    style={{width: 300}}
                    getOptionLabel={option => option.major}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Majors"
                      />
                    )}
                    onChange={(e,T) => setSelectedMajor(T)}
                  />
                  </Grid>
                  <Grid item lg={6} justify='flex-start' style={{display: 'flex', padding: 10}}>
                    <Button variant='contained' color='primary' size='large' onClick={handleDeleteOpen}>
                      Delete Major
                    </Button>
                  </Grid>
                </Grid>
                <Grid container item lg={12} justify='center' style={{display: 'flex', padding: 10}}>
                  <Grid item lg={6} justify='flex-end' style={{display: 'flex', padding: 10}}>
                    <TextField
                      variant="outlined"
                      id="add-topic"
                      style={{width: 300}}
                      label="Major to add:"
                      name="add-topic"
                      onChange={e => setAddMajor(e.target.value)}
                    />
                  </Grid>
                <Grid item lg={6} justify='flex-start' style={{display: 'flex', padding: 10}}>
                  <Button variant='contained' color='primary' size='large' onClick={handleAddOpen}>
                    Add Major
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
                        Delete Major
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to Delete this Major?
                        </DialogContentText>
                        <DialogContentText>
                            {selectedMajor.major}
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
                        Add Major
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to add this Major?
                        </DialogContentText>
                        <DialogContentText>
                          {addMajor}
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