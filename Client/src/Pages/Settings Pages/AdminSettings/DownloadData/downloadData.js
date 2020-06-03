import React from "react";
import {Button} from "@material-ui/core";

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