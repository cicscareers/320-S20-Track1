import React from 'react'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

export default function Alert({
  handleClose,
  handleSubmit,
  isOpen,
  hasTwoButtons = false,
  submitButtonText,
  title,
  text,
}) {
  return (
    <Dialog
      open={isOpen}
      transition={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {hasTwoButtons ? (
          <Button onClick={handleClose} variant="raised" color="primary">
            {'CANCEL'}
          </Button>
        ) : null}
        <Button onClick={handleSubmit} color="primary">
          {submitButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
