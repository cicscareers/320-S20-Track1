import React, { useState } from "react";
import {Button, Typography, TextField, Grid} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Topics from "../../../FindSupporter/topics.js"

export default function ChangeTopics() {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [addTopic, setAddTopic] = useState("");
	return(
		<div>
          <Typography>
            Supporter Topics
          </Typography>
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
            <Grid item xs={2}>
              <Button variant='contained' color='primary' size='large'>
                Delete Topic
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
            <Grid item xs={2}>
              <Button variant='contained' color='primary' size='large'>
                Add Topic
              </Button>
            </Grid>
          </Grid>
    	</div>
        );
	}
