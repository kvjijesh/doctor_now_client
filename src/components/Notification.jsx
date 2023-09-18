import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

const SnackbarContainer = ({ notifications, handleClose, handleRead }) => {
  return (
    <div>
      {notifications.map((notification) => (
        <Snackbar
          key={notification._id}
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={notification.message}
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={handleRead}>
                Mark as Read
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      ))}
    </div>
  );
};

export default SnackbarContainer;
