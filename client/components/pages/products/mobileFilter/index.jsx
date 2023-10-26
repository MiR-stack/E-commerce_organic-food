import React from "react";
import useDrawer from "../../../shared/drawer/useDrawer";
import Drawer from "../../../shared/drawer/drawerLayout";
import { IconButton } from "@mui/material";
import { Tune } from "@mui/icons-material";
import Filter from "../filters";

function MobileFilter({ categories }) {
  const { open, handleDrawerToggle } = useDrawer();
  const config = {
    sx: {
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: { xs: 330, sm: 400 },
        p: 2,
      },
    },
    anchor: "left",
  };
  return (
    <>
      <IconButton
        sx={{ display: { lg: "none", xs: "block" } }}
        onClick={handleDrawerToggle}
      >
        <Tune />
      </IconButton>
      <Drawer
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        config={config}
      >
        <Filter categories={categories} view />
      </Drawer>
    </>
  );
}

export default MobileFilter;
