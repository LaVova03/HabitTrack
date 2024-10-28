import "./Auth.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";

const getValidationSchema = (isLogin: string) =>
  yup.object({
    userName: yup
      .string()
      .required("User Name is required")
      .matches(
        /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
        "Only Latin letters, symbols, and numbers are allowed"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
        "Only Latin letters, symbols, and numbers are allowed"
      ),
    ...(isLogin !== "log" && {
      confirm: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required")
        .matches(
          /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
          "Only Latin letters, symbols, and numbers are allowed"
        ),
    }),
  });

interface Form {
  userName: string;
  password: string;
  confirm?: string;
}

function Auth() {
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem("auth");

  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [formData, setFormData] = useState<Form>({
    userName: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Partial<Form>>({});

  useEffect(() => {
    sessionStorage.removeItem("token");
  }, []);

  useEffect(() => {
    setIsAuth(isLogin === "log");
  }, [isLogin]);

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationSchema = getValidationSchema(isLogin || "");

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      sessionStorage.setItem(
        "token",
        "jdhgjhdfjdsfkjsnkdfmkmfsldlsdfhdsbjfhjk"
      );
      setFormData({ userName: "", password: "", confirm: "" });
      setErrors({});
      navigate("/main");
    } catch (validationErrors) {
      const formattedErrors: Partial<Form> = {};
      if (validationErrors instanceof yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          if (error.path)
            formattedErrors[error.path as keyof Form] = error.message;
        });
      }
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="Auth">
      <h1>HabiTrack</h1>
      <Box
        component="form"
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
          id="userName"
          label="User Name"
          type="text"
          value={formData.userName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, userName: e.target.value }))
          }
          error={Boolean(errors.userName)}
        />
        <TextField
          required
          id="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          error={Boolean(errors.password)}
        />
        {!isAuth ? (
          <TextField
            required
            id="confirm"
            type="password"
            label="Confirm Password"
            value={formData.confirm || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, confirm: e.target.value }))
            }
            error={Boolean(errors.confirm)}
          />
        ) : null}
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "150px" }}
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default Auth;
