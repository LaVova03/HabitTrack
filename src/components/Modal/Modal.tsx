import "./Modal.scss";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import { habitTracker } from "../../../public/data";
import * as yup from "yup";

const getValidationSchema = () =>
  yup.object({
    name: yup
      .string()
      .required("Name is required")
      .matches(
        /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
        "Invalid characters in name"
      ),
    time: yup
      .string()
      .required("Time is required")
      .matches(/^[0-9:]+$/, "Time should be in format HH:MM"),
    duration: yup
      .string()
      .required("Duration is required")
      .matches(/^[A-Za-z0-9]+$/, "Invalid characters in duration"),
    periodicity: yup
      .string()
      .required("Periodicity is required")
      .matches(/^[A-Za-z0-9]+$/, "Invalid characters in periodicity"),
  });

const validationSchema = getValidationSchema();

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Form {
  id: number;
  name: string;
  time: string;
  duration: string;
  periodicity: string;
  status: boolean;
}

interface ModalProps {
  setFlag: (value: boolean) => void;
}

function Modal({ setFlag }: ModalProps) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState<Form>({
    id: habitTracker.length + 1,
    name: "",
    time: "",
    duration: "",
    periodicity: "",
    status: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      habitTracker.push(formData);
      setFlag(true);
      setFormData({
        id: habitTracker.length + 1,
        name: "",
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
    console.log(habitTracker);
  }, [habitTracker]);

  return (
    <React.Fragment>
      <Button color="secondary" variant="contained" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Fill in the details"}</DialogTitle>
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
              id="name"
              label="Habit Name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
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
              value={formData.time}
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
              value={formData.duration}
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
              value={formData.periodicity}
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
