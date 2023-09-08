import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm"  TransitionComponent={Slide} transitionDuration={200} transitionDirection="down">
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText fontSize={16}>
          Are you sure you want to proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="success">
          Cancel
        </Button>
        <Button onClick={() => { onConfirm(); onClose(); }} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;