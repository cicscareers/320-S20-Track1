
import React, {Component, setState, props} from 'react';
import {Button} from '@material-ui/core';

export default class fileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {file: ""};
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    render() {
        return (
            <Button
                variant="contained"
                margin="normal"
                component="label"
                fullWidth
                align='center'
                color='secondary'
            >
            Upload a Profile Picture: &nbsp;&nbsp; {this.state.file}
            <input
                type="file"
                fullWidth
                align='right'
                onChange={this.onChangeFile}
                style={{display: 'none'}}
            />
            </Button>)
    }

    onChangeFile(e) {
        this.setState({file: e.target.value});
        this.props.onFileChange();
    }
}