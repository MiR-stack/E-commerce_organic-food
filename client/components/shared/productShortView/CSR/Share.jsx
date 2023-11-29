"use client";

import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

function Share() {
  return (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
      <Typography variant="h6"> share:</Typography>
      <IconButton>
        <Facebook />
      </IconButton>
      <IconButton>
        <Twitter />
      </IconButton>
      <IconButton>
        <Instagram />
      </IconButton>
    </Stack>
  );
}

export default Share;
