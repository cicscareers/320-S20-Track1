import React, { useState } from "react";
import {Button, Typography, TextField, Grid} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Tags from "../../../FindSupporter/tags.js"

export default function ChangeTags() {
    const [selectedTag, setSelectedTag] = useState("");
    const [addTag, setAddTag] = useState("");
	return(
		<div>
          <Typography>
            Help Needed Tags
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Autocomplete
                id="tags"
                options= {Tags}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                  />
                )}
                onChange={(e,v) => setSelectedTag(v)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' color='primary' size='large'>
                Delete Tag
              </Button>
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                id="add-tag"
                fullWidth
                label="Tag to add:"
                name="add-tag"
                onChange={e => setAddTag(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' color='primary' size='large'>
                Add Tag
              </Button>
            </Grid>
          </Grid>
    </div>
        );

	}