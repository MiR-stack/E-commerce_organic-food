import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Box, Typography } from "@mui/material";
import NestedList from "./nestedList";
import CustomeLink from "../../../shared/customeLink";
import DrawerLayout from "./drawerLayout";

import React from "react";

function navDrawer({ window, open, handleDrawerToggle, navData }) {
  const { links, brand, loginOptions, logoutOptions } = navData.navbar;

  const config = {
    sx: {
      display: { sm: "block", md: "none" },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: 240,
      },
    },
  };

  const props = { window, open, handleDrawerToggle, config };

  return (
    <DrawerLayout {...props}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ my: 2, textTransform: "uppercase" }}>
          {brand.name}
        </Typography>
        <Divider />
        <List>
          {links.map((item) => {
            const { id, label } = item;
            if (navData[label]) {
              return (
                <NestedList key={id} label={label} links={navData[label]} />
              );
            } else {
              return (
                <ListItem key={id} disablePadding>
                  <CustomeLink href={item.href}>
                    <ListItemButton sx={{ textTransform: "capitalize" }}>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </CustomeLink>
                </ListItem>
              );
            }
          })}
          {false ? (
            <NestedList label={"my account"} links={loginOptions} />
          ) : (
            logoutOptions.map((option) => (
              <ListItem key={option.label} disablePadding>
                <ListItemButton sx={{ textTransform: "capitalize" }}>
                  <ListItemText primary={option.label} />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </DrawerLayout>
  );
}

export default navDrawer;
