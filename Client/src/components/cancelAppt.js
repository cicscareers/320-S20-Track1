import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import {Grid, Button, TextField} from '@material-ui/core';
  
function handlePress(){
    
}

const CancelAppt = (props) => {
    const {subject, location, medium, time, date, supporter, profilepic} = props;
    return (
    <Container component = 'main'>
        <Card style={{padding: 20, margin: 30}}>  
          <Grid lg = {12} style={{marginLeft: 18, marginTop: 30}}>
              <Typography variant="h5"> Are you sure you want to cancel your appointment with {supporter}?</Typography>
              <br/>
              <Typography>Please state your reason for cancellation</Typography>
              <TextField
                  style = {{width: 1100}}
                  id="outlined-multiline-static"
                  multiline
                  rows="6"
                  
                  variant="outlined"
              />
          </Grid>
          <Grid lg = {12} style = {{display: 'flex', justifyContent: 'center'}}>
              <Button href='/appointments' style={{width: 150, color: '#FFFFFF', backgroundColor: '#881c1c', marginTop: 50}} onPress={handlePress}>Confirm Cancellation</Button>
          </Grid>
        </Card>
    </Container>
    );
}

export default CancelAppt;