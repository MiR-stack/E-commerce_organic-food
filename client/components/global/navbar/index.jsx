import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menus from "./menus/menus";
import SearchBar from "../../shared/searchBar";
import RightSideIcons from "./rightSide";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";
import MobileNav from "./mobileNav";
import QuickView from "./utils/quickView";

function Navbar({ window, navData }) {
  const { navbar, categories } = navData;
  const { links, brand, loginOptions, logoutOptions } = navbar;

  const categoryLinks = categories.data.map((category) => {
    const { slug, name } = category.attributes;

    return {
      id: category.id,
      href: `/products?category=${slug}`,
      label: name,
    };
  });

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" color="default">
        <Toolbar sx={{ justifyContent: "space-around", gap: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { sm: "0", md: "50px" },
            }}
          >
            <MobileNav navbar={navbar} categoryLinks={categoryLinks} />
            <Typography variant="h5" component="div" sx={{ cursor: "pointer" }}>
              <Link href="/" passHref legacyBehavior>
                <MuiLink color="inherit" underline="none">
                  {brand.name}
                </MuiLink>
              </Link>
            </Typography>
            <Menus links={links} categories={categoryLinks} />
          </Box>

          <SearchBar />

          <RightSideIcons
            loginOptions={loginOptions}
            logoutOptions={logoutOptions}
          />
          <QuickView />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
