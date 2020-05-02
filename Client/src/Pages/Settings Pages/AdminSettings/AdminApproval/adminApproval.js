  
import React, {useState, useEffect} from 'react';
import {  Card, TextField, Button, Grid, Typography, Dialog, DialogContent, DialogContentText,
    DialogActions, DialogTitle,} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';




const AdminApproval = () => {

    const [userList, setUserList] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [current, setCurrent] = useState(null);
    const [openDialog, setDialog] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetch('https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/?is_student=true&?is_supporter=true')
        .then(res => res.json())
        .then(json => {
            console.log(json.users)
            setUserList(json.users)
            setLoaded(true)
        })
        .catch(err =>{
            setUserList([])
            
        })
    },[]);

    function startDialog(){
        setDialog(true);
    }

    function handleConfirm(){
        fetch(
            "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/register/admin",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(current)
           
            }
          )
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
              console.log(response)
              setReload(true);
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
        
        window.location.reload(false)
        setDialog(false)
    }

    function handleCancel(){
        
        setDialog(false)
    }

    function handleClose(){
        setDialog(false)
    }

    if(!isLoaded){
        return <Typography>Loading.....</Typography>
    }
        
    else{
        return(
        
            <Card style={{width: '100%', height: 350}}>

                
                <Grid item lg={12} style={{display: 'flex', height: 300}}>
                    <Grid item lg={6} style={{display: 'flex', height: 300, justifyContent:'center', marginTop: 120}}>
                        <Autocomplete
                        id="combo-box-demo"
                        options={userList}
                        getOptionLabel={(option) => option.first_name + ' ' + option.last_name + ' <' + option.email + '>'}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params}  variant="outlined" />}  
                        onChange = {(e,T) => {
                            setCurrent(T)
                        }}
                        />
                    </Grid>
                    <Grid item lg={6} style={{justifyContent:'center', marginTop: 122, paddingLeft: 150}}>
                        <Button variant='contained' color='primary' style={{width: 150, height: 50, fontSize: 20}}
                        onClick = {startDialog}
                        >
                            Add Admin
                        </Button>
                    </Grid>
                </Grid>

                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Confirmation
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Are you sure you want to make this user an Admin
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button autoFocus onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    </DialogActions>
                </Dialog>
                
                
            </Card>
        
            
       
        );
    }
    

}


export default AdminApproval;