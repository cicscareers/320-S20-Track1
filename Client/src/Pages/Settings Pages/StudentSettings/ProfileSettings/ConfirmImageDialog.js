import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class ConfirmImageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            picture: props.picture,
            
        }

        this.canvasRef = React.createRef();
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open });
    }

    handleProfileChange(file) {
        var fr = new FileReader();
        fr.onload = (e) => {
            this.setState({
                open: true,
                picture: e.target.result
            })
        }
        fr.readAsDataURL(file);
    }

    handleImageUpload = () => {
        this.canvasRef.current.toBlob((blob) => {
            this.fetchPresignedPostURL(blob);
        }, 'image/jpeg', 1.0);
    }

    fetchPresignedPostURL = (file) => {
        fetch('https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/' + sessionStorage.getItem('id') + '/picture/upload')
        .then((response) => response.json())
        .then((presignedPostData) => {
            const formData = new FormData();
            Object.keys(presignedPostData.fields).forEach((field) => {
                formData.append(field, presignedPostData.fields[field])
            })
            formData.append("file", file);
            fetch(presignedPostData.url, {
                method: 'PUT',
                body: formData
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.log(error))
        })
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
                    {/* Canvas is used for image conversion to JPEG. */}
                    <canvas ref={this.canvasRef} width="200" height="100">
                        {/* Please add styling here @Sahil. */}
                        <img src={this.state.picture} />
                    </canvas>
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