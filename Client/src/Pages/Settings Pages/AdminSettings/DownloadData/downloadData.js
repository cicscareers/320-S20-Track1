import React, { useState } from "react";
import {Button, Typography, TextField, Grid} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function DownloadData() {
	return(
		<div>
        <Button variant='contained' color='primary' size='large'>
            Download Supporter Data
        </Button>
        <br/>
        <br/>
        <Button variant='contained' color='primary' size='large'>
            Download Student Data
        </Button>
        <br/>
        <br/>
        <Button variant='contained' color='primary' size='large'>
            Download Website Data
        </Button>
        </div>
        );

	}