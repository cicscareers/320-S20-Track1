import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class ConfirmImageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            picture: props.picture
        }
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open });
    }

    handleImageUpload = () => {
        // TODO
    }

    render() {
        return (
            <Dialog open={this.state.open} onClose={this.toggleOpen}>
                <DialogTitle onClose={this.toggleOpen}>
                    Change Profile Picture
                    <IconButton onClick={this.toggleOpen} style={{position: 'absolute', right: '0px', top: '0px' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {/* Add Image Here */}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleImageUpload} color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}