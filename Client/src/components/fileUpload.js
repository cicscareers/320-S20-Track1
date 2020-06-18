
import React from 'react';
import {Button} from '@material-ui/core';

export default function fileUpload() {
    return (
        <Button
            variant="contained"
            margin="normal"
            component="label"
            fullWidth
            align='center'
            color='secondary'
        >
            Upload a Profile Picture: &nbsp;&nbsp;
            <input
                type="file"
                fullWidth
                align='right'
            />
        </Button>)
}