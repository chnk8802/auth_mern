import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import api from '../services/api'
import { showNotification } from "../app/features/notification/notificationSlice";

export default function AlertDialog({doctype, path, id}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDeleteRecord = async (path, id) => {
    try {
      const response = await api.delete(`${path}/${id}`)
      if (response.status === 201) {
        dispatch(showNotification({
          type: "success",
          open: true,
          message: `${doctype} deleted successfully`
        }))
      }
    } catch (error) {
      dispatch(showNotification({
        type: "error",
        open: true,
        message: `Something went wrong`
      }))
    }
  }

  const handleDelete = () => {
    confirmDeleteRecord(path, id)
    setOpen(false);
  }

  return (
    <React.Fragment>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Parmanently delete record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            disableElevation
            onClick={handleDelete}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
