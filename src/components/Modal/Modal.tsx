import "./Modal.scss";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Box,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { habitTracker } from "../../data/data";
import { Form } from "../../types/habitForm";
import * as yup from "yup";

const getValidationSchema = () =>
  yup.object({
    habit: yup
      .string()
      .required("habit is required")
      .matches(
        /^[A-Za-z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
        "Invalid characters in habit"
      ),
    time: yup
      .string()
      .required("Time is required")
      .matches(/^[0-9:]+$/, "Time should be in format HH:MM"),
    duration: yup
      .string()
      .required("Duration is required")
      .matches(/^\d+([.,]\d+)?\s*$/, "Invalid format for duration"),
    periodicity: yup
      .string()
      .required("Periodicity is required")
      .matches(/^[A-Za-z0-9 ]+$/, "Invalid characters in periodicity"),
  });
const validationSchema = getValidationSchema();

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  openEdit?: boolean;
  setOpenEdit?: (openEdit: boolean) => void;
  isIndex?: number | null;
  setFlag: (flag: boolean) => void;
  setIndex: (index: number | null) => void;
}

function Modal({
  open,
  openEdit,
  setOpenEdit,
  setOpen,
  isIndex,
  setFlag,
  setIndex,
}: ModalProps) {
  const [formData, setFormData] = useState<Form>({
    id: habitTracker.length + 1,
    habit: "",
    time: "",
    duration: "",
    periodicity: "",
    status: false,
  });
  const [editFormData, setEditFormData] = useState<Form>({
    id: habitTracker.length + 1,
    habit: "",
    time: "",
    duration: "",
    periodicity: "",
    status: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  const handleClose = () => {
    if (open && setOpen) {
      setFormData({
        id: habitTracker.length + 1,
        habit: "",
        time: "",
        duration: "",
        periodicity: "",
        status: false,
      });
      setOpen(false);
    } else if (setOpenEdit) {
      setOpenEdit(false);
      setIndex(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (open) {
      setFormData((prev) => ({ ...prev, [id]: value }));
    } else {
      setEditFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await validationSchema.validate(open ? formData : editFormData, {
        abortEarly: false,
      });
      if (open) {
        habitTracker.push(formData);
        setFlag(true);
      } else if (isIndex || isIndex === 0) {
        habitTracker.splice(isIndex, 1, editFormData);
        setFlag(true);
        setIndex(null);
      }
      (open ? setFormData : setEditFormData)({
        id: habitTracker.length + 1,
        habit: "",
        time: "",
        duration: "",
        periodicity: "",
        status: false,
      });
      setErrors({});
      handleClose();
    } catch (validationErrors) {
      const formattedErrors: Partial<Record<keyof Form, string>> = {};

      if (validationErrors instanceof yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          if (error.path && error.message) {
            const key = error.path as keyof Form;
            formattedErrors[key] = error.message;
          }
        });
      }
      setErrors(formattedErrors);
    }
  };

  useEffect(() => {
    if (isIndex || isIndex === 0) {
      setEditFormData(habitTracker[isIndex]);
    }
  }, [isIndex]);

  return (
    <React.Fragment>
      <Dialog
        open={open || openEdit || false}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {open ? "Fill in the details" : "Change the data"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="habitForm"
            onSubmit={formSubmit}
            sx={{
              "& .MuiTextField-root": {
                width: "25ch",
                display: "flex",
                flexDirection: "column",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="habit"
              label="Habit Name"
              type="text"
              value={open ? formData.habit : editFormData.habit}
              onChange={handleInputChange}
              error={!!errors.habit}
              sx={{
                marginLeft: "100px",
                marginRight: "100px",
                marginBottom: "10px",
              }}
            />
            <TextField
              required
              id="time"
              label="Habit Time"
              type="text"
              value={open ? formData.time : editFormData.time}
              onChange={handleInputChange}
              error={!!errors.time}
              sx={{
                marginLeft: "100px",
                marginRight: "100px",
                marginBottom: "10px",
              }}
            />
            <TextField
              required
              id="duration"
              label="Habit Duration"
              type="text"
              value={open ? formData.duration : editFormData.duration}
              onChange={handleInputChange}
              error={!!errors.duration}
              sx={{
                marginLeft: "100px",
                marginRight: "100px",
                marginBottom: "10px",
              }}
            />
            <TextField
              required
              id="periodicity"
              label="Habit Periodicity"
              type="text"
              value={open ? formData.periodicity : editFormData.periodicity}
              onChange={handleInputChange}
              error={!!errors.periodicity}
              sx={{
                marginLeft: "100px",
                marginRight: "100px",
                marginBottom: "10px",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" form="habitForm" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Modal;
