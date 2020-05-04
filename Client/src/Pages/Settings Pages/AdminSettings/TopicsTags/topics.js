import React, { useState, useEffect} from "react";
import {Button, Typography, TextField, Grid, Card, Dialog, DialogTitle,
        DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Topics from "../../../FindSupporter/topics"

export default function ChangeTags() {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [addTopic, setAddTopic] = useState("");
    const [topics, setTopics] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    function handleDeleteClose(){
      setDeleteOpen(false);
    }

    function handleDeleteConfirm(){
      fetch(
        "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/specialization-types",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              specialization_type_id: selectedTopic.specialization_type_id
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
        "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/specialization-types",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              specialization_type: addTopic
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

    function reloadInfo(){
      fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/specialization-types")
      .then(res => res.json())
      .then(json => {
        setTopics(json.specialization_types)
        setLoaded(true)
      })
    }

    useEffect(() => {
      fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/specialization-types")
      .then(res => res.json())
      .then(json => {
        setTopics(json.specialization_types)
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
                      Supporter Topics
                    </Typography>
                </Grid>
                <Grid container item lg={12} justify='center' style={{display: 'flex', padding: 10, marginTop: 20}}>
                  <Grid item lg={6} justify='flex-end' style={{display: 'flex', padding: 10}}>
                  <Autocomplete
                    id="supporter-topics"
                    options= {topics}
                    style={{width: 300}}
                    getOptionLabel={option => option.specialization_type}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Topics"
                      />
                    )}
                    onChange={(e,T) => setSelectedTopic(T)}
                  />
                  </Grid>
                  <Grid item lg={6} justify='flex-start' style={{display: 'flex', padding: 10}}>
                    <Button variant='contained' color='primary' size='large' onClick={handleDeleteOpen}>
                      Delete Topic
                    </Button>
                  </Grid>
                </Grid>
                <Grid container item lg={12} justify='center' style={{display: 'flex', padding: 10}}>
                  <Grid item lg={6} justify='flex-end' style={{display: 'flex', padding: 10}}>
                    <TextField
                      variant="outlined"
                      id="add-topic"
                      style={{width: 300}}
                      label="Topic to add:"
                      name="add-topic"
                      onChange={e => setAddTopic(e.target.value)}
                    />
                  </Grid>
                <Grid item lg={6} justify='flex-start' style={{display: 'flex', padding: 10}}>
                  <Button variant='contained' color='primary' size='large' onClick={handleAddOpen}>
                    Add Topic
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
                        Delete Topic
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to Delete this Topic?
                        </DialogContentText>
                        <DialogContentText>
                            {selectedTopic.specialization_type}
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
                        Add Topic
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to add this Topic?
                        </DialogContentText>
                        <DialogContentText>
                          {addTopic}
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