import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import CustomeLink from "../../../shared/customeLink";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";

function CustomMenu({ open, anchorEl, handleClose, links }) {
  const dispatch = useDispatch();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClick={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      sx={{ textTransform: "capitalize" }}
    >
      {links.map((link) => {
        const { id, label, href, target, isExtarnal, onClick } = link;

        if (href) {
          return (
            <MenuItem key={id}>
              <CustomeLink
                href={href}
                label={label}
                target={target}
                isExtarnal={isExtarnal}
              />
            </MenuItem>
          );
        } else {
          return (
            <MenuItem
              key={id}
              onClick={
                link.dispatchable
                  ? () => {
                      dispatch(onClick);
                    }
                  : onClick
              }
            >
              <Typography component="span"> {label}</Typography>
            </MenuItem>
          );
        }
      })}
    </Menu>
  );
}

CustomMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      href: PropTypes.string,
      label: PropTypes.string.isRequired,
      target: PropTypes.string,
      isExternal: PropTypes.bool,
    }).isRequired
  ),
};

export default CustomMenu;
