import "./AlertDialog.scss";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useAddTemplatesStore } from "../../slices/addTemplates";

interface AlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  Confirm: () => void;
  isTemplates?: boolean;
}

export default function AlertDialog({
  open,
  setOpen,
  Confirm,
  isTemplates,
}: AlertDialogProps) {
  const setFlag = useAddTemplatesStore((state) => state.setFlag);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isTemplates
              ? "Are you sure you want to add this habit?"
              : "Are you sure you want to break this habit?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              Confirm();
              setFlag(true);
              handleClose();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
