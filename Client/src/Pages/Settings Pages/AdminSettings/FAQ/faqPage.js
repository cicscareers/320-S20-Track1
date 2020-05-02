import React, { useEffect, useState } from 'react';
import {Typography, Button, Grid, TextField} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import FaqCard from './faqCard'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const FaqSettings = () => {

    const [unapproved, setUnapproved] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [addOpen, setAddDialog] = useState(false);
    const [faqList, setFaqList] = useState([]);
    const [newQuestion, setNewQuestion] = useState("")
    const [newAnswer, setNewAnswer] = useState("")

    useEffect(() => {
        fetch('https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/faq')
        .then(res => res.json())
        .then(json => {
            
            setFaqList(json.faqs)
            setLoaded(true);
        })
    })

    function handleAddOpen(){
        setAddDialog(true)
    }
    function handleAddClose(){
        setAddDialog(false)
    }

    function handleAddConfirm(){
        fetch(
            "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/faq",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  question: newQuestion,
                  answer: newAnswer
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
        //window.location.reload(false)
        setAddDialog(false)
    }
    

    if(!isLoaded){
        return <Typography>Loading...</Typography>
    }
    else{
        return(
            <main>
                {faqList.map((faq) => [
                    <FaqCard
                    question = {faq.question}
                    answer = {faq.answer}
                    id = {faq.faq_id}
                />
                ])}
                
                <Grid container lg={12} style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                    <Button variant='contained' color='primary' size='medium' onClick={handleAddOpen}>
                                Add FAQ Question <AddIcon fontSize="small" style={{marginLeft: 7}}></AddIcon>
                    </Button>
                </Grid>
                <Dialog open={addOpen} onClose={handleAddClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add New FAQ</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Change Question and Answer
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Question"
                        onChange={(e) => {
                            
                            setNewQuestion(e.target.value)
                        }}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Answer"
                        style={{marginTop: 20}}
                        onChange={(e) => {
                            
                            setNewAnswer(e.target.value)
                        }}
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleAddConfirm} color="primary">
                        Add FAQ
                    </Button>
                    <Button onClick={handleAddClose} color="primary">
                        Cancel
                    </Button>
                    </DialogActions>
                </Dialog>
                
                
            
            </main>
         );
    }
   
    
}

export default FaqSettings;