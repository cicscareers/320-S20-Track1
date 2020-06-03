import React, { useState, useEffect} from "react";
import {Button, Typography, TextField, Grid, Card, Dialog, DialogTitle,
        DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ChangeTags() {
    const [selectedCollege, setSelectedCollege] = useState("");
    const [addCollege, setAddCollege] = useState("");
    const [colleges, setColleges] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    useEffect(() => {
      fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/colleges")
      .then(res => res.json())
      .then(json => {
        setColleges(json.colleges)
        setLoaded(true)
      })
    },[])

    function handleDeleteClose(){
      setDeleteOpen(false);
    }

    function reloadInfo(){
      fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/colleges")
      .then(res => res.json())
      .then(json => {
        setColleges(json.colleges)
        setLoaded(true)
      })
    }

    function handleDeleteConfirm(){
      fetch(
        " https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/colleges",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              college_id: selectedCollege.college_id,
              college: selectedCollege.college
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

    function handleAddConfirm(){
      fetch(
        "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/colleges",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              college: addCollege
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
                      Colleges
                    </Typography>
                </Grid>
                <Grid container item lg={12} justify='center' style={{display: 'flex', padding: 10, marginTop: 20}}>
                  <Grid item lg={6} justify='flex-end' style={{display: 'flex', padding: 10}}>
                  <Autocomplete
                    id="supporter-topics"
                    options= {colleges}
                    style={{width: 300}}
                    getOptionLabel={(option)=> option.college}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Colleges"
                      />
                    )}
                    onChange={(e,T) => setSelectedCollege(T)}
                  />
                  </Grid>
                  <Grid item lg={6} justify='flex-start' style={{display: 'flex', padding: 10}}>
                    <Button variant='contained' color='primary' size='large' onClick={handleDeleteOpen}>
                      Delete College
                    </Button>
                  </Grid>
                </Grid>
                <Grid container item lg={12} justify='center' style={{display: 'flex', padding: 10}}>
                  <Grid item lg={6} justify='flex-end' style={{display: 'flex', padding: 10}}>
                    <TextField
                      variant="outlined"
                      id="add-topic"
                      style={{width: 300}}
                      label="College to add:"
                      name="add-topic"
                      onChange={e => setAddCollege(e.target.value)}
                    />
                  </Grid>
                <Grid item lg={6} justify='flex-start' style={{display: 'flex', padding: 10}}>
                  <Button variant='contained' color='primary' size='large' onClick={handleAddOpen}>
                    Add College
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
                        Delete College
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to Delete this College?
                        </DialogContentText>
                        <DialogContentText>
                            {selectedCollege.college}
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
                        Add College
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to add this College?
                        </DialogContentText>
                        <DialogContentText>
                          {addCollege}
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