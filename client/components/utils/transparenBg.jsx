import React from "react";
import { Box } from "@mui/material";

function TransparentBg() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        position: "absolute",
        left: "0",
        top: 0,
        zIndex: 3,
      }}
    />
  );
}

export default TransparentBg;
