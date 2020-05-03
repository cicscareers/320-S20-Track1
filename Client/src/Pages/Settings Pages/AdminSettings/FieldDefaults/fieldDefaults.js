import React, { useState } from "react";
import {Button, Typography, TextField, Grid} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
export default function FieldDefaults() {
  const fieldDefaults = [
    'A',
    'B',
    'C',
    'D'
  ]
  const [curField, setCurrField] = useState("");
  const [newDefault, setNewDefault] = useState("");
  return (
    <div>
      <Typography>
        Field Defaults
      </Typography>
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
                label="Set default:"
                name="field default"
                onChange={e => setNewDefault(e.target.value)}
              />
            </Grid>
              <Grid item xs={1}>
                <Button variant='contained' color='primary' size='large'>
                  Set
                </Button>
              </Grid>
            </Grid>
      </div>
      );
  }