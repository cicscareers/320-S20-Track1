import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
export default function adminSettings() {
  return (
    // <Container component="main" maxWidth="xs" align="center">
    //   <Typography component="h1" variant="h5" align="center">
    //     Admin Settings
    //   </Typography>
    // </Container>

    <Grid container direction="column">
      <Paper style={{padding:20}}>
        <Grid Item>
          <Typography component="h1" variant="h5" color="primary">
              Admin Settings
          </Typography>
        </Grid>

      <Grid containtr Item style={{marginLeft:'25px'}}>
        <Grid Item Container>
          <Typography component="h1" variant="h5">
              Field Defaults
          </Typography>
            <Grid Item container direction="column">
              <Grid Item container style={{marginLeft:'25px'}}>
                <Grid Item>
                    <Typography component="h1" variant="h6">
                      Test:
                    </Typography>
                </Grid>
                <Grid Item>
                  <Autocomplete
                   id="value"
                   options={1,2,3,4}//this isnt working
                   style={{ width: 200 }}
                   renderInput={(params) => <TextField label="Value" variant="outlined" id = "value"/> }
                   />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        <Grid Item>
            <Typography component="h1" variant="h5">
                Supporter Labels
            </Typography>
          </Grid>
          <Grid Item>
            <Typography component="h1" variant="h5">
                Help Needed Topics
            </Typography>
          </Grid>
          <Grid Item>
            <Typography component="h1" variant="h5">
                Appointment Types
            </Typography>
          </Grid>
          <Grid Item>
              <Typography component="h1" variant="h5">
                  Block/Unblock User
              </Typography>
            </Grid>
            <Grid Item>
                <Typography component="h1" variant="h5">
                    Download Data
                </Typography>
              </Grid>
            </Grid>
              </Paper>
      </Grid>

  );
}
