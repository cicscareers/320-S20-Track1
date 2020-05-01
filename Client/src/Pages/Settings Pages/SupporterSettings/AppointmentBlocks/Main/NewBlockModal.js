import React from "react";
import {Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button} from "@material-ui/core/";

const CreateBlock = (props) =>  {
    const {isOpen} = props
    const[open, setOpen]=React.useState(true)
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Confirm Your Email Address
        </DialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
            A confirmation email has been sent to . Click on the confirmation link in the email to activate your account.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button autoFocus href="/login" color="primary" variant="contained">
            Back to Sign In
            </Button>
        </DialogActions>
        </Dialog>
    );
}

export default CreateBlock
