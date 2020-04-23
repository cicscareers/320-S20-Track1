import React, { useState, useEffect } from "react";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Topics from "../components/topics.js";
import Tags from "../components/tags.js";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

//import { DropzoneDialog } from "material-ui-dropzone";

export default function StudentSettings() {
  const [first_name, setFirstName] = useState("");
  const [preferred_name, setPreferredName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [link, setLink] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [ID, setID] = useState("");
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [gradYear, setGradYear] = useState("");
  const url = "";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        var info = json.body;
        setFirstName(info.first_name);
      });
  }, []);

  const [value, setValue] = React.useState("yes");

  const handleFeedbackChange = (event) => {
    setValue(event.target.value);
  };

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
                    defaultValue={first_name}
                    name="first_name"
                    required="true"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Preferred Name"
                    name="preferred Name"
                    onChange={(e) => setPreferredName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Last Name"
                    required="true"
                    name="field default"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Email Address"
                    required="true"
                    name="field default"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Pronouns"
                    name="field default"
                    onChange={(e) => setPronouns(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth
                    label="Phone Number"
                    name="field default"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth="true"
                    multiline
                    rows="5"
                    label="Personal Biography"
                    name="field default"
                    onChange={(e) => setBio(e.target.value)}
                  />
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
              <Typography> Supporter Information</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  Type of Supporter (Check all that apply){" "}
                  <Grid item xs={12} spacing="12">
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Professional Staff"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Student Staff"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Alumni"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Faculty"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Other"
                      labelPlacement="end"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth="true"
                    label="Current Employer"
                    name="field default"
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    id="default"
                    fullWidth="true"
                    label="Title"
                    name="field default"
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  Teams (Check all that apply){" "}
                  <Grid item xs={12} spacing="12">
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="CICS Careers"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Ventures"
                      labelPlacement="end"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  Supporter Specialization Areas (Check all that apply){" "}
                  <Grid item xs={12} spacing="12">
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Technical Interview Coaching"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Behavioral Interview Coaching"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Offer Evaluation/Salary Negotiation"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Job Search"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Cover Letter and Resume"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Applying to Grad and Professional School"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Networking Skills"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="General Career Exploration"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Internship/Co-Op/Research"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Other Student Support"
                      labelPlacement="end"
                    />
                  </Grid>
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
              <Typography>Appointment and Email Settings</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  Receive emails for:{" "}
                  <Grid item xs={12} spacing="12">
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Platform News"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Platform Updates"
                      labelPlacement="end"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  How many hours before an appointment would you like a reminder
                  email?{" "}
                  <Grid item xs={12} spacing="12">
                    <TextField
                      id="outlined-basic"
                      label="Number of Hours Before for Appointment Reminder Email"
                      fullWidth="true"
                      variant="outlined"
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  Would you like to display your feedback?{" "}
                  <Grid item xs={12} spacing="12">
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="feedback-display"
                        name="feedback"
                        value={value}
                        onChange={handleFeedbackChange}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio color="primary" />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio color="primary" />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Paper>
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="primary"
          fullWidth="false"
          size="large"
          alignContent="center"
        >
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
}
