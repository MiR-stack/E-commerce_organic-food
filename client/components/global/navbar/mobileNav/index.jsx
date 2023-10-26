"use client";
import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material/";
import NavDrawer from "../drawer/navDrawer";
import useDrawer from "../../../shared/drawer/useDrawer";

function MobileNav({ window, navbar, categoryLinks }) {
  const { open, handleDrawerToggle } = useDrawer();

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: "none" }, p: { xs: "0" } }}
      >
        <MenuIcon />
      </IconButton>
      <NavDrawer
        window={window}
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        navData={{ navbar, categories: categoryLinks }}
      />
    </>
  );
}

export default MobileNav;
