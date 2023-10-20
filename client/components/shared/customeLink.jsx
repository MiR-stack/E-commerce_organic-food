import Link from "next/link";
import { Link as MuiLink, Typography } from "@mui/material";

function CustomeLink({ href, label, children, style, component }) {
  return (
    <Link href={href} passHref legacyBehavior>
      <MuiLink underline="none" color="inherit" sx={{ width: "100%" }}>
        <Typography sx={style} component={component || "span"}>
          {label}
          {children}
        </Typography>
      </MuiLink>
    </Link>
  );
}

export default CustomeLink;
