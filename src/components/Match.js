import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core"
import Right from './matchRight.js';
import Left from './matchLeft.js';

function Match(){
  return (
    <Grid container>
      <Grid item sm>
        {Left()}
      </Grid>
      <Grid item sm>
        {Right()}
      </Grid>
    </Grid>
  );
}
export default Match;