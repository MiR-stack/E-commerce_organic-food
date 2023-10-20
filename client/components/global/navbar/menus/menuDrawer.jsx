"use client";

import { Box, Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import CustomMenu from "./CustomMenu";
import useMenu from "../../../../hooks/useMenu";

function MenuDrawer({ label, data }) {
  const { open, anchorEl, handleClick, handleClose } = useMenu();

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ p: 0 }}
        endIcon={<KeyboardArrowDown />}
        color="inherit"
      >
        {label}
      </Button>
      <CustomMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        links={data}
      />
    </Box>
  );
}

export default MenuDrawer;
