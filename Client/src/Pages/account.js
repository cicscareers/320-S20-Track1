import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Topics from "../components/topics.js";
import Tags from "../components/tags.js";

export default function StudentSettings() {
  const fieldDefaults = ["A", "B", "C", "D"];

  const users = ["UserA", "UserB"];

  const blockedUsers = ["UserC", "UserD"];

  const [curField, setCurrField] = useState("");
  const [newDefault, setNewDefault] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [addTopic, setAddTopic] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [addTag, setAddTag] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBlockedUser, setSelectedBlockedUser] = useState("");

  return (
    // <Container component="main" maxWidth="xs" align="center">
    //   <Typography component="h1" variant="h5" align="center">
    //     Admin Settings
    //   </Typography>
    // </Container>

    <Grid container direction="column">
      <Paper style={{ padding: 20 }}>
        <Grid Item>
          <Typography component="h1" variant="h5" color="primary">
            Your Account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>Profile Information</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="First Name"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Preferred Name"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Last Name"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Email Address"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Pronouns"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth="true"
                    multiline
                    rows="5"
                    label="Personal Biography"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                UPLOAD PHOTO HERE
                <Grid item xs={3}>
                  <Button variant="contained" color="primary" size="large">
                    Save Changes
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
              <Typography> Academics</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Spire ID"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Colleges"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Majors"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Minors"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Expected Graduation Year"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                UPLOAD RESUME HERE
                <Grid item xs={3}>
                  <Button variant="contained" color="primary" size="large">
                    Save Changes
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
              <Typography>Links</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="GitHub Link:"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="LinkedIn Link:"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Personal Website Link:"
                    name="field default"
                    onChange={(e) => setNewDefault(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" color="primary" size="large">
                    Save Changes
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
              <Typography>Account Settings</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Autocomplete
                    id="users"
                    options={users}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Users" />
                    )}
                    onChange={(e, v) => setSelectedUser(v)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" color="primary" size="large">
                    Block user
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    id="blocked users"
                    options={blockedUsers}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Blocked Users"
                      />
                    )}
                    onChange={(e, v) => setSelectedBlockedUser(v)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" color="primary" size="large">
                    Unblock user
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
            ></ExpansionPanelSummary>
          </ExpansionPanel>
        </Grid>
      </Paper>
    </Grid>
  );
}
