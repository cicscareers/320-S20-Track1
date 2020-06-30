import React, { useState, useEffect} from "react";
import {Button, Typography, TextField, Grid, Card, Dialog, DialogTitle,
        DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ChangeTags() {
    const [selectedTag, setSelectedTag] = useState("");
    const [addTag, setAddTag] = useState("");
    const [tags, setTags] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    function handleDeleteClose(){
      setDeleteOpen(false);
    }

    function handleDeleteConfirm(){
      fetch("https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/tags",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              tag_type_id: selectedTag.tag_type_id
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
        "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/tags",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              tag_type: addTag
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
      fetch('https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/tags')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setTags(json.tags)
        setLoaded(true)
      })
    }

    useEffect(() => {
      fetch('https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/tags')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setTags(json.tags)
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
                      Help Needed Tags
                    </Typography>
                </Grid>
                <Grid container item lg={12} justify='center' style={{display: 'flex', padding: 10, marginTop: 20}}>
                  <Grid item lg={6} justify='flex-end' style={{display: 'flex', padding: 10}}>
                  <Autocomplete
                    id="help-needed-tags"
                    options= {tags}
                    style={{width: 300}}
                    getOptionLabel={(option) => option.tag_type}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Tags"
                      />
                    )}
                    onChange={(e,T) => setSelectedTag(T)}
                  />
                  </Grid>
                  <Grid item lg={6} justify='flex-start' style={{display: 'flex', padding: 10}}>
                    <Button variant='contained' color='primary' size='large' onClick={handleDeleteOpen}>
                      Delete Tag
                    </Button>
                  </Grid>
                </Grid>
                <Grid container item lg={12} justify='center' style={{display: 'flex', padding: 10}}>
                  <Grid item lg={6} justify='flex-end' style={{display: 'flex', padding: 10}}>
                    <TextField
                      variant="outlined"
                      id="add-tag"
                      style={{width: 300}}
                      label="Tag to add:"
                      name="add-topic"
                      onChange={e => setAddTag(e.target.value)}
                    />
                  </Grid>
                <Grid item lg={6} justify='flex-start' style={{display: 'flex', padding: 10}}>
                  <Button variant='contained' color='primary' size='large' onClick={handleAddOpen}>
                    Add Tag
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
                        Delete Tag
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to Delete this Tag item?
                        </DialogContentText>
                        <DialogContentText>
                            {selectedTag.tag_type}
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
                        Add Tag
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to Add this Tag item?
                        </DialogContentText>
                        <DialogContentText>
                          {addTag}
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