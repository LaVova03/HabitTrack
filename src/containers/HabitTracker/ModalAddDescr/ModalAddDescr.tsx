import "./ModalAddDescr.scss";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form } from "../../../types/habitForm";

interface AddDescr {
  setAddDescr: (value: boolean) => void;
  isAddDescr: boolean;
  isAddDesIndex: number | null;
  habitTracker: Form[];
  setHabitTracker: (value: Form[]) => void;
  setFlag: (value: boolean) => void;
}

interface Data {
  name: string;
  description: string;
}

function ModalAddDescr({
  setAddDescr,
  isAddDescr,
  isAddDesIndex,
  habitTracker,
  setHabitTracker,
  setFlag,
}: AddDescr) {
  const [isData, setData] = useState<Data>({
    name: "",
    description: "",
  });

  const handleClose = () => {
    setAddDescr(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isAddDesIndex !== null) {
      const updatedHabitTracker = [...habitTracker];
      updatedHabitTracker[isAddDesIndex] = {
        ...updatedHabitTracker[isAddDesIndex],
        [isData.name]: isData.description,
      };
      setHabitTracker(updatedHabitTracker);
      setFlag(true);
    }
    handleClose();
  };

  return (
    <Dialog
      open={isAddDescr}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Add a description</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name Field"
          type="text"
          fullWidth
          variant="standard"
          value={isData.name}
          onChange={(e) =>
            setData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <TextField
          required
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={isData.description}
          onChange={(e) =>
            setData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalAddDescr;
