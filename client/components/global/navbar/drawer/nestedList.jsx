import React, { useState } from "react";
import { ListItemButton, List, Collapse, ListItemText } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import CustomeLink from "../../../shared/customeLink";

function NestedList({ label, links }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{ bgcolor: "background.grey" }}
        >
          {links.map((link) => {
            return link.href ? (
              <CustomeLink href={link.href} key={link.id}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </CustomeLink>
            ) : (
              <ListItemButton sx={{ pl: 4 }} key={link.id}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

export default NestedList;
