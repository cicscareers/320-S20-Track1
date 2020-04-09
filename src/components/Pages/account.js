import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Cookies from "universal-cookie";
import { Box, Grid, TextField, Button, Avatar, Card } from "@material-ui/core";

export default function accts() {
  const cookies = new Cookies();
  const fname = cookies.get("firstName");
  const lname = cookies.get("lastName");
  const role = cookies.get("role");
  const email = cookies.get("email");
  return (
    /*<Container component="main" maxWidth="xs" align="center">
      <Typography component="h1" variant="h5" align="center">
        User: {fname} {lname}
      </Typography>
      <Typography component="h1" variant="h5" align="center">
        Role: {role}
      </Typography>
      <Typography component="h1" variant="h5" align="center">
        Email Address: {email}
      </Typography>
    </Container>*/
    

    
    <Container component='main'>
      <Card style = {{marginTop: 30, padding: 30, marginBottom: 30}}>
      <Avatar style={{marginTop: 30, width: 50,height: 50}}>{fname.toUpperCase().charAt(0) + lname.toUpperCase().charAt(0)}</Avatar>
      <Typography style = {{fontSize: 30, textAlign: 'left', marginTop: 40}}><strong>Account Settings</strong></Typography>
      
      <Box borderTop = {1} borderBottom={1} style={{marginTop: 30, height: 220}}>
        <Grid>
          <Grid>
              
              <Typography style={{marginTop: 10, marginBottom: 10}}><strong>Your Info</strong></Typography>
          </Grid>
          <Grid style={{display: 'flex'}}>
            <Grid  lg ={4} >
              <Typography>Email address</Typography>
              <TextField id="outlined-basic" label="" variant="outlined" />
            </Grid>
            <Grid lg = {4} >
              <Typography>First Name</Typography>
              <TextField id="outlined-basic" label="" variant="outlined" />
            </Grid>
            <Grid lg = {4} >
              <Typography>Last Name</Typography>
              <TextField id="outlined-basic" label="" variant="outlined" />
            </Grid>
          </Grid>
          <Grid lg = {12} style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <Button style={{color: '#FFFFFF', backgroundColor: '#881c1c', marginTop: 30}}>Update Info</Button>
          </Grid>
            
        </Grid>
        
      </Box>
      <Box borderBottom={1}  borderColor='#D3D3D3' style={{marginTop: 10, height: 200}}>
        <Grid>
          <Grid>
              
              <Typography style={{marginBottom: 20}}>Password</Typography>
          </Grid>
          <Grid style={{display: 'flex'}}>
            <Grid  lg ={4} >
              <Typography>New Password</Typography>
              <TextField
                id="outlined-password-input"
                label=""
                type="password"
                autoComplete="current-password"
                variant="outlined"
              />
            </Grid>
            <Grid lg = {4} >
              <Typography>Confirm New Password</Typography>
              <TextField
                id="outlined-password-input"
                label=""
                type="password"
                autoComplete="current-password"
                variant="outlined"
              />
            </Grid>
            
          </Grid>
          <Grid lg = {12} style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <Button style={{color: '#FFFFFF', backgroundColor: '#881c1c', marginTop: 15}}>Update Password</Button>
          </Grid>
            
        </Grid>
        
      </Box>
      <Box borderBottom={1}  borderColor='#D3D3D3' style={{height: 200}}>
        <Grid>
          <Grid>
              
              <Typography style={{marginTop: 10, marginBottom: 20}}><strong>Academic</strong></Typography>
          </Grid>
          <Grid style={{display: 'flex'}}>
            <Grid  lg ={4} >
              <Typography>Major</Typography>
              <TextField id="outlined-basic" label="" variant="outlined" />
            </Grid>
            <Grid lg = {4} >
              <Typography>Graduation Year</Typography>
              <TextField id="outlined-basic" label="" variant="outlined" />
            </Grid>
            
          </Grid>
          <Grid lg = {12} style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <Button style={{color: '#FFFFFF', backgroundColor: '#881c1c', marginTop: 15}}>Update Password</Button>
          </Grid>
            
        </Grid>
        
      </Box>
      <Box borderBottom={1}  borderColor='#D3D3D3' style={{height: 260}}>
        <Grid>
          <Grid>
              
              <Typography style={{marginTop: 10, marginBottom: 20}}><strong>Biography</strong></Typography>
          </Grid>
          <Grid style={{display: 'flex'}}>
              <TextField
                style = {{width: 1000}}
                id="outlined-multiline-static"
                multiline
                rows="6"
                
                variant="outlined"
              />
            
          </Grid>
          <Grid lg = {12} style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <Button style={{color: '#FFFFFF', backgroundColor: '#881c1c', marginTop: 15}}>Update Password</Button>
          </Grid>
            
        </Grid>
        
      </Box>
      <Box borderBottom={1}  borderColor='#D3D3D3' style={{height: 200}}>
        <Grid>
          <Grid>
              
              <Typography style={{marginTop: 10, marginBottom: 20}}><strong>Links</strong></Typography>
          </Grid>
          <Grid style={{display: 'flex'}}>
            <Grid  lg ={4} >
              <Typography>LinkedIn</Typography>
              <TextField id="outlined-basic" label="" variant="outlined" />
            </Grid>
            <Grid lg = {4} >
              <Typography>Github</Typography>
              <TextField id="outlined-basic" label="" variant="outlined" />
            </Grid>
            
          </Grid>
          <Grid lg = {12} style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <Button style={{color: '#FFFFFF', backgroundColor: '#881c1c', marginTop: 15}}>Update Password</Button>
          </Grid>
            
        </Grid>
        
      </Box>
      </Card>
    </Container>
    
  );
}
