import { Button, Link as MuiLink } from "@mui/material";
import { Box, Typography } from "@mui/material";
import CustomLink from "../../../shared/customeLink";
import MenuDrawer from "./menuDrawer";

function Menus({ links, categories }) {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignlinks: "center",
        textTransform: "uppercase",
        fontSize: ".875rem",
        gap: "20px",
      }}
    >
      {links.map((link) => {
        if (link.label === "categories") {
          return (
            <MenuDrawer key={link.id} label={link.label} data={categories} />
          );
        } else {
          return link.href ? (
            <Typography
              key={link.id}
              variant="button"
              sx={{
                textTransform: "uppercase",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              <CustomLink href={link.href} label={link.label} />
            </Typography>
          ) : (
            <MuiLink component={"button"} key={link.id}>
              {link.label}
            </MuiLink>
          );
        }
      })}
    </Box>
  );
}

export default Menus;
