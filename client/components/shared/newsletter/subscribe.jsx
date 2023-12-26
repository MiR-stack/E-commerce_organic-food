"use client";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputBase,
} from "@mui/material";
import { useState } from "react";

function Subscribe({ placeholder, buttonLabel }) {
  const initState = { value: "", error: "" };

  const [email, setEmail] = useState(initState);

  const { value, error } = email;

  const subscribe = () => {
    if (!value) setEmail({ value: "", error: "enter your email" });

    const mailFormate =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!value.match(mailFormate))
      setEmail({ value: "", error: "invalid email" });

    console.log(value);
  };

  const handleEmail = (e) => {
    setEmail({ value: e.target.value, error: "" });
  };

  return (
    <FormControl sx={{ minWidth: { md: "320px", xs: 300 } }}>
      <FormHelperText
        sx={{
          color: "red",
          textTransform: "capitalize",
        }}
      >
        {error}
      </FormHelperText>
      <Box
        sx={{
          display: "flex",
          border: `1px solid ${error ? "red" : "#016a70"}`,
          borderRadius: "20px",
          alignItems: "center",
          width: "100%",
          padding: "5px",
          paddingLeft: "20px",
          gap: "5px",
        }}
      >
        <InputBase
          placeholder={placeholder}
          sx={{ flexGrow: 1 }}
          type="email"
          onChange={handleEmail}
        />
        <Button
          component={"button"}
          variant="contained"
          sx={{ borderRadius: "20px", textTransform: "capitalize" }}
          onClick={subscribe}
        >
          {buttonLabel}
        </Button>
      </Box>
    </FormControl>
  );
}

export default Subscribe;
