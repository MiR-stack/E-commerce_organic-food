import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function CustomBreadcrumbs({ links, currentPage, styles }) {
  return (
    <Breadcrumbs
      separator={">>"}
      sx={{
        zIndex: 3,
        position: "relative",
        color: "white",
        ...styles,
      }}
    >
      {links.map((link) => (
        <Link href={link.href} key={link.name} passHref legacyBehavior>
          <MuiLink underline="hover" color="inherit">
            {link.name}{" "}
          </MuiLink>
        </Link>
      ))}
      <Typography>{currentPage} </Typography>
    </Breadcrumbs>
  );
}

export default CustomBreadcrumbs;
