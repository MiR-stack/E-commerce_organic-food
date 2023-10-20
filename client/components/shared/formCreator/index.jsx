import React, { useState } from "react";
import { useFormik } from "formik";
import { initFormValue, objectToFormData } from "../../../utils";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Box,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function FormCreator({ children, data, validate, submit }) {
  const initialvalues = initFormValue(data);
  const formData = objectToFormData(data);

  const { touched, errors, getFieldProps, handleSubmit } = useFormik({
    initialValues: initialvalues,
    validate,
    onSubmit: submit,
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      {formData.map(({ name, type, placeholder, label }) => {
        const error = Boolean(touched[name] && errors[name]);

        if (type === "password") {
          return (
            <FormControl
              fullWidth
              margin="normal"
              variant="outlined"
              error={error}
              key={name}
              size="small"
            >
              <InputLabel htmlFor={name}>{label}</InputLabel>
              <OutlinedInput
                id={name}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={label}
                {...getFieldProps(name)}
              />
              {error && (
                <FormHelperText id={name}>{errors[name]}</FormHelperText>
              )}
            </FormControl>
          );
        } else {
          return (
            <TextField
              error={error}
              helperText={error && errors[name]}
              key={name}
              label={label}
              id={name}
              type={type}
              placeholder={placeholder}
              fullWidth
              margin="normal"
              size="small"
              {...getFieldProps(name)}
            />
          );
        }
      })}
      {children}
    </Box>
  );
}

export default FormCreator;
