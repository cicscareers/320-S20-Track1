import React, { useState } from "react";
import {Button, Typography, TextField, Grid} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function BlockUnblock() {
      const users = [
      'UserA',
      'UserB'
    ]

    const blockedUsers = [
      'UserC',
      'UserD'
    ]
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedBlockedUser, setSelectedBlockedUser] = useState("");

    //to get console to stop yelling
    function f(a,b){}
    f(selectedBlockedUser, selectedUser)
    return(
    <div>
    <Typography>
      Block/Unblock User
    </Typography>

    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Autocomplete
          id="users"
          options= {users}
          renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Users"
            />
            )}
            onChange={(e,v) => setSelectedUser(v)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant='contained' color='primary' size='large'>
            Block user
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            id="blocked users"
            options= {blockedUsers}
            renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Blocked Users"
              />
            )}
          onChange={(e,v) => setSelectedBlockedUser(v)}
                  />
        </Grid>
        <Grid item xs={2}>
          <Button variant='contained' color='primary' size='large'>
            Unblock user
          </Button>
        </Grid>
        </Grid>
      </div>
      );
  }