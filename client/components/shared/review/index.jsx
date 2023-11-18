"use client";
import {
  Button,
  Rating,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Modal from "../modal";

const initValues = { rating: 5, content: "" };

function Review({ open, handleClose, handleSubmit }) {
  const [values, setValues] = useState({ ...initValues });
  const submit = () => {
    handleSubmit(values);
    handleClose();
    setValues({ ...initValues });
  };
  const handleChange = (e) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <Modal open={open} handleClose={handleClose}>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="h6"> Your Overall Rating </Typography>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Rating
              name="rating"
              value={Number(values.rating)}
              onChange={handleChange}
            />
            <Typography variant="h6"> {values.rating} </Typography>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h6"> Write Your Review</Typography>
          <Typography variant="body1">
            Tell other pepole more about the product. what was you experiance
            with this product?
          </Typography>
          <TextareaAutosize
            minRows={12}
            name="content"
            value={values.content}
            onChange={handleChange}
          />
        </Stack>
        <Button variant="contained" onClick={submit}>
          submit
        </Button>
      </Stack>
    </Modal>
  );
}

export default Review;
