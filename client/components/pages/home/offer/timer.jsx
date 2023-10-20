"use client";
import useTimer from "../../../../hooks/useTimer";
import { Typography } from "@mui/material";

function Timer({ expireDate }) {
  const timer = useTimer(expireDate);

  return <Typography variant="h4">{timer} </Typography>;
}

export default Timer;
