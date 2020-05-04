import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import PropTypes from "prop-types";

const FaqCard = (props) => {
  const [editOpen, setEditDialog] = useState(false);
  const [deleteOpen, setDeleteDialog] = useState(false);
  const [editQuestion, setEditQuestion] = useState(props.question);
  const [editAnswer, setEditAnswer] = useState(props.answer);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Grid lg={12} style={{ justifyContent: "center", display: "flex" }}>
          <Typography component="h1" variant="h5">
            {props.question}
          </Typography>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid
          container
          lg={12}
          style={{ justifyContent: "center", display: "flex" }}
        >
          <Grid
            item
            lg={12}
            style={{ justifyContent: "center", display: "flex" }}
          >
            <Typography style={{ fontSize: 20 }}>{props.answer}</Typography>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default FaqCard;
