import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import Topics from "../components/topics.js"



export default function AdminSettings() {
  const fieldDefaults = [
    'A',
    'B',
    'C',
    'D'
  ]
  const [curField, setCurrField] = useState("");
  const [newDefault, setNewDefault] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [addTopic, setAddTopic] = useState("");


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
        <Grid item xs={12}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>
                Field Defaults
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Autocomplete
                    id="field-defaults"
                    options= {fieldDefaults}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select a Field"
                      />
                    )}
                    onChange={(e,v) => setCurrField(v)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Set new:"
                    name="field default"
                    onChange={e => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button variant='contained' color='primary' size='large'>
                    Change
                  </Button>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>
                Supporter Topics
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Autocomplete
                    id="supporter-topics"
                    options= {Topics}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Topics"
                      />
                    )}
                    onChange={(e,v) => setSelectedTopic(v)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant='contained' color='primary' size='large'>
                    Delete Selected Topic
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    id="add-topic"
                    fullWidth
                    label="Topic to add:"
                    name="add-topic"
                    onChange={e => setAddTopic(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant='contained' color='primary' size='large'>
                    Add Topic
                  </Button>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>            
        </Grid>


      
      </Paper>
    </Grid>

  );
}
